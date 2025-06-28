import { HeroSection } from '@/sections/hero-section';
import { InfrastructureServices } from '@/sections/infrastructure-services';
import { TestnetSection } from '@/sections/testnet-section';
import { BlogPreview } from '@/sections/blog-preview';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InfrastructureServices />
      <TestnetSection />
      <BlogPreview />
      <Footer />
    </>
  );
}