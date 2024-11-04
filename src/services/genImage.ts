const apiKey = process.env.WANX_API_KEY;
const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
const data = {
  'model': 'wanx-v1',
  'input': {
    'prompt': 'A cute baby sea otter'
  },
  'parameters': {
    'style': '<auto>',
    'size': '1024*1024',
    'n': 1,
    'negative_prompt': 'low quality, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry'
  }
};

export const res = fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-DashScope-Async': 'enable'
  },
  body: JSON.stringify(data)
}).then(response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}).then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});