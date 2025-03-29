import {
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';

const s3Client = new S3({
  region: 'ap-northeast-2',
});

export const getObjectCommand = async () => {
  const command = new ListBucketsCommand({});
  const data = await s3Client.send(command);
  return data;
};

export const getTerms = async () => {
  const command = new ListObjectsV2Command({
    Bucket: 'overpowerman-bucket',
    Prefix: 'terms/',
  });

  const data = await s3Client.send(command);
  return data;
};

export const putTerm = async (path: string, content: string) => {
  const command = new PutObjectCommand({
    Bucket: 'your-bucket-name',
    Key: `terms/${path}/content.html`, // S3에 저장될 HTML 파일명
    Body: content, // HTML 문자열
    ContentType: 'text/html', // MIME 타입 지정
  });

  try {
    const response = await s3Client.send(command);
    console.log('HTML Upload Success:', response);
    console.log(`URL: https://your-bucket-name.s3.ap-northeast-2.amazonaws.com/uploads/index.html`);
  } catch (err) {
    console.error('Upload Error:', err);
  }
};

export const createTerm = async (path: string, content: string) => {
  const command = new PutObjectCommand({
    Bucket: 'your-bucket-name',
    Key: `terms/${path}/content.html`, // S3에 저장될 HTML 파일명
    Body: content, // HTML 문자열
    ContentType: 'text/html', // MIME 타입 지정
    IfNoneMatch: '*', // 존재하면 업로드 실패
  });

  try {
    const response = await s3Client.send(command);
    console.log('HTML Upload Success:', response);
    console.log(`URL: https://your-bucket-name.s3.ap-northeast-2.amazonaws.com/uploads/index.html`);
  } catch (err) {
    console.error('Upload Error:', err);
  }
};
