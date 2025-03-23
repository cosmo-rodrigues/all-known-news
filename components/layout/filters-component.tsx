import React, { useState, useEffect } from 'react';
import { Filters, useStore } from '../context/store-context/store-context';
import { MultiSelect } from './multi-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer';
import { categoryOptions, countryOptions, languageOptions } from '@/constants';

export const FiltersComponent = ({ route }: { route: string }) => {
  const { saveFilters, getFilters, removeFilters } = useStore();
  const [localFilters, setLocalFilters] = useState<Filters>({});

  // Initialize localFilters with saved filters for the route
  useEffect(() => {
    const savedFilters = getFilters(route);
    setLocalFilters(savedFilters);
  }, [route, getFilters]);

  // Handle input changes for the search field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle Enter key press in the search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search
    }
  };

  // Handle changes for MultiSelect filters (country, category, language)
  const handleMultiSelectChange =
    (name: string) => (selectedValues: string[]) => {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        [name]: selectedValues.join(','), // Convert array to comma-separated string
      }));
    };

  // Handle save button click
  const handleSave = () => {
    saveFilters(route, localFilters);
    alert(`Filters saved for ${route}`);
  };

  // Handle search functionality
  const handleSearch = () => {
    // Perform search using the current filters
    console.log('Searching with filters:', localFilters);
    // Add your search logic here (e.g., fetch articles based on filters)
  };

  // Handle clear filters
  const handleClearFilters = () => {
    removeFilters();
    setLocalFilters({}); // Reset all filters
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Header with Search Input and Find Button */}
      <div className="flex items-center justify-between w-full mr-2">
        <Input
          type="text"
          name="q"
          placeholder="Search for news..."
          value={localFilters.q || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add this line
          className="w-full mr-2"
        />
        <Button onClick={handleSearch}>Find</Button>
      </div>

      {/* Filters Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Select filters for your news feed.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <MultiSelect
                options={countryOptions}
                onValueChange={handleMultiSelectChange('country')}
                defaultValue={localFilters.country?.split(',') || []}
                placeholder="Select countries"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <MultiSelect
                options={categoryOptions}
                onValueChange={handleMultiSelectChange('category')}
                defaultValue={localFilters.category?.split(',') || []}
                placeholder="Select categories"
              />
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <MultiSelect
                options={languageOptions}
                onValueChange={handleMultiSelectChange('language')}
                defaultValue={localFilters.language?.split(',') || []}
                placeholder="Select languages"
              />
            </div>
          </div>
          <DrawerFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Button onClick={handleSearch}>Search</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
