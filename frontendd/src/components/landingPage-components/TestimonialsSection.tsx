const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      initials: 'AZ',
      name: 'AZIZ',
      role: 'DG',
      text: '"CORPOSUP nous a permis de saisir des opportunités et d\'accélérer notre croissance à l\'échelle internationale."'
    },
    {
      id: 2,
      initials: 'SF',
      name: 'SOUFIANE',
      role: 'PDG',
      text: '"CorpoSup a transformé notre façon de sourcer nos équipements. La sélection est vaste, et le support client est de qualité supérieure."'
    },
    {
      id: 3,
      initials: 'GH',
      name: 'GHITA',
      role: 'Responsable des ventes',
      text: '"En tant que fournisseur, j\'ai constaté une augmentation significative des leads et des ventes..."'
    },
    {
      id: 4,
      initials: 'AM',
      name: 'Amine',
      role: 'Directeur d\'achat',
      text: '"CorpoSup a rationalisé notre processus d\'approvisionnement..."'
    }
  ];

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-semibold py-6">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-lg text-base md:text-lg">
            Découvrez les témoignages de nos clients satisfaits qui nous font confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col group hover:shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold">{testimonial.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-blue-600">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.role}</p>
              <p className="mt-4 text-gray-800 flex-grow">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
