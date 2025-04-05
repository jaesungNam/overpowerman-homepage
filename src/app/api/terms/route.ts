import { NextResponse } from 'next/server';
import { Term } from '@/types/terms';
import * as s3Utils from '@/utils/s3Utils';

// GET 요청 처리
export async function GET() {
  const resp = await s3Utils.getTerms();
  return NextResponse.json(resp);
}

// GET 요청 처리
export async function POST(request: Request) {
  const body: Term = await request.json();
  const { path, content } = body;
  const resp = await s3Utils.putTerm(path, content, {
    IfNoneMatch: '*',
  });
  return NextResponse.json(resp);
}
