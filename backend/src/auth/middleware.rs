use axum::{
    http::Request,
    middleware::Next,
    response::Response,
};
use jsonwebtoken::{DecodingKey, Validation};

pub async fn require_jwt<B>(
    State(secret): State<String>,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
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
