import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { type FilterComponentProps, type Store } from '@/components/ProductsPage/types';
import { Button } from '@/components/Shadcn/Button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/Shadcn/Select';

const PriceSlider = ({ min, max, onMinChange, onMaxChange }: { min: number, max: number, onMinChange: (v: number) => void, onMaxChange: (v: number) => void }) => (
  <div className="mb-8">
    <h2 className="text-md font-semibold text-gray-500">Price range</h2>
    <div className="relative w-full mt-4">
      <div className="h-1 bg-gray-300 rounded-full"></div>
      <div className="absolute top-0 h-1 bg-blue-500 rounded-full"
        style={{
          left: `${(min / 25000) * 100}%`,
          width: `${((max - min) / 25000) * 100}%`
        }} />
      <input
        type="range"
        min="0"
        max="25000"
        value={min}
        onChange={e => onMinChange(Number(e.target.value))}
        className="absolute top-0 w-full h-1 bg-transparent pointer-events-auto range-thumb"
        aria-label="Prix minimum"
      />
      <input
        type="range"
        min="0"
        max="25000"
        value={max}
        onChange={e => onMaxChange(Number(e.target.value))}
        className="absolute top-0 w-full h-1 bg-transparent pointer-events-auto range-thumb"
        aria-label="Prix maximum"
      />
    </div>
    <div className="flex justify-between text-sm text-gray-500 mt-2">
      <span>{min.toLocaleString()} DH</span>
      <span>{max.toLocaleString()} DH</span>
    </div>
  </div>
);

const StoreSelect = ({
  stores,
  value,
  onChange,
}: {
  stores: Store[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full mt-4 text-base px-5 border border-gray-300 rounded-md bg-white text-gray-500">
      <SelectValue placeholder="Choose store" />
    </SelectTrigger>
    <SelectContent>
      {stores.filter(s => s.store_status === 'published').map((store) => (
        <SelectItem key={store.id} value={store.id.toString()}>
          {store.store_name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const FilterComponent = ({ filters, onFilterChange }: FilterComponentProps) => {
  const { stores, minPrice, maxPrice, resetFilters } = useFilters(filters);
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [localStore, setLocalStore] = useState(filters.selectedStore);

  const handleApply = () => {
    onFilterChange({
      ...filters,
      priceRange: { min: localMin, max: localMax },
      selectedStore: localStore,
    });
  };

  const handleReset = () => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
    setLocalStore('');
    resetFilters(onFilterChange);
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Filters</h2>
      <div className="mt-4">
        <PriceSlider min={localMin} max={localMax} onMinChange={setLocalMin} onMaxChange={setLocalMax} />
        <StoreSelect stores={stores} value={localStore} onChange={setLocalStore} />
        <Button className="mt-6 bg-orange-500 text-white w-full py-2 rounded-md font-bold hover:bg-orange-600 transition-colors" onClick={handleApply}>
          FILTER
        </Button>
        <Button className="mt-2 bg-transparent hover:bg-transparent border-none shadow-none text-orange-500 w-full py-3 font-semibold hover:underline" onClick={handleReset}>
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
