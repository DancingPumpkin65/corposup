const NewsletterSection = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="p-10 rounded-lg flex items-center justify-center">
        <div className="relative h-[418px] w-full flex justify-center items-center rounded-[15px] bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute bottom-4 left-4 text-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:gap-6 w-full">
            <div className="lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                Restez connecté
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300 mt-2">
                Bénéficiez d'avantages spécifiques, tels que des réductions exclusives en vous abonnant à notre newsletter.
              </p>
            </div>

            <div className="mt-4 lg:mt-0 lg:w-1/3 flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Entrez votre adresse e-mail..." 
                className="w-full sm:w-[300px] md:w-[350px] lg:w-[389px] border rounded placeholder-opacity-75 p-2 text-gray-600"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 lg:w-2/4 rounded">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
