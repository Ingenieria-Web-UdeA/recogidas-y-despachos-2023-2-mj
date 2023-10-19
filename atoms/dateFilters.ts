import { atom, useAtom } from 'jotai';

const dateFiltersAtom = atom({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

const useDateFilters = () => {
  const [dateFilters, setDateFilters] = useAtom(dateFiltersAtom);

  return {
    dateFilters,
    setDateFilters,
  };
};

export { useDateFilters };
