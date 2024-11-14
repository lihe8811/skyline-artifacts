'use client';

import { ActionIcon, Image } from '@lobehub/ui';
import { ImageDown } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

import useImageStore from '@/lib/store';
import ImageTaskSelector from '@/components/Image/ImageTaskSelector';

const ImageTaskForm: React.FC = () => {
  const { displayUrl } = useImageStore();
  
  return (
    <>
      <Flexbox 
        flex={1} 
        padding={12}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <ImageTaskSelector />
      </Flexbox>
      <Flexbox 
        flex={1} 
        padding={12}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <Image
          alt={''}
          size={720}
          src={displayUrl}
          placeholder={<Image alt={''} preview={false} src='placeholder-square.png' />}
          preview={{
            toolbarAddon: <ActionIcon color={'#fff'} icon={ImageDown} />,
          }}
        />
      </Flexbox>
    </>
  );
};

ImageTaskForm.displayName = "ImageTaskForm";

export default ImageTaskForm;
