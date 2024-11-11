import { Modal } from '@lobehub/ui';
import { Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import { useState, useRef } from "react";

import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const ButtonWithCanvas = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
  }

  const submitCanvas = async () => {
    canvasRef.current?.exportImage('png')
      .then((imageData) => {
        return fetch('/api/sketch', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ imageData }),
        });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network error.');
        }
      })
      .then(({ imageUrl }) => {
        console.log(imageUrl);
      })
      .catch((error) => {
        console.error('Error exporting image:', error);
      });

    setIsModalOpen(false);
  }

  const canvasStyle = {
    border: "0.0625rem solid rgba(156, 156, 156, 0.5)"
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
          <Button type={'primary'} onClick={submitCanvas}>Submit</Button>
        </>}
        onCancel={cancelModal}
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
          strokeColor={'#000'} 
        />
      </Modal>
    </>
  );
}

export default ButtonWithCanvas;