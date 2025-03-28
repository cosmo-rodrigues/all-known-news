'use client';

import { useState, useTransition, useEffect } from 'react'; // Add useEffect
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

const availableLanguages = [
  {
    value: 'de',
    label: 'Deutsch',
  },
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'pt',
    label: 'Português',
  },
];

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const localActive = useLocale();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (
      savedLanguage &&
      availableLanguages.some((lang) => lang.value === savedLanguage)
    ) {
      setValue(savedLanguage);
    } else {
      setValue(localActive);
    }
  }, [localActive]);

  const onSelectChange = (selectedLanguage: string) => {
    setValue(selectedLanguage === value ? '' : selectedLanguage);
    setOpen(false);

    localStorage.setItem('selectedLanguage', selectedLanguage);

    const currentPath = pathname.split('/')[2];

    startTransition(() => {
      if (currentPath)
        return router.push(`/${selectedLanguage}/${currentPath}`);

      router.push(`/${selectedLanguage}`);
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="hidden lg:flex justify-between"
        >
          {value
            ? availableLanguages.find((lang) => lang.value === value)?.label
            : 'Select language'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[150px] p-0">
        <Command>
          <CommandInput placeholder="Search language" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {availableLanguages.map((lang) => (
                <CommandItem
                  disabled={isPending}
                  defaultValue={localActive}
                  key={lang.value}
                  value={lang.value}
                  onSelect={onSelectChange}
                >
                  {lang.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === lang.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
