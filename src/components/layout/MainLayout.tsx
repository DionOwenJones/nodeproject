import Header from './Header';
import Footer from './Footer';
import Background from '../Background';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Header />
      {children}
      <Footer />
    </div>
  );
} 