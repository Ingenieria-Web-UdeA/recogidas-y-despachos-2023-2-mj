import { PrivateRoute } from '@/components/PrivateRoute';

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <div>
        <h1>Perfil</h1>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
