import { Flexbox } from 'react-layout-kit';

export default function ImageLayout({
  nav,
  children,
}: {
  nav: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <Flexbox
        height={'100%'}
        horizontal
        style={{ minHeight: 500, position: 'relative' }}
        width={'100%'}
      >
        {nav}
        {children}
      </Flexbox>
    </>
  );
}