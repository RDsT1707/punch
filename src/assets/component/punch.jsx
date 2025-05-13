import Bag from '/img/bag.png'
import Burst from '/img/bag-burst.png'


export default function Punch({ isBroken, animate }) {
  return (
    <div className={`punch-container ${animate ? 'hit' : ''}`}>
      <img
        src={isBroken ? Burst : Bag}
        alt="Sac de frappe"
      />
    </div>
  );
}
