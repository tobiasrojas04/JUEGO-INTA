import { useState, useEffect } from 'react';
import Welcome from './components/pages/1- Welcome/Welcome';
import Collaboration from './components/pages/2- Collaboration/Collaboration';
import BlackScreenTransition from './components/Transition/BlackScreenTransition';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // Estado para manejar la pantalla actual
  const [transitionStage, setTransitionStage] = useState('none'); // Estado para manejar la transición

  useEffect(() => {
    if (currentScreen === 'welcome') {
      const timer = setTimeout(() => {
        setTransitionStage('black'); // Activar pantalla negra

        setTimeout(() => {
          setTransitionStage('none');
          setCurrentScreen('collaboration'); // Cambiar a la pantalla de colaboración
        }, 1000); // Duración de la pantalla negra
      }, 2000); // Duración de la pantalla de bienvenida

      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div>
      {currentScreen === 'welcome' && <Welcome />}
      {transitionStage === 'black' && <BlackScreenTransition />}
      {currentScreen === 'collaboration' && <Collaboration />}
    </div>
  );
};

export default App;
