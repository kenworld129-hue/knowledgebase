export default function TestStylePage() {
  return (
    <div className="ishidatami-bg" style={{ padding: '2rem' }}>
      <div className="max-w-container">
        <h1 className="accent-red" style={{ fontSize: '3rem', marginBottom: '2rem' }}>
          🎨 スタイルテスト
        </h1>
        
        <div className="card fade-in" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>カードテスト</h2>
          <p>このカードにホバー効果とアニメーションが適用されているはずです。</p>
        </div>
        
        <button className="btn-primary" style={{ marginRight: '1rem' }}>
          プライマリボタン
        </button>
        
        <button className="btn-secondary">
          セカンダリボタン
        </button>
        
        <div style={{ marginTop: '2rem' }}>
          <span className="severity-critical">Critical</span>
          <span className="severity-high" style={{ marginLeft: '1rem' }}>High</span>
          <span className="severity-medium" style={{ marginLeft: '1rem' }}>Medium</span>
        </div>
      </div>
    </div>
  );
}