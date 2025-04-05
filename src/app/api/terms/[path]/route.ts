import { NextRequest, NextResponse } from 'next/server';
import { Term } from '@/types/terms';
import * as s3Utils from '@/utils/s3Utils';

// GET 요청 처리
export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;
  const body: Term = await request.json();
  const { content } = body;
  const resp = await s3Utils.putTerm(path, content);
  return NextResponse.json(resp);
}
