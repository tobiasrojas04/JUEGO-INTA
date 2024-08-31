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
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h2 className="form_subtitle">Guardianes del suelo</h2>
                
                <fieldset className="fieldset_form1">
                    <legend className="fieldset_legends">INFORMACIÓN BASICA</legend>
                    <div className="form_input">
                        <label>Nombre
                        <input type="text" name="" id="" placeholder="Ingrese su nombre..."/>
                        </label>
                    </div>
                    <div className="form_input">
                        <label>Apellido
                        <input type="text" name="" id="" placeholder="Ingrese su apellido..."/>
                        </label>
                    </div>
                    <div className="form_input">
                        <label>Nombre de Usuario
                        <input type="text" name="" id="" placeholder="Recuerde usar los mismos datos con los que se registro!"/>
                        </label>
                    </div>
                    <div className="form_input">
                        <label>¿De que escuela venis?
                            <input list="referente" />
                            <datalist id="referente" name="referente">
                            </datalist>
                        </label>
                    </div>
                    <div className="form_input">
                        <label>¿Quienes van a ser parte del equipo? (5 por equipo)
                            <input 
                                list="miembros" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={placeholder}
                            />
                            <datalist id="miembros" name="miembros">
                            </datalist>
                        </label>
                        <button onClick={handleAddMember}>
                            <span id= "member" className="button_top">AGREGAR MIEMBRO</span>
                            </button>
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
                <button type="submit">
                    <span className="button_top">¡A JUGAR!</span>
                </button>
            </form>
        </div>
    );
};

PlayerForm.propTypes = {
    onNextScreen: PropTypes.func.isRequired,
};

export default PlayerForm;

