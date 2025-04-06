import { useTranslations } from 'next-intl';
import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  const t = useTranslations('HomePage');
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        {t('welcome')}{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          {t('title')}
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        {t('content')}
      </Text>
    </>
  );
}
