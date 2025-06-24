import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { AuthLayout } from './layouts/AuthLayout';
import { Button } from './common/Button';

const SignIn = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const response = await authService.login(formData);
        setMessage(`Welcome ${response.user.firstname} ${response.user.lastname}! Role: ${response.user.role}`);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to dashboard for role-based routing
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
        
        setLoading(false);
    };

  return (
    <AuthLayout title="Connexion">
      <form onSubmit={handleSubmit}>
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

        <Button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
      
      <div>
        <p>Pas de compte? <Link to="/signup">Inscrivez-vous ici</Link></p>
      </div>
      
      {message && <div>{message}</div>}
    </AuthLayout>
  );
};

export default SignIn;