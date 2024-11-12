'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SubmissionData {
  task: string;
  [key: string]: string;
}

const GenImageTask = () => {
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const baseUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc';
  const queryUrl = 'https://dashscope.aliyuncs.com/api/v1/tasks';
  const apiKey = process.env.WANX_API_KEY;

  const submitJobUrlMap = new Map([
    ['text-to-image', '/text2image/image-synthesis'],
    ['sketch', '/image2image/image-synthesis/'],
    ['repaint', '/image-generation/generation'],
    ['wordart', '/wordart/texture'],
  ]);

  const processSubmission = (data: SubmissionData) => {
    const url = `${baseUrl}${submitJobUrlMap.get(data.task)}`
    const body = data.task === 'repaint'
    ? {
        'model': 'wanx-style-repaint-v1',
        'input': {
          'image_url': data.repaintImage,
          'style_index': data.repaintStyle,
        },
      }
    : data.task === 'sketch'
      ? {
          'model': 'wanx-sketch-to-image-lite',
          'input': {
            'sketch_image_url': data.sketchImage,
            'prompt': data.sketchPrompt,
          },
          'parameters': {
            'style': data.sketchStyle,
            'size': '768*768',
            'n': 1,
          }
        }
      : data.task === 'wordart'
        ? {
            'model': 'wordart-texture',
            'input': {
              'text': {
                'text_content': data.wordartText,
                'font_name': data.wordartFont,
                'output_image_ratio': '1:1',
              },
              'prompt': data.wordartPrompt,
              'texture_style': data.wordartStyle,
            },
            'parameters': {
              'image_short_size': 768,
              'n': 1,
              'alpha_channel': false
            }
          }
        : {
            'model': 'wanx-v1',
            'input': {
              'prompt': data.regularPrompt,
            },
            'parameters': {
              'style': data.regularStyle,
              'size': data.regularSize,
              'n': 1,
              'negative_prompt': data.regularNegativePrompt
            }
          }
    return { url, body }
  }

  const submitJob = async (data: SubmissionData) => {
    const { url, body } = processSubmission(data);

    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(data => {
        console.log(data.output.task_id);
        setJobId(data.output.task_id);
    }).catch(error => {
      setError(error);
      console.error(error);
    });
  };

  const queryJobProgress = useCallback(async () => {
    if (!jobId) return;

    const url = `${queryUrl}/${jobId}`;

    await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiKey}` },
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(data => {
        setProgress(data.output.task_metrics.TOTAL);
        if (data.output.task_status === 'SUCCEEDED') {
          setResult(data.output.results);
        } else {
          setTimeout(queryJobProgress, 1000); // Query again after 1 second
        }
    }).catch(error => {
      setError(error);
      console.error(error);
    });
  }, [jobId, apiKey]);

  // Start querying progress when jobId is set
  useEffect(() => {
    queryJobProgress();
  }, [jobId, queryJobProgress]);

  return { jobId, progress, result, error, submitJob };
};

export default GenImageTask;