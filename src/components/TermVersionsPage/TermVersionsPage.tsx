import NextLink from 'next/link';
import { ObjectVersion } from '@aws-sdk/client-s3';
import { Box, Title } from '@mantine/core';

export type TermVersionsPageProps = {
  versions: ObjectVersion[];
};

const TermVersionsPage: React.FC<TermVersionsPageProps> = (props) => {
  const { versions } = props;

  return (
    <Box>
      <Title size="h3">약관 버전</Title>
      {versions.map((v) => {
        return (
          <Box key={v.VersionId}>
            <NextLink href={`?versionId=${v.VersionId}`}>{v.VersionId}</NextLink>
            {v.LastModified?.toLocaleString()} {v.IsLatest && 'latest'}
          </Box>
        );
      })}
    </Box>
  );
};

export default TermVersionsPage;
