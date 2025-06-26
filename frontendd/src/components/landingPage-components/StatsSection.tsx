const StatsSection = () => {
  const stats = [
    {
      number: "+10",
      label: "Années d'expérience",
    },
    {
      number: "+2500",
      label: "produits",
    },
    {
      number: "+150",
      label: "fournisseurs",
    },
    {
      number: "+3200",
      label: "devis",
    },
  ];

  return (
    <div className="w-full h-auto px-6 py-8 grid grid-cols-2 justify-center items-center bg-blue-600 text-white gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex justify-center flex-col items-center w-full h-[88px]"
        >
          <p className="text-[50px] font-semibold">{stat.number}</p>
          <p className="text-[16px]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
