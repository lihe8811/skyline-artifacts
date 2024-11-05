'use client';

import { Form } from "@lobehub/ui";
import { Button, ConfigProvider } from "antd";
import React from 'react';

import { creativeTask } from '@/types/Image/Task';

const setting = {
  task: 'text-to-image',
};

const ImageTaskSelector: React.FC = () => {
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
        initialValues={setting}
        itemMinWidth={'max(30%, 240px)'}
        items={creativeTask}
        onFinish={console.table}
        variant={'default'}
      />
    </ConfigProvider>
    
  );
};

ImageTaskSelector.displayName = "ImageTaskSelector";

export default ImageTaskSelector;
