import { ProtectedRoute } from '@/components/ProtectedRoute';

const IndicatorsPage = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <div>Indicadores</div>
    </ProtectedRoute>
  );
};

export default IndicatorsPage;
