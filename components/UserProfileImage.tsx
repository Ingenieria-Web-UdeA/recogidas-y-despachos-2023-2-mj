import Image from 'next/image';

interface UserProfileImageProps {
  image: string | undefined;
  height?: number;
  width?: number;
}

const UserProfileImage = ({
  image,
  height = 40,
  width = 40,
}: UserProfileImageProps) => {
  return (
    <Image
      src={image ?? '/media/default-user.png'}
      alt='user name'
      title='user name'
      width={width}
      height={height}
      className='max-w-full rounded-full'
    />
  );
};

export { UserProfileImage };
