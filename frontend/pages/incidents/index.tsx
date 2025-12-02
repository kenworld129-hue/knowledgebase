"use client";

import { useEffect, useState } from "react";
import { fetchIncidents, GetIncident } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function IncidentList() {
  const [incidents, setIncidents] = useState<GetIncident[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchIncidents(page).then(setIncidents).catch(console.error);
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">インシデント一覧</h1>
      <ul>
        {incidents.map((inc) => (
          <li
            key={inc.id}
            className="cursor-pointer hover:bg-gray-100 p-2"
            onClick={() => router.push(`/incidents/${inc.id}`)}
          >
            {inc.id}：{inc.title}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="mr-2"
        >
          前へ
        </button>
        <button onClick={() => setPage((p) => p + 1)}>次へ</button>
      </div>
    </div>
  );
}
