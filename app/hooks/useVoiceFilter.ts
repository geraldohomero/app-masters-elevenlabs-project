import { useState, useEffect } from 'react';
import { Voice } from '../types/voice';

export const useVoiceFilter = (vozes: Voice[]) => {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

  const normalizeLabel = (label: string) => label.toLowerCase().replace(/[-\s]/g, '');

  useEffect(() => {
    const filterValues = vozes.reduce((acc, voice) => {
      Object.keys(voice.labels).forEach((label) => {
        const normalizedLabel = normalizeLabel(voice.labels[label]);
        if (!acc[label]) {
          acc[label] = new Set();
        }
        acc[label].add(normalizedLabel);
      });
      return acc;
    }, {} as { [key: string]: Set<string> });

    const filterObject = Object.keys(filterValues).reduce((acc, key) => {
      acc[key] = Array.from(filterValues[key]);
      return acc;
    }, {} as { [key: string]: string[] });

    setFilters(filterObject);
  }, [vozes]);

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters((prev) => {
      const newSelectedFilters = { ...prev, [filterName]: value };

      // Atualiza os filtros disponíveis com base na seleção atual 
      // removendo os valores que não estão mais disponíveis.
      const newFilters = vozes.reduce((acc, voice) => {
        const matches = Object.keys(newSelectedFilters).every((key) => {
          return newSelectedFilters[key] === '' || normalizeLabel(voice.labels[key]) === normalizeLabel(newSelectedFilters[key]);
        });

        if (matches) {
          Object.keys(voice.labels).forEach((label) => {
            const normalizedLabel = normalizeLabel(voice.labels[label]);
            if (!acc[label]) {
              acc[label] = new Set();
            }
            acc[label].add(normalizedLabel);
          });
        }

        return acc;
      }, {} as { [key: string]: Set<string> });

      const updatedFilters = Object.keys(newFilters).reduce((acc, key) => {
        acc[key] = Array.from(newFilters[key]);
        return acc;
      }, {} as { [key: string]: string[] });

      console.log('Vozes filtradas', vozes.filter((voice) => {
        return Object.keys(newSelectedFilters).every((filterName) => {
          return newSelectedFilters[filterName] === '' || normalizeLabel(voice.labels[filterName]) === normalizeLabel(newSelectedFilters[filterName]);
        });
      }).map(({ name, category, labels, voice_id }) => ({ name, category, labels, voice_id })));
      setFilters(updatedFilters);

      return newSelectedFilters;
    });
  };

  const filteredVozes = vozes.filter((voice) => {
    return Object.keys(selectedFilters).every((filterName) => {
      return selectedFilters[filterName] === '' || normalizeLabel(voice.labels[filterName]) === normalizeLabel(selectedFilters[filterName]);
    });
  });

  return { filters, selectedFilters, handleFilterChange, filteredVozes };
};