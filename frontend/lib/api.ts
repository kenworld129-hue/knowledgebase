export interface Incident {
  title: string;
  description?: string;
  root_cause?: string;
  resolution?: string;
  system_name?: string;
  occurred_at?: string;
  resolved_at?: string;
  severity?: string;
  created_by?: number;
}

// function formatDateTime(dt?: Date) {
//   if (!dt) return undefined;
//   // 例: 2025-11-30 20:00:00
//   return dt.toISOString().replace("T", " ").split(".")[0];
// }

export async function createIncident(incident: Incident) {
  const payload = {
    ...incident,
    // occurred_at: formatDateTime(incident.occurred_at ? new Date(incident.occurred_at) : undefined),
    // resolved_at: formatDateTime(incident.resolved_at ? new Date(incident.resolved_at) : undefined),
  };

  const res = await fetch("http://localhost:8000/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log("payload = ", JSON.stringify(payload));
  if (!res.ok) {
    console.log("payload = ", JSON.stringify(payload));
    throw new Error(`Failed to create incident: ${res.statusText}`);
  }
  return res.json();
}
