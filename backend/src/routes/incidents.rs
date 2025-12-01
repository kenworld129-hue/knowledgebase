use axum::{routing::post, Router, Json};  // ← Json を追加
use sqlx::PgPool;

use crate::handlers::incidents::create_incident;
use crate::models::incident::Incident;

pub fn incident_routes(pool: PgPool) -> Router {
    Router::new().route(
        "/incidents",
        post({
            let pool = pool.clone();
            move |Json(payload): Json<Incident>| {
                create_incident(Json(payload), pool.clone())
            }
        }),
    )
}
