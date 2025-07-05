import React from 'react';
import { useState } from 'react';
import workImage from '@/assets/work.webp';
import rectangleOverlay from '@/assets/Rectangle.webp';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Add your newsletter subscription logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setMessage('Merci pour votre inscription !');
      setEmail('');
    } catch {
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 rounded-lg flex items-center justify-center">
      <div className="relative h-[300px] sm:h-[350px] lg:h-[418.51px] flex justify-center items-center w-full max-w-6xl">
        <img 
          src={workImage} 
          alt="work image" 
          className="rounded-[15px] w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={rectangleOverlay} 
            alt="" 
            className="w-full h-full rounded-[15px] object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-4 text-white p-4 sm:p-6 lg:p-10 flex flex-col gap-4 lg:gap-6">
          {/* Texte */}
          <div className="lg:w-2/3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
              Restez connecté
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mt-2">
              Bénéficiez d'avantages spécifiques, tels que des réductions exclusives en vous abonnant à notre newsletter.
            </p>
          </div>

          {/* Formulaire */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Entrez votre adresse e-mail..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 w-full sm:w-auto border rounded placeholder-opacity-75 p-2 text-gray-600"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Inscription...' : "S'inscrire"}
              </button>
            </form>
            {message && (
              <p className={`text-sm mt-2 ${message.includes('Merci') ? 'text-green-300' : 'text-red-300'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
