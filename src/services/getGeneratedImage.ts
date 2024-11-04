const apiKey = process.env.WANX_API_KEY;
const url_base = 'https://dashscope.aliyuncs.com/api/v1/tasks/';

const task_id = '344f98c2-4d49-4ea2-94f7-6b3a463c5fdd';
const url = `${url_base}${task_id}`;

fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
}).then(response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}).then(data => {
  const results = data.output.results;
  results.forEach((x: { url: string}) => {
    console.log(x.url);
  });
}).catch(error => {
  console.error(error);
});