import { NextRequest, NextResponse } from 'next/server';

export interface SubmissionData {
  task: string;
  [key: string]: string;
}

const baseUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc';
const apiKey = process.env.WANX_API_KEY;

export async function POST(req: NextRequest) {
  const data = await req.json();

  const submitJobUrlMap = new Map([
    ['text-to-image', '/text2image/image-synthesis'],
    ['sketch', '/image2image/image-synthesis/'],
    ['wordart', '/wordart/texture'],
  ]);

  const processSubmission = (data: SubmissionData) => {
    const url = `${baseUrl}${submitJobUrlMap.get(data.task)}`
    const body = data.task === 'sketch'
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
              'size': '1024*1024',
              'n': 1,
              'negative_prompt': data.regularNegativePrompt
            }
          }
    return { url, body }
  };

  const { url, body } = processSubmission(data);
  console.log(url);
  console.log(body);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return NextResponse.json({ task_id: data.output.task_id });
  } catch (error) {
    return NextResponse.json({ error: error });
  };
}
