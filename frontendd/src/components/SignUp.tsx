import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'buyer'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.password !== formData.password_confirmation) {
      setMessage('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
    setMessage(`Compte créé avec succès! Bienvenue ${response.data.user.firstname} ${response.data.user.lastname}`);
    
    if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirmer mot de passe:</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type de compte:</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={formData.role === 'buyer'}
                onChange={handleChange}
              />
              Acheteur
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="seller"
                checked={formData.role === 'seller'}
                onChange={handleChange}
              />
              Vendeur
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Création...' : 'Créer un compte'}
        </button>
      </form>
      
      <div>
        <p>Déjà un compte? <a href="/signin">Connectez-vous ici</a></p>
      </div>
      
      {message && <div>{message}</div>}
    </div>
  );
};

export default SignUp;