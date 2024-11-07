import { Modal } from '@lobehub/ui';
import { Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import { useState, useRef } from "react";

import { ReactSketchCanvas } from "react-sketch-canvas";

const ButtonWithCanvas = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const canvasRef = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const clearCanvas = () => {
    canvasRef?.current.clearCanvas();
  }

  const submitCanvas = () => {
    setIsModalOpen(false);
  }

  const canvasStyle = {
    border: "0.0625rem solid #9c9c9c"
  };

  return (
    <>
      <Button 
        type={'primary'}
        icon={<HighlightOutlined />}
        onClick={showModal}
      >
        Create
      </Button>
      <Modal
        className={'canvas-modal'}
        footer={<>
          <Button onClick={clearCanvas}>Clear</Button>
          <Button type={'primary'}>Submit</Button>
        </>}
        onCancel={cancelModal}
        onOk={submitCanvas}
        open={isModalOpen}
        title={'Create Sketch'}
      >
        <ReactSketchCanvas
          className={'sketch-canvas'}
          width={'512px'} 
          height={'512px'} 
          ref={canvasRef}
          style={canvasStyle}
          strokeWidth={6} 
          strokeColor={'#f04f88'} 
        />
      </Modal>
    </>
  );
}

export default ButtonWithCanvas;