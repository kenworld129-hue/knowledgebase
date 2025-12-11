export default function Debug() {
  return (
    <div>
      <h1>Environment Debug</h1>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>API_URL: {process.env.NEXT_PUBLIC_API_URL}</p>
    </div>
  );
}