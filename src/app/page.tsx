import { Metadata } from 'next';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '@/components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Overpowerman | 오버파워맨',
  description: 'overpowerman 의 홈페이지입니다.',
};
