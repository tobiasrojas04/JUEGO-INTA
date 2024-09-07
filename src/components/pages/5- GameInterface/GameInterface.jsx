import { useState, useEffect } from 'react';
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
  ],
  vacas: [
    {
      question: '¿Cómo ayudan las vacas al suelo?',
      answers: ['Añaden nutrientes', 'Lo compactan mucho', 'Lo secan', 'Lo dañan con sus patas'],
      correctAnswer: 0
    },
    {
      question: '¿Qué necesitan las vacas para que el suelo sea bueno?',
      answers: ['Buenas pasturas', 'Muchas piedras', 'Poco pasto', 'Mucho barro'],
      correctAnswer: 0
    },
    {
      question: '¿Qué aportan las vacas al suelo?',
      answers: ['Nutrientes y fertilizantes', 'Sombra', 'Nieve', 'Arena'],
      correctAnswer: 0
    }
  ],
  microorganismos: [
    {
      question: '¿Qué hacen los microorganismos en el suelo?',
      answers: ['Lo limpian', 'Lo fertilizan', 'Se lo comen todo', 'Lo secan'],
      correctAnswer: 1
    },
    {
      question: '¿Qué necesitan los microorganismos para vivir en el suelo?',
      answers: ['Agua y nutrientes', 'Mucho sol', 'Viento', 'Frío extremo'],
      correctAnswer: 0
    },
    {
      question: '¿Por qué son importantes los microorganismos en el suelo?',
      answers: ['Ayudan a las plantas a crecer', 'Lo hacen más ácido', 'Lo llenan de basura', 'Lo hacen más rocoso'],
      correctAnswer: 0
    }
  ],
  origen: [
    {
      question: '¿Cómo se formó el suelo?',
      answers: ['Por erosión de rocas', 'Cayó del cielo', 'Nació de las plantas', 'Llegó con el viento'],
      correctAnswer: 0
    },
    {
      question: '¿Qué es el suelo?',
      answers: ['Es una mezcla de minerales y materia orgánica', 'Es solo polvo', 'Es tierra mágica', 'Es agua dura'],
      correctAnswer: 0
    },
    {
      question: '¿Por qué es importante cuidar el suelo?',
      answers: ['Porque nos da comida y vida', 'Porque es bonito', 'Porque lo necesitamos para correr', 'Porque nos protege del sol'],
      correctAnswer: 0
    }
  ],
};


const GameInterface = () => {
  const { category } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18); // Estado para la cuenta regresiva
  const [timeUp, setTimeUp] = useState(false); // Estado para indicar si el tiempo se acabó

  const categoryQuestions = questionsData[category] || [];
  const currentQuestion = categoryQuestions[currentQuestionIndex] || {};

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTimeUp(true);

      // Activar el efecto de opacidad cuando se termina el tiempo
      setOverlayActive(true);

      // Pasa a la siguiente pregunta después de 4 segundos cuando el tiempo se termina
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setOverlayActive(false); // Desactiva el overlay después de cambiar de pregunta
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(18); // Reinicia el tiempo para la siguiente pregunta
        setTimeUp(false); // Resetea el estado de "tiempo terminado"
      }, 4000);
    }
  }, [timeLeft, selectedAnswer]);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setOverlayActive(true); // Activa el efecto de opacidad

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setOverlayActive(false); // Desactiva el efecto de opacidad
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(18); // Reinicia el tiempo para la siguiente pregunta
      setTimeUp(false); // Resetea el estado de "tiempo terminado"
    }, 3000);
  };

  return (
    <div className={`interface-container ${overlayActive ? 'overlay-active' : ''}`}>
      <header className="header">
        <h1>Guardianes del suelo</h1>
      </header>
      <div className="image-container"></div>
      <main className="game-container">
        <section className="question-container">
          <div className="question-text">
            {isCorrect === null
              ? currentQuestion.question
              : isCorrect
              ? '¡CORRECTO! ¡A seguir así!'
              : 'INCORRECTA ¡Suerte la próxima!'}
          </div>

          {/* Mensaje de cuenta regresiva o tiempo terminado */}
          <div className="timer-text">
            {timeUp ? '¡TIEMPO TERMINADO! Pasemos a la siguiente' : `Tiempo terminado en: ${timeLeft}s`}
          </div>
        </section>

        <section className="answers-container">
          {currentQuestion.answers?.map((answer, index) => (
            <button
              key={index}
              className={`answer-btn o${index + 1} ${
                selectedAnswer === index && isCorrect !== null
                  ? isCorrect
                    ? 'correct-answer'
                    : 'incorrect-answer'
                  : ''
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={timeUp} // Desactiva los botones si el tiempo se terminó
            >
              {answer}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

export default GameInterface;




