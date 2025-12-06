use axum::{routing::get, routing::post, Router, Json};  // ← Json を追加
use sqlx::PgPool;

use crate::handlers::login::{login};

pub fn login_routes(pool: PgPool) -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/incidents", get(list_incidents))
        .layer(middleware::from_fn_with_state(secret.clone(), require_jwt))
}
