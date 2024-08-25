import { useState, useEffect } from 'react';
import Welcome from './components/pages/1- Welcome/Welcome';
import Collaboration from './components/pages/2- Collaboration/Collaboration';
import PlayerForm from './components/pages/3- PlayerForm/PlayerForm';

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
      default:
        return <div>Final</div>; // Puedes cambiar esto para manejar lo que pasa después de la última pantalla
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
};

export default App;

