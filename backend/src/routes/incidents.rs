use axum::{routing::get, Router};  // ← Json を追加
use sqlx::PgPool;

use crate::handlers::incidents::{list_incidents, get_incident, create_incident};

pub fn incident_routes(pool: PgPool) -> Router {
    Router::new()
        .route("/incidents", get(list_incidents).post(create_incident))
        .route("/incidents/{id}", get(get_incident))
        .with_state(pool) // ← pool を State として渡す
}
