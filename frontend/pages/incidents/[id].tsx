"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchIncidentDetail, GetIncident } from "../../lib/api";

export default function IncidentDetail() {
  const params = useParams();
  const id = params?.id; // null/undefined 安全に取得
  const [incident, setIncident] = useState<GetIncident | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return; // id がない場合は処理しない
    const numericId = Number(id);
    if (isNaN(numericId)) return; // 数字変換できない場合も処理しない

    fetchIncidentDetail(numericId)
      .then(setIncident)
      .catch(console.error);
  }, [id]);

  if (!incident) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <button
        className="mb-4 text-blue-500"
        onClick={() => router.push("/incidents")}
      >
        一覧に戻る
      </button>

      <h1 className="text-xl font-bold mb-2">インシデント詳細</h1>
      <table className="table-auto border-collapse border border-gray-200">
        <tbody>
          {Object.entries(incident).map(([key, value]) => (
            <tr key={key} className="border border-gray-200">
              <td className="border px-2 py-1 font-bold">{key}</td>
              <td className="border px-2 py-1">{value ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
