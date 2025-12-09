use axum::{routing::get, Router};
use sqlx::PgPool;

use crate::handlers::incidents::{list_incidents, get_incident, create_incident};
use crate::routes::auth::AppState;

pub fn incident_routes(pool: PgPool, secret: String) -> Router {
    let state = AppState { pool, secret };
    Router::new()
        .route("/incidents", get(list_incidents).post(create_incident))
        .route("/incidents/{id}", get(get_incident))
        .with_state(state)
}
