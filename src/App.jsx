// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Welcome from './components/pages/1- Welcome/Welcome';
import Collaboration from './components/pages/2- Collaboration/Collaboration';
import PlayerForm from './components/pages/3- PlayerForm/PlayerForm';
import QuestionCategory from './components/pages/4- QuestionCategory/QuestionCategory';
import GameInterface from './components/pages/5- GameInterface/GameInterface'; // Asegúrate de importar correctamente
import BlackScreen from './components/common/Transition/BlackScreenTransition';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
      if (currentScreen < 2) { // Solo ejecuta el temporizador en las primeras tres pantallas
          const timer = setTimeout(() => {
              handleNextScreen();
          }, 3500); // Cambia de pantalla cada 3 segundos

          return () => clearTimeout(timer);
      }
  }, [currentScreen]);

  const handleNextScreen = () => {
      setIsTransitioning(true); // Inicia la transición
  };

  const handleTransitionEnd = () => {
      setIsTransitioning(false); // Termina la transición
      setCurrentScreen((prevScreen) => prevScreen + 1); // Cambia la pantalla
  };

  const renderScreen = () => {
      switch (currentScreen) {
          case 0:
              return <Welcome />;
          case 1:
              return <Collaboration />;
          case 2:
              return <PlayerForm onNextScreen={handleNextScreen} />;
          case 3:
              return <QuestionCategory />;
          default:
              return <div>Final</div>;
      }
  };

  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={renderScreen()} />
                  <Route path="/game/:category" element={<GameInterface />} />
              </Routes>
              <BlackScreen isVisible={isTransitioning} onTransitionEnd={handleTransitionEnd} />
          </div>
      </Router>
  );
};

export default App;

