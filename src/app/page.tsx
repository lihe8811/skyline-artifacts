'use client';

import { ActionIcon, SideNav } from '@lobehub/ui';
import { Claude } from '@lobehub/icons';
import { Album, MessageSquare, Settings2 } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState<string>('chat');

  return (
    <SideNav
      avatar={<Claude.Avatar size={32} />}
      bottomActions={<ActionIcon icon={Settings2} />}
      topActions={
        <>
          <ActionIcon
            active={tab === 'chat'}
            icon={MessageSquare}
            onClick={() => setTab('chat')}
            size="large"
          />
          <ActionIcon
            active={tab === 'market'}
            icon={Album}
            onClick={() => setTab('market')}
            size="large"
          />
        </>
      }
    />
  );
};
