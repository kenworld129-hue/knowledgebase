import { useState } from "react";
import { createIncident, PostIncident } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function NewIncidentPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [occurred_at, setOccurred_at] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const incident: PostIncident = {
      title,
      description,
      severity,
      occurred_at,
    };
    try {
      const result = await createIncident(incident);
      setMessage(`インシデントが作成されました: ID ${result.id}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setMessage(err.message);
        } else {
            setMessage(String(err));
        }
    }
  };

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
      
      <h1>➕ 新しいインシデントを作成</h1>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            タイトル *
          </label>
          <input
            type="text"
            placeholder="インシデントのタイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            詳細説明
          </label>
          <textarea
            placeholder="インシデントの詳細を記述"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minHeight: '120px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            重要度
          </label>
          <select 
            value={severity} 
            onChange={(e) => setSeverity(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="low">Low - 低</option>
            <option value="medium">Medium - 中</option>
            <option value="high">High - 高</option>
            <option value="critical">Critical - 緊急</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            発生日時
          </label>
          <input
            type="datetime-local"
            value={occurred_at}
            onChange={(e) => setOccurred_at(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          インシデントを作成
        </button>
      </form>
      
      {message && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: message.includes('作成されました') ? '#d4edda' : '#f8d7da',
          color: message.includes('作成されました') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('作成されました') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}
