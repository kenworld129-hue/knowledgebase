use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;

#[derive(Serialize, Deserialize)]
pub struct Incident {
    pub id: Option<i32>,
    pub title: String,
    pub description: Option<String>,
    pub root_cause: Option<String>,
    pub resolution: Option<String>,
    pub system_name: Option<String>,
    pub occurred_at: Option<NaiveDateTime>,
    pub resolved_at: Option<NaiveDateTime>,
    pub severity: Option<String>,
    pub created_by: Option<i32>,
}
