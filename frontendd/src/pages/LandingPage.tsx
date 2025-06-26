import { MainLayout } from '../components/layouts/MainLayout';
import HeroSection from '../components/landingPage-components/HeroSection';
import FeaturesSection from '../components/landingPage-components/FeaturesSection';
import CardsSection from '../components/landingPage-components/CardsSection';
import BlueSection from '../components/landingPage-components/BlueSection';
import ProductsSection from '../components/landingPage-components/ProductsSection';
import StatsSection from '../components/landingPage-components/StatsSection';
import TestimonialsSection from '../components/landingPage-components/TestimonialsSection';
import NewsletterSection from '../components/landingPage-components/NewsletterSection';

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