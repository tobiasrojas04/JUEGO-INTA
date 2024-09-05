import { useState } from 'react';
import './PlayerForm.css';
import PropTypes from 'prop-types';

const PlayerForm = ({ onNextScreen }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('Escribe un nombre aquí');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        school: '',
        teamName: '',
    });
    const [errors, setErrors] = useState({});

    const handleAddMember = (e) => {
        e.preventDefault();
        if (name && teamMembers.length < 5) {
            setTeamMembers([...teamMembers, name]);
            setName('');
            setPlaceholder('¡Usuario cargado!');
            setTimeout(() => setPlaceholder('Escribe un nombre aquí'), 1000);
        } else {
            setPlaceholder('Debe agregar un nombre válido');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = '¡El nombre es obligatorio!';
        if (!formData.lastName.trim()) newErrors.lastName = '¡El apellido es obligatorio!';
        if (!formData.username.trim()) newErrors.username = '¡El nombre de usuario es obligatorio!';
        if (!formData.school.trim()) newErrors.school = '¡Ingrese el nombre de su escuela!';
        if (!formData.teamName.trim()) newErrors.teamName = '¡El nombre del equipo es obligatorio!';
        if (teamMembers.length < 1) newErrors.teamMembers = 'Debe agregar al menos un miembro al equipo';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onNextScreen();
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h2 className="form_subtitle">Guardianes del suelo</h2>
                
                <fieldset className="fieldset_form1">
                    <legend className="fieldset_legends">INFORMACIÓN BASICA</legend>
                    <div className="form_input">
                        <label>Nombre
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder={errors.firstName || "Ingrese su nombre..."} 
                            value={formData.firstName} 
                            onChange={handleChange}
                        />
                        </label>
                    </div>
                    <div className="form_input">
                        <label>Apellido
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder={errors.lastName || "Ingrese su apellido..."} 
                            value={formData.lastName} 
                            onChange={handleChange}
                        />
                        </label>
                    </div>
                    <div className="form_input">
                        <label>Nombre de Usuario
                        <input 
                            type="text" 
                            name="username" 
                            placeholder={errors.username || "Recuerde usar los mismos datos con los que se registró!"} 
                            value={formData.username} 
                            onChange={handleChange}
                        />
                        </label>
                    </div>
                    <div className="form_input">
                        <label>¿De qué escuela vienes?
                        <input 
                            type="text" 
                            name="school" 
                            placeholder={errors.school || "Escribe el nombre de tu escuela..."} 
                            value={formData.school} 
                            onChange={handleChange}
                        />
                        </label>
                    </div>
                    <div className="form_input">
                        <label>¿Quiénes van a ser parte del equipo? (5 por equipo)
                        <input 
                            list="miembros" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={placeholder}
                        />
                        <datalist id="miembros" name="miembros"></datalist>
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
                        <label>¿Cómo se va a llamar tu equipo?
                        <input 
                            type="text" 
                            name="teamName" 
                            placeholder={errors.teamName || "Ej: Los Guardianes Rojos"} 
                            value={formData.teamName} 
                            onChange={handleChange}
                        />
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

