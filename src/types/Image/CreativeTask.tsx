import { type FormProps } from '@lobehub/ui';
import { Select } from 'antd';
import { Palette } from 'lucide-react';

const CreativeTask: FormProps['items'] = [
  {
    children: [{
      children: (
        <Select
          options={[
            { label: '文字作画', value: 'text-to-image'},
            { label: '涂鸦作画', value: 'sketch' },
            { label: '艺术字', value: 'wordart' },
          ]}
        />
      ),
      desc: 'Pick Creative Task',
      label: 'Task Type',
      name: 'task',
    }],
    icon: Palette,
    title: 'Creative Task',
  },
];

export default CreativeTask;