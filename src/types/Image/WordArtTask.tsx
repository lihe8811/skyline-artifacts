import { Input, type FormProps, SelectWithImg } from "@lobehub/ui";
import { Select } from 'antd';
import { Palette } from 'lucide-react';

export const WordArtSetting = {
  wordartFont: 'dongfangdakai',
  wordartStyle: 'material',
}

const WordArtTask: FormProps['items'] = [
  {
    children: [{
      children: (
        <Input
          placeholder={'No more than 6 characters'}
          type={'ghost'}
          maxLength={6}
        />
      ),
      desc: 'Type Text (No more than 6 characters)',
      label: 'Text',
      name: 'wordartText',
    },
    {
      children: (
        <Input
          placeholder={'Type prompts...'}
          type={'ghost'}
          maxLength={200}
        />
      ),
      desc: 'Type Prompt',
      label: 'Prompt',
      name: 'wordartPrompt',
    },
    {
      children: (
        <SelectWithImg
          height={36}
          width={48}
          defaultValue={WordArtSetting.wordartFont}
          options={[
            { 
              img: 'https://www.shejidt.com/uploads/2023/02/01/1675214418_f2a44342f7925845.png',
              label: '东方大楷', 
              value: 'dongfangdakai' 
            },
            { 
              img: 'https://www.shejidt.com/uploads/2023/01/01/1672553532_de31466615315511.png',
              label: '进步体', 
              value: 'jinbuti' 
            },
            { 
              img: 'https://www.shejidt.com/uploads/2020/08/28/1598578023_8eb4af67d8d68971.png',
              label: '快乐体', 
              value: 'kuaileti' 
            },
            { 
              img: 'https://www.shejidt.com/uploads/2020/08/28/1598576859_8eb4af67d8d59147.png',
              label: 'LOGO体', 
              value: 'logoti' 
            },
          ]}
        />
      ),
      desc: 'Pick Text Font',
      label: 'Font',
      name: 'wordartFont',
    },
    {
      children: (
        <Select
          defaultValue={WordArtSetting.wordartStyle}
          options={[
            { label: '立体材质', value: 'material' },
            { label: '场景融合', value: 'scene' },
            { label: '光影特效', value: 'lighting' },
          ]}
        />
      ),
      desc: 'Pick Style',
      label: 'Style',
      name: 'wordartStyle',
    }],
    icon: Palette,
    title: '艺术字',
  },
];

export default WordArtTask;