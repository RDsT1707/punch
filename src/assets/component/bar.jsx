export default function Bar({ health }) {
  return (
    <div className="bar-container">
      <div className="bar" style={{ width: `${health}%` }}>
        {health} %
      </div>
    </div>
  );
}
