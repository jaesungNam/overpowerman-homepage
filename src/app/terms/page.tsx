import { Box } from '@mantine/core';
import { getObjectCommand } from '@/app/utils/s3Utils';

const Page = async () => {
  const bb = await getObjectCommand();
  console.log(bb);
  return <Box>eweqw</Box>;
};

export default Page;
