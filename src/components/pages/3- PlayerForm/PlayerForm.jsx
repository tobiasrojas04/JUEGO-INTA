import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './PlayerForm.css';

const PlayerForm = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('Escribe un nombre aquí');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        school: '',
        teamName: '',
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate(); // Usa navigate para la redirección

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
        if (!formData.username.trim()) newErrors.username = '¡El nombre de usuario es obligatorio!';
        if (!formData.password.trim()) newErrors.password = '¡La contraseña es obligatoria!';
        if (!formData.firstName.trim()) newErrors.firstName = '¡El nombre es obligatorio!';
        if (!formData.lastName.trim()) newErrors.lastName = '¡El apellido es obligatorio!';
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
            // En vez de solo ejecutar onNextScreen, ahora redirige a /categories
            navigate('/categories');
        }
    };

    return (
        <div className='form-container player-form'>
            <form onSubmit={handleSubmit}>
                <h2 className="form_subtitle">Guardianes del suelo</h2>
                
                <fieldset className="fieldset_form1">
                    <legend className="fieldset_legends">
                        ¿NUNCA JUGASTE? REGISTRATE
                    </legend>

                    {/* El resto del formulario permanece igual */}
                    <div className="form_input">
                        <label>Nombre de Usuario
                            <input 
                                type="text" 
                                name="username" 
                                placeholder={errors.username || "Pensa en un nombre creativo..."} 
                                value={formData.username} 
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form_input">
                        <label>Contraseña
                            <input 
                                type="password" 
                                name="password" 
                                placeholder={errors.password || "Escribe una contraseña segura..."} 
                                value={formData.password} 
                                onChange={handleChange}
                            />
                        </label>
                    </div>

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
                        <label>¿De qué escuela venís?
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
                            <span id="member" className="button_top">AGREGAR MIEMBRO</span>
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

                <div className="button.group">
                    <button type="submit">
                        <span className="button_top">¡A JUGAR YA!</span>
                    </button>
                </div>
            </form>
        </div>
    );
};



export default PlayerForm;
