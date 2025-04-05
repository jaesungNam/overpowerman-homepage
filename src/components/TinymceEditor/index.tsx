import dynamic from 'next/dynamic';

export * from './TinymceEditor';

export default dynamic(() => import('./TinymceEditor'), {
  ssr: false,
});
