use axum::{
    extract::{State},
    http::StatusCode,
    http::Request,
    middleware::Next,
    response::Response,
    body::Body
};
use jsonwebtoken::{DecodingKey, Validation};
use crate::auth::jwt::{Claims};
use crate::routes::auth::AppState;


pub async fn require_jwt(
    // State(secret): State<String>,
    State(state): State<AppState>,
    req: Request<Body>,
    next: Next,
) -> Result<Response, StatusCode> {
    let secret = &state.secret;
    let auth = req.headers().get("Authorization")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("");

    if !auth.starts_with("Bearer ") {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let token = auth.trim_start_matches("Bearer ");

    jsonwebtoken::decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    ).map_err(|_| StatusCode::UNAUTHORIZED)?;

    Ok(next.run(req).await)
}
