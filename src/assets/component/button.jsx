export default function Button({ label, onClick, isSpecial = false }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${isSpecial ? 'special' : ''}`}
    >
      {label}
    </button>
  );
}
