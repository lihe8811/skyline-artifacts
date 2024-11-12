'use client';

import { Form, ItemGroup } from "@lobehub/ui";
import { Alert, Button, ConfigProvider } from "antd";
import React, { useState, useEffect } from 'react';

import useGlobalState from '@/lib/store';
import GetDomainName from '@/util/GetDomainName';
import { RepaintSetting, SketchSetting, TextToImageSetting, WordArtSetting } from '@/types/Image';
import { CreativeTask, RepaintTask, SketchTask, TextToImageTask, WordArtTask } from '@/types/Image';

const ImageTaskSelector: React.FC = () => {
  const { imageUrl, updateDisplayUrl } = useGlobalState();
  const [taskType, setTaskType] = useState<string>('text-to-image');
  const [visible, setVisible] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const [status, setStatus] = useState<string>('PENDING');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTaskStatus = async (taskId: string) => {
      let retries = 0;
      while (status !== 'SUCCEEDED' && retries < 10) {
        try {
          let response = await fetch(`/api/gen-image/${taskId}`, {
            cache: 'no-store',
            headers: {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache'
            },
            next: { revalidate: 0 }
          });
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          let data = await response.json();
          setStatus(data.task_status);

          if (data.task_status === 'SUCCEEDED') {
            console.log(data.url);
            updateDisplayUrl(data.url);
            return;
          }
        } catch (error) {
          console.error(error);
        }

        retries++;
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    };
    
    if (taskId)
      fetchTaskStatus(taskId);
  }, [taskId]);

  const hideAlert = () => {
    setVisible(false);
  }

  const taskParams = taskType === 'repaint'
  ? RepaintTask
  : taskType === 'sketch'
    ? SketchTask
    : taskType === 'wordart'
      ? WordArtTask
      : TextToImageTask;

  const onValuesChange = ({ task }: { task: string }) => {
    if (task !== undefined) {
      setTaskType(task);

      const taskSetting = task === 'repaint'
      ? RepaintSetting
      : task === 'sketch'
        ? SketchSetting
        : task === 'wordart'
          ? WordArtSetting
          : TextToImageSetting;

      form.setFieldsValue(taskSetting);
    }
  }

  const onFinish = async () => {
    if (taskType === 'sketch') {
      form.setFieldsValue({
        sketchImage: `http://${GetDomainName()}${imageUrl}`
      });
    }
    
    const values = await form.validateFields();
    if (Object.values(values).some(value => value === undefined)) {
      setVisible(true);
    }
    console.table(values);
    
    fetch('/api/gen-image', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(data => {
      console.log(data.task_id);
      setTaskId(data.task_id);
    }).catch(error => {
      console.error(error);
    });
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
            <Button htmlType="submit" type="primary">Create</Button>
          </>
        }
        form={form}
        initialValues={{...{task: taskType}, ...TextToImageSetting}}
        onValuesChange={onValuesChange}
        itemMinWidth={'max(30%, 240px)'}
        items={[
          ...(CreativeTask ?? []).map(item => item as ItemGroup), 
          ...(taskParams ?? []).map(item => item as ItemGroup),
        ]}
        onFinish={onFinish}
        variant={'default'}
      />
      <>
        { visible && (<Alert
          className={'alert-banner'}
          closable
          afterClose={hideAlert}
          description={'Empty input is not allowed'}
          message={'Input Error'}
          showIcon={true}
          type={'error'}
        />)}
      </>
    </ConfigProvider>
  );
};

ImageTaskSelector.displayName = "ImageTaskSelector";

export default ImageTaskSelector;
