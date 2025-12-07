use axum::{routing::get, routing::post, Router, middleware::from_fn_with_state};  // ← Json を追加
use sqlx::{PgPool};

use crate::handlers::login::{login};
use crate::handlers::incidents::{list_incidents};
use crate::auth::middleware::{require_jwt};

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub secret: String,
}

pub fn login_routes(pool: PgPool, secret: String) -> Router {
    let state = AppState { pool, secret };
    Router::new()
        .route("/login", post(login))
        .route("/incidents", get(list_incidents))
        .layer(from_fn_with_state(state.clone(), require_jwt))
        .with_state(state) // ← pool を State として渡す
}