import { useDateFilters } from '@/atoms/dateFilters';

const YEARS = [2021, 2022, 2023];
const MONTHS = {
  '0': 'Enero',
  '1': 'Febrero',
  '2': 'Marzo',
  '3': 'Abril',
  '4': 'Mayo',
  '5': 'Junio',
  '6': 'Julio',
  '7': 'Agosto',
  '8': 'Septiembre',
  '9': 'Octubre',
  '10': 'Noviembre',
  '11': 'Diciembre',
};

const DateFilters = () => {
  const { dateFilters, setDateFilters } = useDateFilters();

  return (
    <div className='flex gap-3'>
      <select
        value={dateFilters.year}
        onChange={(e) => {
          setDateFilters({ ...dateFilters, year: parseInt(e.target.value) });
        }}
      >
        {YEARS.map((year) => {
          return <option key={year}>{year}</option>;
        })}
      </select>
      <select
        value={dateFilters.month}
        onChange={(e) => {
          setDateFilters({ ...dateFilters, month: parseInt(e.target.value) });
        }}
      >
        {Object.keys(MONTHS).map((month: string) => {
          return (
            <option key={month} value={month}>
              {MONTHS[month as keyof typeof MONTHS]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { DateFilters };
