export interface GetIncident {
  id: number;
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
export interface PostIncident {
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

export async function createIncident(incident: PostIncident) {
  const payload = {
    ...incident,
  };

  const res = await fetch("http://localhost:8000/api/incidents", {
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

export async function fetchIncidents(page: number = 1): Promise<GetIncident[]> {
  const res = await fetch(`http://localhost:8000/api/incidents?page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch incidents');
  return res.json();
}

export async function fetchIncidentDetail(id: number): Promise<GetIncident> {
  const res = await fetch(`http://localhost:8000/api/incidents/${id}`);
  if (!res.ok) throw new Error('Failed to fetch incident detail');
  return res.json();
}