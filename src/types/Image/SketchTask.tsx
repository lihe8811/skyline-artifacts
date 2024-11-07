import { Input, type FormProps } from '@lobehub/ui';
import { Lightbulb } from 'lucide-react';
import { Select } from 'antd';

import ButtonWithCanva from '@/components/Canvas/ButtonWithCanvas'

export const SketchSetting = {
  sketchStyle: '<anime>',
}

const SketchTask: FormProps['items'] = [
  {
    children: [{
      children: (
        <ButtonWithCanva />
      ),
      desc: 'Create with Sketch',
      label: 'Sketch',
      name: 'sketchImage',
    },
    {
      children: (
        <Input
          placeholder={'Type prompts...'}
          type={'ghost'}
          maxLength={500}
        />
      ),
      desc: 'Type Prompt',
      label: 'Prompt',
      name: 'sketchPrompt',
    },
    {
      children: (
        <Select
          defaultValue={SketchSetting.sketchStyle}
          options={[
            { label: '二次元', value: '<anime>' },
            { label: '3D 卡通', value: '<3d cartoon>' },
            { label: '油画', value: '<oil painting>' },
            { label: '水彩', value: '<watercolor>' },
            { label: '扁平插画', value: '<flat illustration>' },
          ]}
        />
      ),
      desc: 'Pick Sketch Style',
      label: 'Style',
      name: 'sketchStyle',
    }],
    icon: Lightbulb,
    title: '涂鸦作画',
  },
];

export default SketchTask;