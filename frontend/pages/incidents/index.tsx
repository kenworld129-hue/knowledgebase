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

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return { bg: '#fee2e2', border: '#fca5a5', text: '#dc2626' };
      case 'high': return { bg: '#fef3c7', border: '#fcd34d', text: '#d97706' };
      case 'medium': return { bg: '#dbeafe', border: '#93c5fd', text: '#2563eb' };
      case 'low': return { bg: '#f0fdf4', border: '#86efac', text: '#16a34a' };
      default: return { bg: '#f8fafc', border: '#cbd5e1', text: '#64748b' };
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#e5e7eb',
      padding: '2rem'
    }}>
      {/* ヘッダー */}
      <div style={{
        backgroundColor: '#20b2aa',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          margin: 0
        }}>
          🗂 KnowledgeBase
        </h1>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ページタイトル */}
        <div style={{
          backgroundColor: '#d1d5db',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #9ca3af'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#495057',
                margin: 0
              }}>
                📋 インシデント一覧
              </h1>
              <p style={{ color: '#6c757d', fontSize: '1rem', margin: '0.5rem 0 0 0' }}>
                システム障害の状況を管理します
              </p>
            </div>
            <button
              onClick={() => router.push('/incidents/new')}
              style={{
                backgroundColor: '#1e3a8a',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1e40af';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(32, 178, 170, 0.3)';
                // メタリック光沢効果
                const shine = document.createElement('div');
                shine.style.cssText = `
                  position: absolute;
                  top: 0;
                  left: -100%;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                  transition: left 0.5s ease;
                `;
                e.target.appendChild(shine);
                setTimeout(() => shine.style.left = '100%', 10);
                setTimeout(() => e.target.removeChild(shine), 500);
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1e3a8a';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              ➕ 新規作成
            </button>
          </div>
        </div>

        {/* インシデントリスト */}
        <div style={{ marginBottom: '2rem' }}>
          {incidents.length === 0 ? (
            <div style={{
              backgroundColor: '#d1d5db',
              borderRadius: '8px',
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #9ca3af'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ color: '#495057', fontSize: '1.5rem', margin: 0 }}>
                インシデントがありません
              </h3>
              <p style={{ color: '#6c757d', marginTop: '0.5rem' }}>
                新しいインシデントを作成してください
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {incidents.map((inc) => {
                const severityColors = getSeverityColor(inc.severity);
                return (
                  <div
                    key={inc.id}
                    onClick={() => router.push(`/incidents/${inc.id}`)}
                    style={{
                      backgroundColor: '#d1d5db',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      border: '1px solid #9ca3af',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(32, 178, 170, 0.15)';
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#20b2aa';
                      // メタリック光沢効果
                      const shine = document.createElement('div');
                      shine.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(32, 178, 170, 0.2), transparent);
                        transition: left 0.6s ease;
                        pointer-events: none;
                      `;
                      e.currentTarget.appendChild(shine);
                      setTimeout(() => shine.style.left = '100%', 10);
                      setTimeout(() => {
                        if (e.currentTarget && e.currentTarget.contains(shine)) {
                          e.currentTarget.removeChild(shine);
                        }
                      }, 600);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      e.currentTarget.style.backgroundColor = '#d1d5db';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                  >
                    {/* ID バッジ */}
                    <div 
                      style={{
                        backgroundColor: '#1e3a8a',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        minWidth: '60px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
                      }}
                      onMouseEnter={(e) => {
                        // メタリック光沢効果
                        const shine = document.createElement('div');
                        shine.style.cssText = `
                          position: absolute;
                          top: 0;
                          left: -100%;
                          width: 100%;
                          height: 100%;
                          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                          transition: left 0.4s ease;
                          pointer-events: none;
                        `;
                        e.target.appendChild(shine);
                        setTimeout(() => shine.style.left = '100%', 10);
                        setTimeout(() => {
                          if (e.target && e.target.contains(shine)) {
                            e.target.removeChild(shine);
                          }
                        }, 400);
                      }}
                    >
                      #{inc.id}
                    </div>
                    
                    {/* メインコンテンツ */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#495057',
                          margin: 0,
                          lineHeight: '1.4',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {inc.title || 'タイトルなし'}
                        </h3>
                        <div style={{
                          background: severityColors.bg,
                          color: severityColors.text,
                          border: `1px solid ${severityColors.border}`,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          whiteSpace: 'nowrap'
                        }}>
                          {getSeverityIcon(inc.severity)}
                          {inc.severity || 'Unknown'}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#6c757d' }}>
                        <span>
                          {inc.system_name && (
                            <>💻 {inc.system_name}</>
                          )}
                        </span>
                        <span>
                          {inc.occurred_at ? new Date(inc.occurred_at).toLocaleDateString('ja-JP') : '日時不明'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ページネーション */}
        <div style={{
          backgroundColor: '#d1d5db',
          borderRadius: '8px',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #9ca3af'
        }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: page === 1 ? '#e9ecef' : '#6c757d',
              color: page === 1 ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            ← 前へ
          </button>
          
          <div style={{
            backgroundColor: '#1e3a8a',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            ページ {page}
          </div>
          
          <button 
            onClick={() => setPage((p) => p + 1)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a6268';
              e.target.style.transform = 'scale(1.05)';
              // メタリック光沢効果
              const shine = document.createElement('div');
              shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.4s ease;
                pointer-events: none;
              `;
              e.target.appendChild(shine);
              setTimeout(() => shine.style.left = '100%', 10);
              setTimeout(() => {
                if (e.target && e.target.contains(shine)) {
                  e.target.removeChild(shine);
                }
              }, 400);
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#6c757d';
              e.target.style.transform = 'scale(1)';
            }}
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  );
}
