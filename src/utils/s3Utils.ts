import {
  CopyObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectVersionsCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from '@aws-sdk/client-s3';
import { Term } from '@/types/terms';

const s3Client = new S3({
  region: 'ap-northeast-2',
});

export const getTerm = async (path: Term['path'], versionId?: string) => {
  const command = new GetObjectCommand({
    Bucket: 'overpowerman-bucket',
    Key: `terms/${path}/content.html`,
    ...(versionId && { VersionId: versionId }),
  });
  const data = await s3Client.send(command);
  const content = await data.Body?.transformToString();

  return {
    path,
    content,
  };
};

export const getTerms = async () => {
  const command = new ListObjectsV2Command({
    Bucket: 'overpowerman-bucket',
    Prefix: 'terms/',
  });

  const data = await s3Client.send(command);
  return data;
};

export const putTerm = async (
  path: string,
  content?: string,
  options?: Pick<PutObjectCommandInput, 'IfNoneMatch'>
) => {
  const command = new PutObjectCommand({
    Bucket: 'overpowerman-bucket',
    Key: `terms/${path}/content.html`, // S3에 저장될 HTML 파일명
    Body: content, // HTML 문자열
    ContentType: 'text/html', // MIME 타입 지정
    ...(options && options),
  });

  const response = await s3Client.send(command);
  return response;
};

export const getTermVersions = async (path: string) => {
  const command = new ListObjectVersionsCommand({
    Bucket: 'overpowerman-bucket',
    Prefix: `terms/${path}/content.html`,
  });
  const data = await s3Client.send(command);

  const versions = (await data.Versions) || [];

  return versions;
};

export const publishTerm = async (path: string) => {
  const command = new CopyObjectCommand({
    Bucket: 'overpowerman-bucket',
    CopySource: `terms/${path}/content.html`,
    Key: `terms/${path}/published.html`,
  });

  const data = await s3Client.send(command);

  return data;
};
