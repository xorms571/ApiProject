import Link from 'next/link';

const Layout = () => {
  return (
    <div>
      <Link href='/shopping'>쇼핑</Link>
      <Link href='/news'>뉴스</Link>
    </div>
  );
};

export default Layout;