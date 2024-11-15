'use client';

import { ActionIcon, SideNav } from '@lobehub/ui';
import { LobeHub } from '@lobehub/icons';
import Link from 'next/link'
import { useState } from 'react';
import { Wallpaper, FolderClosed } from 'lucide-react';

export default function DefaultNavLayout() {
  const [tab, setTab] = useState<string>('image');

  return (
    <SideNav
      avatar={<LobeHub.Color size={40} />}
      bottomActions={<ActionIcon icon={FolderClosed} />}
      style={{ height: '100%', zIndex: 100 }}
      topActions={
        <>
          <Link href="/image">
            <ActionIcon
              active={tab === 'image'}
              icon={Wallpaper}
              onClick={() => setTab('image')}
              size="large"
            />
          </Link>
        </>
      }
    />
  );
};
