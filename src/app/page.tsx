import Hero from '@/components/home/Hero';
import { FaqTeaser, Manifesto, Method, ServiceIndex, ServiceMarquee, Voices, WorksRail } from '@/components/home/Sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceMarquee />
      <Manifesto />
      <ServiceIndex />
      <WorksRail />
      <Method />
      <Voices />
      <FaqTeaser />
    </>
  );
}
