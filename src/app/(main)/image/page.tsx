'use client';

import { Flexbox } from 'react-layout-kit';
import ImageTaskSelector from '@/components/Image/ImageTaskSelector';

const ImageTaskForm: React.FC = () => {
  return (
    <Flexbox 
      flex={1} 
      padding={12}
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <ImageTaskSelector />
    </Flexbox>
  );
};

ImageTaskForm.displayName = "ImageTaskForm";

export default ImageTaskForm;
