export default function Home() {
  return (
    <div>
      <h1 style={{ color: 'var(--primary-color)' }}>ダッシュボード</h1>
      <p>システム障害の状況を一目で確認できます</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
        <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', backgroundColor: 'var(--card-background)' }}>
          <h3 style={{ color: 'var(--primary-color)' }}>総インシデント数</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>127</p>
          <p style={{ color: 'var(--secondary-color)' }}>先月比 +12%</p>
        </div>
        <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', backgroundColor: 'var(--card-background)' }}>
          <h3 style={{ color: 'var(--primary-color)' }}>未解決</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>8</p>
          <p style={{ color: 'var(--secondary-color)' }}>緊急度高: 2件</p>
        </div>
        <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', backgroundColor: 'var(--card-background)' }}>
          <h3 style={{ color: 'var(--primary-color)' }}>平均解決時間</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>2.4h</p>
          <p style={{ color: 'var(--secondary-color)' }}>先月比 -15%</p>
        </div>
      </div>
      
      <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', backgroundColor: 'var(--card-background)' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>最近のインシデント</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#f5f5f5', color: 'var(--primary-color)' }}>ID</th>
              <th style={{ border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#f5f5f5', color: 'var(--primary-color)' }}>タイトル</th>
              <th style={{ border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#f5f5f5', color: 'var(--primary-color)' }}>システム</th>
              <th style={{ border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#f5f5f5', color: 'var(--primary-color)' }}>重要度</th>
              <th style={{ border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#f5f5f5', color: 'var(--primary-color)' }}>状態</th>
              <th style={{ border: '1px solid var(--border-color)', padding: '0.5rem', backgroundColor: '#f5f5f5', color: 'var(--primary-color)' }}>発生日時</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '0.5rem', color: 'var(--secondary-color)' }}>#001</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '0.5rem', color: 'var(--secondary-color)' }}>データベース接続エラー</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '0.5rem', color: 'var(--secondary-color)' }}>ユーザー管理システム</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '0.5rem', color: 'var(--secondary-color)' }}>Critical</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '0.5rem', color: 'var(--secondary-color)' }}>未解決</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '0.5rem', color: 'var(--secondary-color)' }}>2024-01-15 14:30</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', backgroundColor: 'var(--card-background)' }}>
          <h3 style={{ color: 'var(--primary-color)' }}>クイックアクション</h3>
          <a href="/incidents/new" style={{ display: 'block', margin: '0.5rem 0', padding: '0.5rem', backgroundColor: 'var(--button-background)', color: 'white', textDecoration: 'none', borderRadius: '4px', textAlign: 'center' }}>
            新しいインシデントを登録
          </a>
          <a href="/incidents" style={{ display: 'block', margin: '0.5rem 0', padding: '0.5rem', backgroundColor: 'var(--button-background)', color: 'white', textDecoration: 'none', borderRadius: '4px', textAlign: 'center' }}>
            全インシデントを表示
          </a>
        </div>
      </div>
    </div>
  );
}
