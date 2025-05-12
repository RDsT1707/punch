export default function Punch({ isBroken, animate }) {
  return (
    <div className={`punch-container ${animate ? 'hit' : ''}`}>
      <img
        src={isBroken ? "/img/bag-burst.png" : "/img/bag.png"}
        alt="Sac de frappe"
      />
    </div>
  );
}
