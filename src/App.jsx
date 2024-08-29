// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/pages/1- Welcome/Welcome';
import Collaboration from './components/pages/2- Collaboration/Collaboration';
import PlayerForm from './components/pages/3- PlayerForm/PlayerForm';
import QuestionCategory from './components/pages/4- QuestionCategory/QuestionCategory';
import GameInterface from './components/pages/5- GameInterface/GameInterface'; // Asegúrate de importar correctamente

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    if (currentScreen < 2) { // Solo ejecuta el temporizador en las primeras dos pantallas
      const timer = setTimeout(() => {
        setCurrentScreen((prevScreen) => prevScreen + 1);
      }, 3000); // Cambia de pantalla cada 3 segundos

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
    }
  }, [currentScreen]);

  const handleNextScreen = () => {
    setCurrentScreen((prevScreen) => prevScreen + 1);
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
        return <div>Final</div>; // Puedes cambiar esto para manejar lo que pasa después de la última pantalla
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={renderScreen()} />
          <Route path="/game/:category" element={<GameInterface />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

