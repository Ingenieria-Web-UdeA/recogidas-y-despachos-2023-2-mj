import { PrivateRoute } from '@/components/PrivateRoute';
import { PrimaryButton } from '@/components/ui/Buttons';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const ProfilePageWrapper = () => {
  return (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  );
};

const ProfilePage = () => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>();

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (image) {
      setLoading(true);
      const response = await axios.request({
        method: 'POST',
        url: '/api/file-upload',
        data: {
          fileName: image.name,
          fileType: image.type,
          email: data?.user?.email,
        },
      });

      // console.log(response.data.fields);

      const fd = new FormData();

      Object.entries(response.data.fields).forEach(([key, value]) => {
        fd.append(key, value as string);
      });

      fd.append('file', image);

      const uploadResponse = await axios.request({
        method: 'POST',
        url: response.data.url,
        data: fd,
      });

      console.log(uploadResponse);

      setLoading(false);
    }
  };

  return (
    <div className='p-10 flex flex-col gap-3 items-center'>
      <section>
        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          <label htmlFor='user-image'>
            <span>Foto de perfil</span>
            <input
              name='user-image'
              type='file'
              required
              onChange={(e) => setImage(e.target?.files[0])}
            />
          </label>
          <PrimaryButton
            type='submit'
            text='Guardar'
            loading={loading}
            onClick={() => {}}
          />
        </form>
      </section>
    </div>
  );
};

export default ProfilePageWrapper;
