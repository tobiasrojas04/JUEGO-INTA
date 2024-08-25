import { useEffect, useState } from 'react';
import './BlackScreenTransition.css';

const BlackScreenTransition = () => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000); // Duración de la pantalla negra (1 segundo)
  
      return () => clearTimeout(timer);
    }, []);
  
    return <div className={`black-screen ${visible ? 'fade-in' : 'fade-out'}`}></div>;
  };
  
  export default BlackScreenTransition;

