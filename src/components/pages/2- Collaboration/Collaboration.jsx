import './Collaboration.css';
import inta from '../../../assets/images/inta.png';
import muni from '../../../assets/images/muni.png';
import unraf from '../../../assets/images/unraf.png';

const Collaboration = () => {
    return (
        <div className="collaboration-container">
          <h2>En colaboración con:</h2>
          <div className="imagenes-empresas">
            <img src={inta} alt="INTA Logo" className="empresas" />
            <img src={muni} alt="Muni Logo" className="empresas" />
            <img src={unraf} alt="UNRAF Logo" className="empresas" />
          </div>
        </div>
    );
};

export default Collaboration;
