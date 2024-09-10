import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
        return newErrors;
    };

    const handleLogin = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Redirigir a la pantalla de categorías de preguntas
            navigate('/categories');
        }
    };

    const handleRegisterRedirect = () => {
        // Redirigir a PlayerForm para registrarse
        navigate('/register');
    };

    return (
        <div className='form-container'>
            <form>
                <h2 className="form_subtitle">Guardianes del suelo</h2>
                <fieldset className="fieldset_form1 login-mode">
                    <legend className="fieldset_legends login-mode">INICIA SESIÓN</legend>

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
                </fieldset>

                <div className="button.group">
                    <button type="button" onClick={handleLogin}>
                        <span className="button_top">¡INICIAR SESIÓN!</span>
                    </button>
                    <span id='espacio'></span>
                    <button type="button" onClick={handleRegisterRedirect}>
                        <span className="button_top">REGISTRARSE</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
