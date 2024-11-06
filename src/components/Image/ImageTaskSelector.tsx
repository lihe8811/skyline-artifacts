'use client';

import { Form } from "@lobehub/ui";
import { Button, ConfigProvider } from "antd";
import React, { useState } from 'react';

import { RepaintSetting, TextToImageSetting, WordArtSetting } from '@/types/Image';
import { CreativeTask, RepaintTask, TextToImageTask, WordArtTask } from '@/types/Image';

const ImageTaskSelector: React.FC = () => {
  const [taskType, setTaskType] = useState<string>('text-to-image');
  const [form] = Form.useForm();

  const taskParams = taskType === 'repaint'
  ? RepaintTask
  : taskType === 'wordart'
    ? WordArtTask
    : TextToImageTask;
  
  const onValuesChange = ({ task }: { task: string }) => {
    if (task !== undefined) {
      setTaskType(task);

      const taskSetting = task === 'repaint'
      ? RepaintSetting
      : task === 'wordart'
        ? WordArtSetting
        : TextToImageSetting;

      form.setFieldsValue(taskSetting);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#f04f88' },
      }}
    >
      <Form
        footer={
          <>
            <Button htmlType="button">Reset</Button>
            <Button htmlType="submit" type="primary">Create</Button>
          </>
        }
        form={form}
        initialValues={{...{task: taskType}, ...TextToImageSetting}}
        onValuesChange={onValuesChange}
        itemMinWidth={'max(30%, 240px)'}
        items={[...(CreativeTask ?? []), ...(taskParams ?? [])]}
        onFinish={console.table}
        variant={'default'}
      />
    </ConfigProvider>
  );
};

ImageTaskSelector.displayName = "ImageTaskSelector";

export default ImageTaskSelector;
