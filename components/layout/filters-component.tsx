'use client';

import React, { useState } from 'react';
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
import { NormalizedRoute, RouteKey, useTranslatedOptions } from '@/constants';
import { useNewsStore } from '@/store/news-store';
import { useTranslations, type TranslationValues } from 'next-intl';

export const FiltersComponent = ({
  route,
}: {
  route: RouteKey | NormalizedRoute;
}) => {
  const { removeFilters } = useStore();
  const { fetchArticles } = useNewsStore();
  const [localFilters, setLocalFilters] = useState<Filters>({} as Filters);
  const [filterCount, setFilterCount] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const tFilters = useTranslations('Filters');
  const { countryOptions, categoryOptions, languageOptions } =
    useTranslatedOptions();

  const handleSearch = () => {
    fetchArticles(localFilters.q, route);
  };

  const updateFilterCount = (filters: Filters) => {
    let count = 0;
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

    fetchArticles(clearedFilters.q, route);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Header with Search Input and Find Button */}
      <div className="flex items-center justify-between w-full mr-2">
        <Input
          type="text"
          name="q"
          placeholder={tFilters('searchPlaceholder')}
          value={localFilters.q || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full mr-2"
        />
        <Button onClick={handleSearch}>{tFilters('findButton')}</Button>
      </div>

      {/* Filters Drawer with Badge */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative">
            {tFilters('filtersButton')}
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
            <DrawerTitle>{tFilters('title')}</DrawerTitle>
            <DrawerDescription>{tFilters('subTitle')}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {tFilters('country.title')}
              </label>
              <MultiSelect
                options={countryOptions}
                onValueChange={handleMultiSelectChange('country')}
                defaultValue={selectedCountries}
                placeholder={tFilters('country.placeholder')}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {tFilters('category.title')}
              </label>
              <MultiSelect
                options={countryOptions}
                onValueChange={handleMultiSelectChange('country')}
                defaultValue={selectedCountries}
                placeholder={tFilters('country.placeholder')}
              />
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {tFilters('language.title')}
              </label>
              <MultiSelect
                options={languageOptions}
                onValueChange={handleMultiSelectChange('language')}
                defaultValue={selectedLanguages}
                placeholder={tFilters('language.placeholder')}
              />
            </div>
          </div>
          <DrawerFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClearFilters}>
              {tFilters('clearFiltersButton')}
            </Button>
            <Button onClick={handleSearch}>{tFilters('findButton')}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
