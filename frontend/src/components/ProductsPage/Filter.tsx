import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '@/services/apiClient';

// shadcn imports
import { Button } from '../Shadcn/Button';
import { Checkbox } from '../Shadcn/Checkbox';
import { Label } from '../Shadcn/Label';

interface Store {
  id: string;
  store_name: string;
}

interface Filters {
  stores?: string[];
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
}

interface FilterComponentProps {
  onApplyFilters: (filters: Filters) => void;
  onResetFilters: () => void;
  availableStores: Store[];
}

const FilterComponent = ({ onApplyFilters, onResetFilters }: FilterComponentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    // Initialize filters from URL params
    const storesParam = searchParams.get('stores');
    const priceMinParam = searchParams.get('priceMin');
    const priceMaxParam = searchParams.get('priceMax');
    const sortByParam = searchParams.get('sortBy');

    if (storesParam) {
      setSelectedStores(storesParam.split(','));
    }

    if (priceMinParam && priceMaxParam) {
      setPriceRange({ min: Number(priceMinParam), max: Number(priceMaxParam) });
    }

    if (sortByParam) {
      setSortBy(sortByParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/stores');
      console.log('Stores Response:', response.data);
      
      // Handle the response structure from your API
      let storesData = response.data;
      if (storesData.data) {
        storesData = storesData.data;
      }
      
      setStores(storesData);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleStoreChange = (storeId: string) => {
    const updatedStores = selectedStores.includes(storeId)
      ? selectedStores.filter(id => id !== storeId)
      : [...selectedStores, storeId];

    setSelectedStores(updatedStores);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleSortByChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const applyFilters = () => {
    const filters: Filters = {};

    if (selectedStores.length > 0) {
      filters.stores = selectedStores;
    }

    if (priceRange) {
      filters.priceMin = priceRange.min;
      filters.priceMax = priceRange.max;
    }

    if (sortBy) {
      filters.sortBy = sortBy;
    }

    onApplyFilters(filters);
  };

  const resetFilters = () => {
    setSelectedStores([]);
    setPriceRange(null);
    setSortBy(null);
    onResetFilters();
    setSearchParams({});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Store Filters */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filtrer par magasin</h3>
        <div className="flex flex-col gap-2">
          {stores.map(store => (
            <div key={store.id} className="flex items-center">
              <Checkbox
                id={`store-${store.id}`}
                checked={selectedStores.includes(store.id)}
                onCheckedChange={() => handleStoreChange(store.id)}
              />
              <Label htmlFor={`store-${store.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                {store.store_name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filtrer par prix</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange?.min || ''}
            onChange={e => handlePriceRangeChange(Number(e.target.value), priceRange?.max || 0)}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange?.max || ''}
            onChange={e => handlePriceRangeChange(priceRange?.min || 0, Number(e.target.value))}
            className="border rounded-md p-2 w-full"
          />
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Trier par</h3>
        <select
          value={sortBy || ''}
          onChange={e => handleSortByChange(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="">Sélectionner une option</option>
          <option value="popularity">Popularité</option>
          <option value="priceLowToHigh">Prix: Low à High</option>
          <option value="priceHighToLow">Prix: High à Low</option>
        </select>
      </div>

      {/* Apply and Reset Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={resetFilters}
          variant="outline"
          className="w-full mr-2"
        >
          Réinitialiser
        </Button>
        <Button
          onClick={applyFilters}
          className="w-full"
        >
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;