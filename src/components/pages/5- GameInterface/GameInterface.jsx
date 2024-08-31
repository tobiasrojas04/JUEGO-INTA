import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GameInterface.css';

const questionsData = {
  cultivos: [
    {
      question: '¿Qué propiedades tiene la tierra para los cultivos?',
      answers: ['Nutrientes ricos', 'Poca agua', 'Demasiado sal', 'Ácido alto'],
      correctAnswer: 0
    },
    {
      question: '¿Qué tipo de suelo es mejor para los cultivos?',
      answers: ['Arenoso', 'Arcilloso', 'Limoso', 'Pedregoso'],
      correctAnswer: 2
    },
    // Añade más preguntas aquí...
  ],
  labranzas: [
    {
      question: '¿Cómo afectan las labranzas al suelo?',
      answers: ['Aumentan la erosión', 'Mejoran la estructura', 'Reducen nutrientes', 'Incrementan acidez'],
      correctAnswer: 1
    },
    {
      question: '¿Qué herramientas se usan en las labranzas?',
      answers: ['Rastrillo', 'Pala', 'Arado', 'Carretilla'],
      correctAnswer: 2
    },
    // Añade más preguntas aquí...
  ],
  // Añade más categorías aquí...
};

const GameInterface = () => {
  const { category } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  const categoryQuestions = questionsData[category] || [];
  const currentQuestion = categoryQuestions[currentQuestionIndex] || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeUp(true);
    }, 18000); // 18 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, []);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    // Después de un pequeño delay, avanzar a la siguiente pregunta
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000); // 1 segundo de delay para mostrar si la respuesta fue correcta o incorrecta
  };

  return (
    <div className='interface-container'>
      <header className="header">
        <h1>Guardianes del suelo</h1>
      </header>
      <div className="image-container"></div>
      <main className="game-container">
        <section className="question-container">
          <div className="question-text">{currentQuestion.question}</div>
          <div className="downloading-bar"></div>
          {timeUp && <div className="time-up-message">¡Tiempo terminado!</div>}
        </section>
        <section className="answers-container">
          {currentQuestion.answers?.map((answer, index) => (
            <button
              key={index}
              className={`answer-btn o${index + 1} ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(index)}
            >
              {answer}
            </button>
          ))}
        </section>
        {isCorrect !== null && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
        )}
      </main>
    </div>
  );
};

export default GameInterface;



