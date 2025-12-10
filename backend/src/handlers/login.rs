use axum::{extract::{State}, http::StatusCode, Json};
use serde::Deserialize;
use bcrypt::verify;
use crate::auth::jwt::create_jwt;
use crate::routes::auth::AppState;


#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(serde::Serialize)]
pub struct LoginResponse {
    pub token: String,
}

pub async fn login(
    State(state): State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, StatusCode> {
    println!("🔐 Login attempt: username={}", payload.username);
    
    let pool = &state.pool;
    let secret = &state.secret;
    let user = sqlx::query!(
        "SELECT id, username, password_hash, role FROM users WHERE username = $1",
        payload.username
    )
    .fetch_optional(pool)
    .await
    .map_err(|e| {
        println!("❌ DB error: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    let user = match user {
        Some(u) => {
            println!("✅ User found: id={}, username={}", u.id, u.username);
            u
        },
        None => {
            println!("❌ User not found");
            return Err(StatusCode::UNAUTHORIZED);
        }
    };

    let valid = verify(&payload.password, &user.password_hash)
        .map_err(|e| {
            println!("❌ Bcrypt error: {:?}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;

    if !valid {
        println!("❌ Password mismatch");
        return Err(StatusCode::UNAUTHORIZED);
    }

    println!("✅ Login successful");
    let token = create_jwt(user.id, user.username, user.role, &secret);

    Ok(Json(LoginResponse { token }))
}
