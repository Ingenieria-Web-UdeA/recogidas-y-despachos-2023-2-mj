import { PrivateRoute } from '@/components/PrivateRoute';
import { PrimaryButton } from '@/components/ui/Buttons';
import { SyntheticEvent, useRef, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { useGetUserProfile } from '@/hooks/useGetUserProfile';
import { mutate } from 'swr';
import { UserProfileImage } from '@/components/UserProfileImage';
import { toast } from 'react-toastify';

const ProfilePageWrapper = () => {
  return (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  );
};

const ProfilePage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { userProfile } = useGetUserProfile();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    document: userProfile?.profile.document,
    phone: userProfile?.profile.phoneNumber,
  });
  const [image, setImage] = useState<File | null>();

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (image) {
      setLoading(true);
      const response = await axios.request({
        method: 'POST',
        url: API_ROUTES.fileUpload,
        data: {
          fileName: image.name,
          fileType: image.type,
        },
      });

      const fd = new FormData();

      Object.entries(response.data.fields).forEach(([key, value]) => {
        fd.append(key, value as string);
      });

      fd.append('file', image);

      await axios.request({
        method: 'POST',
        url: response.data.url,
        data: fd,
      });

      await axios.request({
        method: 'POST',
        url: API_ROUTES.profile,
        data: {
          image: image.name,
          document: formData.document,
          phone: formData.phone,
        },
      });

      mutate(API_ROUTES.profile);

      setLoading(false);
      toast.success('Perfil actualizado correctamente');
    }
  };

  return (
    <div className='p-10 flex flex-col gap-3 items-center'>
      <section>
        <h1>Perfil</h1>
      </section>
      <section>
        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          <div className='flex gap-3 items-center'>
            <div>
              <button
                type='button'
                onClick={() => {
                  if (fileInput.current) {
                    fileInput.current.click();
                  }
                }}
              >
                <UserProfileImage
                  image={
                    image
                      ? URL.createObjectURL(image)
                      : userProfile?.profile.image
                  }
                  height={120}
                  width={120}
                />
              </button>
            </div>
            <div className='flex flex-col gap-3'>
              <label>
                <span>Documento</span>
                <input
                  name='document'
                  type='text'
                  required
                  value={formData.document}
                  placeholder='CC 123456789'
                  onChange={(e) =>
                    setFormData({ ...formData, document: e.target.value })
                  }
                />
              </label>
              <label>
                <span>Teléfono</span>
                <input
                  name='phone'
                  type='tel'
                  required
                  value={formData.phone}
                  placeholder='+57 3110000000'
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
          <label htmlFor='user-image'>
            <input
              ref={fileInput}
              className='hidden'
              name='user-image'
              type='file'
              required
              onChange={(e) => {
                if (e.target?.files) {
                  setImage(e.target?.files[0]);
                }
              }}
            />
          </label>
          <div className='flex justify-center'>
            <PrimaryButton
              type='submit'
              text='Guardar'
              loading={loading}
              onClick={() => {}}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfilePageWrapper;
