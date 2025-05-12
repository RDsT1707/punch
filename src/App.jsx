import { useState, useEffect } from 'react';
import Bar from './assets/component/bar';
import Button from './assets/component/button';
import Punch from './assets/component/punch';
import './App.css';

export default function App() {
  const [health, setHealth] = useState(100);
  const [isBroken, setIsBroken] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showSuperPunch, setShowSuperPunch] = useState(false);

  const handlePunch = (damage) => {
    if (isBroken) return;
    setAnimate(true);
    setHealth(prev => {
      const newHealth = Math.max(prev - damage, 0);
      if (newHealth === 0) setIsBroken(true);
      return newHealth;
    });
  };

  const handleRestart = () => {
    setHealth(100);
    setIsBroken(false);
    setShowSuperPunch(false);
  };

  useEffect(() => {
    let timeout;
    if (animate) {
      timeout = setTimeout(() => setAnimate(false), 300);
    }
    return () => clearTimeout(timeout);
  }, [animate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBroken) {
        setShowSuperPunch(Math.random() < 0.3);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isBroken]);

  return (
    <div className="app">
      <Punch isBroken={isBroken} animate={animate} />
      <Bar health={health} />
      {!isBroken && (
        <>
          <Button label="Punch" onClick={() => handlePunch(10)} />
          {showSuperPunch && (
            <Button label="SUPER PUNCH " onClick={() => handlePunch(20)} isSpecial />
          )}
        </>
      )}
      {isBroken && <Button label="Rejouer" onClick={handleRestart} />}
    </div>
  );
}
