import { NextRequest, NextResponse } from 'next/server';
import GenImageTask from '@/services/GenImageTask';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { jobId, progress, result, error, submitJob } = GenImageTask();
  await submitJob(data);
  return NextResponse.json({ jobId, progress, result, error });
}