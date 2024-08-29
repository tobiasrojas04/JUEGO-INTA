import './QuestionCategory.css';

const QuestionCategory = () => {
  return (
    <div className="container">
      <h1 className="main-title">¿Qué categoría vas a elegir?</h1>
      <h2 className="subtitle">El suelo relacionado con:</h2>
      <div className="buttons">
        <button className="c-button c-button--gooey cultivos">Los cultivos
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        <button className="c-button c-button--gooey labranzas">Las labranzas
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        <button className="c-button c-button--gooey vacas">Las vacas
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        <button className="c-button c-button--gooey microorganismos">Los microorganismos
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        <button className="c-button c-button--gooey origen">Su origen
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuestionCategory;
