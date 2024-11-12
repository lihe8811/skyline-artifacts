const queryUrl = 'https://dashscope.aliyuncs.com/api/v1/tasks';
const apiKey = process.env.WANX_API_KEY;

const task_id = '3235c23c-8b61-4f68-bc12-1a18eef58947';
const url = `${queryUrl}/${task_id}`;

fetch(url, {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${apiKey}` },
}).then(response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}).then(data => {
  console.log(data);
  if (data.output.task_status === 'SUCCEEDED')
    console.log(data.output.results[0].url);
}).catch(error => {
  console.error(error);
});