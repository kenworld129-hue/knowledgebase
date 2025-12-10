use axum::{routing::post, Router};
use sqlx::PgPool;

use crate::handlers::login::login;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub secret: String,
}

pub fn login_routes(pool: PgPool, secret: String) -> Router {
    let state = AppState { pool, secret };
    Router::new()
        .route("/login", post(login))
        .with_state(state)
}