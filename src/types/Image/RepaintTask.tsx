import { type FormProps } from "@lobehub/ui";
import { Brush } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Select, Upload, type UploadProps } from 'antd';

export const RepaintSetting = {
  repaintStyle: 0
}

const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


const RepaintTask: FormProps['items'] = [
  {
    children: [{
      children: (
        <Upload {...props}>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      ),
      desc: 'Upload Profile Image',
      label: 'Upload',
      name: 'repaintImage',
    },
    {
      children: (
        <Select
          defaultValue={RepaintSetting.repaintStyle}
          options={[
            { label: '复古漫画', value: 0 },
            { label: '3D 童话', value: 1 },
            { label: '二次元', value: 2 },
            { label: '小清新', value: 3 },
            { label: '未来科技', value: 4 },
            { label: '国画古风', value: 5 },
            { label: '将军百战', value: 6 },
            { label: '炫彩卡通', value: 7 },
            { label: '清雅国风', value: 8 },
            { label: '喜迎新年', value: 9 },
          ]}
        />
      ),
      desc: 'Pick Repaint Style',
      label: 'Style',
      name: 'repaintStyle',
    }],
    icon: Brush,
    title: '人像重绘',
  },
];

export default RepaintTask;