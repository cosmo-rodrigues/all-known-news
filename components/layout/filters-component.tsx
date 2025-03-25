'use client';

import React, { useState, useEffect } from 'react';
import { Filters, useStore } from '../context/store-context/store-context';
import { MultiSelect } from './multi-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useNewsStore } from '@/store/news-store';

export const FiltersComponent = ({ route }: { route: string }) => {
  const { removeFilters } = useStore();
  const { getFiltersForRoute, fetchArticles } = useNewsStore();
  const [localFilters, setLocalFilters] = useState<Filters>({} as Filters);
  const [filterCount, setFilterCount] = useState(0);
  // Add state for MultiSelect values
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    const savedFilters = getFiltersForRoute(route);
    setLocalFilters(savedFilters);
    // Initialize MultiSelect values from saved filters
    setSelectedCountries(savedFilters.country?.split(',') || []);
    setSelectedCategories(savedFilters.category?.split(',') || []);
    setSelectedLanguages(savedFilters.language?.split(',') || []);
  }, [route, getFiltersForRoute]);

  const handleSearch = () => {
    fetchArticles(route, localFilters);
  };

  const updateFilterCount = (filters: Filters) => {
    let count = 0;
    if (filters.q) count++;
    if (filters.country) count += filters.country.split(',').length;
    if (filters.category) count += filters.category.split(',').length;
    if (filters.language) count += filters.language.split(',').length;
    setFilterCount(count);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...localFilters,
      [name]: value,
    };
    setLocalFilters(newFilters);
    updateFilterCount(newFilters);
  };

  const handleMultiSelectChange =
    (name: string) => (selectedValues: string[]) => {
      // Update the corresponding state for each MultiSelect
      if (name === 'country') setSelectedCountries(selectedValues);
      if (name === 'category') setSelectedCategories(selectedValues);
      if (name === 'language') setSelectedLanguages(selectedValues);

      const newFilters = {
        ...localFilters,
        [name]: selectedValues.join(','),
      };
      setLocalFilters(newFilters);
      updateFilterCount(newFilters);
    };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    // Clear all filters in the store
    removeFilters();

    // Reset all local states
    const clearedFilters = {
      q: '',
      country: '',
      category: '',
      language: '',
    } as Filters;

    setLocalFilters(clearedFilters);
    setSelectedCountries([]);
    setSelectedCategories([]);
    setSelectedLanguages([]);
    updateFilterCount(clearedFilters);

    fetchArticles(route, clearedFilters);
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
          onKeyDown={handleKeyDown}
          className="w-full mr-2"
        />
        <Button onClick={handleSearch}>Find</Button>
      </div>

      {/* Filters Drawer with Badge */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative">
            Filters
            {filterCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
              >
                {filterCount}
              </Badge>
            )}
          </Button>
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
                defaultValue={selectedCountries}
                placeholder="Select countries"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <MultiSelect
                options={categoryOptions}
                onValueChange={handleMultiSelectChange('category')}
                defaultValue={selectedCategories}
                placeholder="Select categories"
              />
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <MultiSelect
                options={languageOptions}
                onValueChange={handleMultiSelectChange('language')}
                defaultValue={selectedLanguages}
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
