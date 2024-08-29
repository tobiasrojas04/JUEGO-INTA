// GameInterface.jsx
import { useParams } from 'react-router-dom';
import './GameInterface.css';

const questions = {
  cultivos: '¿Qué propiedades tiene la tierra para los cultivos?',
  labranzas: '¿Cómo afectan las labranzas al suelo?',
  vacas: '¿Cómo contribuyen las vacas al suelo?',
  microorganismos: '¿Cuál es el rol de los microorganismos en el suelo?',
  origen: '¿Cuál es el origen del suelo?'
};

const GameInterface = () => {
  const { category } = useParams();
  const questionText = questions[category] || 'Pregunta no encontrada';

  return (
    <div className='interface-container'>
      <header className="header">
        <h1>Guardianes del suelo</h1>
      </header>
      <div className="image-container"></div>
      <main className="game-container">
        <section className="question-container">
          <div className="question-text">{questionText}</div>
          <div className="downloading-bar"></div>
        </section>
        <section className="answers-container">
          <button className="answer-btn o1">▲ Respuesta 1</button>
          <button className="answer-btn o2">◆ Respuesta 2</button>
          <button className="answer-btn o3">● Respuesta 3</button>
          <button className="answer-btn o4">■ Respuesta 4</button>
        </section>
      </main>
    </div>
  );
};

export default GameInterface;


