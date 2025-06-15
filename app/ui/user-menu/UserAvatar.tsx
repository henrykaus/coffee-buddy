import Image from 'next/image';
import {UserIcon} from '@/app/ui/icons';
import React from 'react';

interface UserAvatarProps {
  imageUrl?: string | null;
}

export function UserAvatar(props: UserAvatarProps) {
  const {imageUrl} = props;

  const imageHeight = 40;
  const imageWidth = 40;

  return imageUrl ? (
    <Image
      className='rounded-full m-1'
      src={imageUrl}
      alt='User avatar'
      height={imageHeight}
      width={imageWidth}
    />
  ) : (
    <UserIcon height={imageHeight} width={imageWidth} />
  );
}
