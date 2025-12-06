use axum::{Json, http::StatusCode};
use serde::Deserialize;
use sqlx::PgPool;
use bcrypt::verify;
use crate::auth::create_jwt;

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
    State(pool): State<PgPool>,
    State(secret): State<String>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, StatusCode> {

    let user = sqlx::query!(
        "SELECT id, username, password_hash, role FROM users WHERE username = $1",
        payload.username
    )
    .fetch_optional(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let user = match user {
        Some(u) => u,
        None => return Err(StatusCode::UNAUTHORIZED),
    };

    let valid = verify(&payload.password, &user.password_hash)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if !valid {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let token = create_jwt(user.id, user.username, user.role, &secret);

    Ok(Json(LoginResponse { token }))
}
