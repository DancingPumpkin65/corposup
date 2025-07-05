import { MainLayout } from '@/components/layouts/MainLayout';
import HeroSection from '@/components/LandingPage/HeroSection';
import FeaturesSection from '@/components/LandingPage/FeaturesSection';
import CardsSection from '@/components/LandingPage/CardsSection';
import BlueSection from '@/components/LandingPage/BlueSection';
import ProductsSection from '@/components/LandingPage/ProductsSection';
import StatsSection from '@/components/LandingPage/StatsSection/StatsSection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import NewsletterSection from '@/components/LandingPage/NewsletterSection';

const LandingPage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <CardsSection />
      <BlueSection />
      <ProductsSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </MainLayout>
  );
};

export default LandingPage;