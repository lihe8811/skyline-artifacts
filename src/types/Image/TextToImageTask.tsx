import { Input, type FormProps } from '@lobehub/ui';
import { Select } from 'antd';
import { Dna } from 'lucide-react';

export const TextToImageSetting = {
  regularStyle: '<photography>',
  regularSize: '1024 x 1024',
}

const TextToImageTask: FormProps['items'] = [
  {
    children: [{
      children: (
        <Input
          placeholder={'Type prompts...'}
          type={'ghost'}
          maxLength={500}
        />
      ),
      desc: 'Type Prompt',
      label: 'Prompt',
      name: 'regularPrompt',
    },
    {
      children: (
        <Input
          placeholder={'Type prompts...'}
          type={'ghost'}
          maxLength={500}
        />
      ),
      desc: 'Type Negative Prompt',
      label: 'Negative Prompt',
      name: 'regularNegativePrompt',
    },
    {
      children: (
        <Select
          defaultValue={TextToImageSetting.regularStyle}
          options={[
            { label: '摄影', value: '<photography>' },
            { label: '人像写真', value: '<portrait>' },
            { label: '3D 卡通', value: '<3d cartoon>' },
            { label: '动画', value: '<anime>' },
            { label: '油画', value: '<oil painting>' },
            { label: '水彩', value: '<watercolor>' },
            { label: '素描', value: '<sketch>' },
            { label: '中国画', value: '<chinese painting>' },
            { label: '扁平插画', value: '<flat illustration>' },
          ]}
        />
      ),
      desc: 'Pick Style',
      label: 'Style',
      name: 'regularStyle',
    },
    {
      children: (
        <Select
          defaultValue={TextToImageSetting.regularSize}
          options={[
            { label: '1024 x 1024', value: '1024*1024' },
            { label: '720 x 1280', value: '720*1280' },
            { label: '1280 x 720', value: '1280*720' },
          ]}
        />
      ),
      desc: 'Pick Image Size',
      label: 'Size',
      name: 'regularSize',
    }],
    icon: Dna,
    title: '文字作画',
  },
];

export default TextToImageTask;