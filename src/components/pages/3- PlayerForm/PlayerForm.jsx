import { useState } from 'react';
import './PlayerForm.css';
import PropTypes from 'prop-types';

const PlayerForm = ({ onNextScreen }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('Escribe un nombre aquí');

    const handleAddMember = (e) => {
        e.preventDefault();
        if (name && teamMembers.length < 5) {
            setTeamMembers([...teamMembers, name]);
            setName('');
            setPlaceholder('¡Usuario cargado!');
            setTimeout(() => setPlaceholder('Escribe un nombre aquí'), 1000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene la recarga de la página
        onNextScreen(); // Cambia a la siguiente pantalla al hacer clic en "¡A JUGAR!"
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="form_subtitle">Guardianes del suelo</h2>
            
            <fieldset className="fieldset_form1">
                <legend className="fieldset_legends">INFORMACIÓN BASICA</legend>
                <div className="form_input">
                    <label>¿De que escuela venis?
                        <input list="referente" />
                        <datalist id="referente" name="referente">
                        </datalist>
                    </label>
                </div>
                <div className="form_input">
                    <label>¿Quienes van a ser parte del equipo?
                        <input 
                            list="miembros" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={placeholder}
                        />
                        <datalist id="miembros" name="miembros">
                        </datalist>
                    </label>
                    <button onClick={handleAddMember}>Agregar Miembro</button>
                    <ul>
                        {teamMembers.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
                <div className="form_input">
                    <label>¿Como se va a llamar tu equipo?
                        <input name="nombre" id="nombre" placeholder="Ej: Los Guardianes Rojos" type="text" />
                    </label>
                </div>
            </fieldset>

            <div className="form_input">
                <label htmlFor="mensaje">¿Les esta gustando la visita?</label>
                <textarea id="mensaje" rows="8" placeholder="Escribi algo lindo"></textarea>
            </div>

            <button type="submit">
                <span className="button_top">¡A JUGAR!</span>
            </button>
        </form>
    );
};

PlayerForm.propTypes = {
    onNextScreen: PropTypes.func.isRequired,
};

export default PlayerForm;

