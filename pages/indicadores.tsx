import { ProtectedRoute } from '@/components/ProtectedRoute';

const IndicatorsPageWrapper = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <IndicatorsPage />
    </ProtectedRoute>
  );
};

const IndicatorsPage = () => {
  return <div>Indicadores</div>;
};

export default IndicatorsPageWrapper;
