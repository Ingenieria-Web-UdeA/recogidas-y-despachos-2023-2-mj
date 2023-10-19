interface DataCardProps {
  title: string;
  indicator: number;
}
const DataCard = ({ title, indicator }: DataCardProps) => {
  return (
    <div className='flex flex-col items-center bg-slate-100 rounded-lg p-4 shadow-md'>
      <h3 className='text-slate-700'>{title}</h3>
      <span className='text-indigo-500 text-4xl font-light tracking-wider'>
        {indicator}
      </span>
    </div>
  );
};

export { DataCard };
