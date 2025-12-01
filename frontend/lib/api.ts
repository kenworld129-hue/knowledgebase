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

export async function createIncident(incident: Incident) {
  const res = await fetch("http://localhost:8000/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incident),
  });
  if (!res.ok) {
    throw new Error(`Failed to create incident: ${res.statusText}`);
  }
  return res.json();
}
