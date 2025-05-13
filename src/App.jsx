import { useState, useEffect } from 'react';

import Bar from './assets/component/bar';
import Button from './assets/component/button';
import Punch from './assets/component/punch';

import './App.css';

export default function App() {
  // État pour gérer la vie du sac (100 )
  const [health, setHealth] = useState(100);

  // État pour savoir si le sac est KO (plus de vie)
  const [isBroken, setIsBroken] = useState(false);

  // État pour déclencher une animation visuelle
  const [animate, setAnimate] = useState(false);

  // État pour afficher aléatoirement le bouton SUPER PUNCH
  const [showSuperPunch, setShowSuperPunch] = useState(false);

  // Fonction appelée lorsqu'on appuie sur un bouton de coup
  const handlePunch = (damage) => {
    if (isBroken) return; // Si le sac est KO, on ne fait rien

    setAnimate(true); // Active l'animation du coup

    // Mise à jour de la vie après le coup
    setHealth(prev => {
      const newHealth = Math.max(prev - damage, 0); // Empêche que la vie descende en dessous de 0
      if (newHealth === 0) setIsBroken(true); // Si la vie atteint 0, le perso est KO
      return newHealth;
    });
  };

  // Fonction pour redémarrer le jeu
  const handleRestart = () => {
    setHealth(100); // Vie remise à 100
    setIsBroken(false); // réinitialisé
    setShowSuperPunch(false); // Super punch masqué
  };

  // Effet pour désactiver l'animation après 300ms
  useEffect(() => {
    let timeout;
    if (animate) {
      timeout = setTimeout(() => setAnimate(false), 300);
    }
    return () => clearTimeout(timeout); // Nettoyage du timeout
  }, [animate]);

  // Effet pour faire apparaître le super punch toutes les 3 secondes (30% de chance)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBroken) {
        setShowSuperPunch(Math.random() < 0.3); // 30% de chance de montrer le super punch
      }
    }, 3000);
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [isBroken]);

  // Rendu du composant
  return (
    <div className="app">
      {/* Animation du coup */}
      <Punch isBroken={isBroken} animate={animate} />

      {/* Barre de vie */}
      <Bar health={health} />

      {/* Affiche les boutons si le sac n'est pas KO */}
      {!isBroken && (
        <>
          {/* Bouton classique Punch */}
          <Button label="Punch" onClick={() => handlePunch(10)} />

          {/* Bouton SUPER PUNCH affiché aléatoirement */}
          {showSuperPunch && (
            <Button label="SUPER PUNCH" onClick={() => handlePunch(20)} isSpecial />
          )}
        </>
      )}

      {/* Affiche le bouton Rejouer si le sac est KO */}
      {isBroken && <Button label="Rejouer" onClick={handleRestart} />}
    </div>
  );
}
