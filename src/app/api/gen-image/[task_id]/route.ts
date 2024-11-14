import { NextRequest, NextResponse } from 'next/server';

const queryUrl = 'https://dashscope.aliyuncs.com/api/v1/tasks';
const apiKey = process.env.WANX_API_KEY;

export const fetchCache = 'force-no-store';

export async function GET(
  req: NextRequest,
  { params }: { params: { task_id: string } }
) {
  const { task_id } = params;
  const url = `${queryUrl}/${task_id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    const data = await response.json();
    console.log(data);
    if (data.output.task_status === 'SUCCEEDED') {
      return NextResponse.json({ 
        task_status: data.output.task_status,
        url: data.output.results[0].url,
        headers: {
          'Cache-Control': 'no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
        },
      });
    } else if (['SUSPENDED', 'FAILED', 'UNKNOWN'].includes(data.output.task_status)) {
      return NextResponse.json({ 
        error: data.output.task_status,
        headers: {
          'Cache-Control': 'no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
        },
      });
    } else {
      return NextResponse.json({ 
        task_status: data.output.task_status,
        total: data.output.task_metrics.TOTAL,
        succeeded: data.output.task_metrics.SUCCEEDED,
        headers: {
          'Cache-Control': 'no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
        },
      });
    }
  } catch(error) {
    return NextResponse.json({ 
      error: error,
      headers: {
        'Cache-Control': 'no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
      },
    });
  };
}