import itemPrd from '../../assets/Item.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  main_image?: string;
  category?: {
    name: string;
  };
  reviews_avg_rating?: number;
  reviews_count?: number;
}

const ProductsSection = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Équipement Industriel Premium',
      price: 1250,
      original_price: 1500,
      main_image: itemPrd,
      category: { name: 'Électronique' },
      reviews_avg_rating: 4.5,
      reviews_count: 128
    },
    {
      id: 2,
      name: 'Machine de Production Avancée',
      price: 2800,
      original_price: 3200,
      main_image: itemPrd,
      category: { name: 'Machines' },
      reviews_avg_rating: 4.8,
      reviews_count: 89
    },
    {
      id: 3,
      name: 'Outil Professionnel Haute Qualité',
      price: 450,
      original_price: 550,
      main_image: itemPrd,
      category: { name: 'Outils' },
      reviews_avg_rating: 4.2,
      reviews_count: 203
    },
    {
      id: 4,
      name: 'Matériel de Construction',
      price: 890,
      original_price: 1100,
      main_image: itemPrd,
      category: { name: 'Matériaux' },
      reviews_avg_rating: 4.6,
      reviews_count: 156
    }
  ];

  const getProductImageUrl = (imagePath?: string): string => {
    if (!imagePath) {
      return itemPrd;
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    return imagePath;
  };

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index} 
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-72 md:w-auto">
      <div className="relative">
        <div className="aspect-square relative overflow-hidden ">
          <img 
            src={getProductImageUrl(product.main_image)} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg p-3"
            onError={(e) => {
              e.currentTarget.src = itemPrd;
            }}
          />
          {product.original_price && product.original_price > product.price && (
            <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-xs font-semibold">
              {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-blue-600 font-medium mb-1">
          {product.category?.name || 'Général'}
        </p>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex">
            {renderStars(product.reviews_avg_rating || 0)}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews_count || 0})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {new Intl.NumberFormat('fr-FR').format(product.price)}€
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {new Intl.NumberFormat('fr-FR').format(product.original_price)}€
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full pt-8 pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-start text-start mb-8 pl-3">
          <h2 className="text-3xl md:text-5xl font-semibold py-6">Nouveaux Produits</h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex space-x-4 pb-4 pl-3" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
