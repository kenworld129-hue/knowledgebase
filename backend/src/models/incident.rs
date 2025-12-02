use serde::{Deserialize, Serialize, Deserializer};
use chrono::NaiveDateTime;

/// カスタムデシリアライズ関数
fn from_datetime_local<'de, D>(deserializer: D) -> Result<Option<NaiveDateTime>, D::Error>
where
    D: Deserializer<'de>,
{
    let s: Option<String> = Option::deserialize(deserializer)?;
    if let Some(mut s) = s {
        // "T" を空白に置換
        if s.contains('T') {
            s = s.replace('T', " ");
        }
        // 秒がない場合は ":00" を追加
        if s.len() == 16 {
            // "YYYY-MM-DD HH:MM" の長さは16
            s.push_str(":00");
        }
        // NaiveDateTime に変換
        NaiveDateTime::parse_from_str(&s, "%Y-%m-%d %H:%M:%S")
            .map(Some)
            .map_err(serde::de::Error::custom)
    } else {
        Ok(None)
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Incident {
    pub id: Option<i32>,
    pub title: String,
    pub description: Option<String>,
    pub root_cause: Option<String>,
    pub resolution: Option<String>,
    pub system_name: Option<String>,
    #[serde(deserialize_with = "from_datetime_local")]
    pub occurred_at: Option<NaiveDateTime>,
    pub resolved_at: Option<NaiveDateTime>,
    pub severity: Option<String>,
    pub created_by: Option<i32>,
}
