import { Box, Group } from '@mantine/core';

const Layout = (props: { children: React.ReactNode; versions: React.ReactNode }) => {
  const { children, versions } = props;
  return (
    <Group gap={16} wrap="nowrap" align="stretch">
      <Box>{versions}</Box>
      <Box flex="1">{children}</Box>
    </Group>
  );
};

export default Layout;
