use axum::{routing::get, routing::post, Router, middleware::from_fn_with_state};  // ← Json を追加
use sqlx::PgPool;

use crate::handlers::login::{login};
use crate::handlers::incidents::{list_incidents};
use crate::auth::middleware::{require_jwt};

pub fn login_routes(pool: PgPool, secret: String) -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/incidents", get(list_incidents))
        .layer(from_fn_with_state(secret.clone(), require_jwt))
        .with_state(pool) // ← pool を State として渡す
}