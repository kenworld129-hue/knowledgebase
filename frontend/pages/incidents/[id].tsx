"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchIncidentDetail, GetIncident } from "../../lib/api";

export default function IncidentDetail() {
  const params = useParams();
  const id = params?.id;
  const [incident, setIncident] = useState<GetIncident | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const numericId = Number(id);
    if (isNaN(numericId)) return;

    fetchIncidentDetail(numericId)
      .then(setIncident)
      .catch(console.error);
  }, [id]);

  if (!incident) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <button
        onClick={() => router.push('/incidents')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        ← 一覧に戻る
      </button>
      
      <h1>📝 インシデント詳細 #{incident.id}</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa', width: '200px' }}>ID</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>#{incident.id}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>タイトル</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold' }}>{incident.title || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>説明</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.description || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>重要度</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.severity || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>システム名</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.system_name || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>発生日時</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.occurred_at || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>解決日時</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.resolved_at || '未解決'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>原因</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.root_cause || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>解決方法</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.resolution || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>作成者</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.created_by || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem', fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>作成日時</td>
            <td style={{ border: '1px solid #ccc', padding: '0.75rem' }}>{incident.created_at || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
