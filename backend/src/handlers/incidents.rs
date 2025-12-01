use axum::{http::StatusCode, response::IntoResponse, Json};
use serde_json::json;
use sqlx::PgPool;

// use crate::models::incident::{Incident, NewIncident};
use crate::models::incident::Incident;

pub async fn create_incident(
    Json(payload): Json<Incident>,
    pool: PgPool,
) -> impl IntoResponse {
    let result = sqlx::query!(
        r#"
        INSERT INTO incidents (title, description, root_cause, resolution, system_name, occurred_at, resolved_at, severity, created_by)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id
        "#,
        payload.title,
        payload.description,
        payload.root_cause,
        payload.resolution,
        payload.system_name,
        payload.occurred_at,
        payload.resolved_at,
        payload.severity,
        payload.created_by
    )
    .fetch_one(&pool)
    .await;

    match result {
        Ok(record) => (
            StatusCode::CREATED,
            Json(json!({ "id": record.id }))
        ),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": err.to_string() }))
        ),
    }
}
