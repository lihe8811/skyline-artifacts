'use client';

import { ActionIcon, ChatHeader, Image } from '@lobehub/ui';
import { LobeHub } from '@lobehub/icons';
import Link from 'next/link';
import { Flexbox } from 'react-layout-kit';
import { ImageDown } from 'lucide-react';

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA5TFr2P4Shfl2xEc1R-nbZw_9DosQThOJYw&s';

export default function ImageLayout({
  nav,
  children,
}: {
  nav: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <Flexbox
        height={'100%'}
        horizontal
        width={'100%'}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        {nav}
        <Flexbox
          height={'100%'}
          width={'100%'}
          style={{ overflow: 'hidden', position: 'relative' }}
        >
          <ChatHeader
            left={
              <Link href={'/image'} style={{ color: 'inherit' }}>
                <LobeHub.Text size={32} />
              </Link>
            }
            style={{
              position: 'relative',
              zIndex: 10,
            }}
            styles={{
              center: { flex: 1, maxWidth: 1440 },
              left: { flex: 1, maxWidth: 240 },
              right: { flex: 1, maxWidth: 240 },
            }}
          />
          <Flexbox
            height={'100%'}
            width={'100%'}
            horizontal
            style={{ overflow: 'hidden', position: 'relative' }}
          >
            {children}
            <Flexbox 
              flex={1} 
              padding={12}
              style={{ overflow: 'hidden', position: 'relative' }}
            >
              <Image
                alt={''}
                size={720}
                src={url}
                preview={{
                  toolbarAddon: <ActionIcon color={'#fff'} icon={ImageDown} />,
                }}
              />
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </>
  );
}