import { cache } from 'react';
import { notFound } from 'next/navigation';
import { NotionAPI } from 'notion-client';
import TermPage from '@/components/TermPage';

export const revalidate = 10;

const TERMS_DATABASE_ID = 'b88f6c627ebc49cfb58706259c057314';

const getPage = cache((pageId: string) => {
  const notionApi = new NotionAPI();
  return notionApi.getPage(pageId);
});

const getTermPageId = cache(async (urlParam: string, version?: string) => {
  const notionApi = new NotionAPI();
  const recordMap = await getPage(TERMS_DATABASE_ID);

  // 2. 데이터베이스에서 collection 및 collection_view 가져오기
  const collection = Object.values(recordMap.collection)[0].value;
  const collectionView = Object.values(recordMap.collection_view)[0].value;
  const collectionData = await notionApi.getCollectionData(
    collection.id,
    collectionView.id,
    collectionView
  );

  const schemaKeyInfo: Record<string, string> = Object.entries(collection.schema).reduce(
    (acc, param) => {
      const [key, value] = param;
      return {
        ...acc,
        [value.name]: key,
      };
    },
    {} satisfies Record<string, string>
  );

  const urlProp = schemaKeyInfo.url;
  const titleProp = schemaKeyInfo.title;

  const rows = Object.values(collectionData.recordMap.block)
    .filter((block) => block.value?.parent_id === collection.id) // 데이터베이스 내부의 로우인지 확인
    .map((block) => ({
      id: block.value.id,
      properties: block.value.properties, // 속성 데이터 포함
    }));

  const urlFiltered = rows.filter((r) => {
    return urlParam === r.properties[urlProp]?.[0]?.[0];
  });

  if (version) {
    return urlFiltered.find((s) => {
      return s.properties[titleProp]?.[0]?.[0] === version;
    });
  }

  const sortedByVersion = [...urlFiltered].sort((a, b) => {
    const aTitle = a.properties[titleProp]?.[0]?.[0];
    const bTitle = b.properties[titleProp]?.[0]?.[0];

    const aOrder = Number(aTitle);
    const bOrder = Number(bTitle);
    return bOrder - aOrder;
  });
  return sortedByVersion[0];
});

const Page = async ({
  params,
  searchParams,
}: {
  searchParams: Promise<{
    v?: string;
  }>;
  params: Promise<{ path: string }>;
}) => {
  const version = (await searchParams).v;
  const { path } = await params;

  const result = await getTermPageId(path, version);
  if (result?.id) {
    const recordMap = await getPage(result.id);
    return <TermPage recordMap={recordMap} />;
  }

  return notFound();
};

export default Page;
