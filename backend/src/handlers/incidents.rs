use axum::{extract::{Path, State, Query}, http::StatusCode, response::IntoResponse, Json};
use std::collections::HashMap;
use serde_json::json;
use sqlx::PgPool;

use crate::models::incident::Incident;

// インシデント一覧取得（ページネーション対応）
pub async fn list_incidents(
    State(pool): State<PgPool>,
    Query(params): Query<HashMap<String, String>>,
) -> Result<Json<Vec<Incident>>, StatusCode> {
    let page: i64 = params.get("page").and_then(|v| v.parse().ok()).unwrap_or(1);
    let per_page: i64 = 20;
    let offset = (page - 1) * per_page;

    let incidents = sqlx::query_as!(
        Incident,
        r#"
        SELECT id, title, description, root_cause, resolution, system_name, occurred_at, resolved_at, severity, created_by
        FROM incidents
        ORDER BY id DESC
        LIMIT $1 OFFSET $2
        "#,
        per_page,
        offset
    )
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(incidents))
}

// インシデント詳細取得
pub async fn get_incident(
    Path(id): Path<i32>,
    State(pool): State<PgPool>,
) -> Result<Json<Incident>, StatusCode> {
    let incident = sqlx::query_as!(
        Incident,
        r#"
        SELECT id, title, description, root_cause, resolution, system_name, occurred_at, resolved_at, severity, created_by
        FROM incidents
        WHERE id = $1
        "#,
        id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::NOT_FOUND)?;

    Ok(Json(incident))
}

pub async fn create_incident(
    State(pool): State<PgPool>,
    Json(payload): Json<Incident>,
) -> impl IntoResponse {
    println!("📥 Received payload: {:?}", payload);
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
