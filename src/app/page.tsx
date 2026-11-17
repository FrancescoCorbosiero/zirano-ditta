import Hero from '@/components/home/Hero';
import { FaqTeaser, Proof, ServiceIndex, WorksRail } from '@/components/home/Sections';
import References from '@/components/trust/References';

/**
 * La home: meno parole, più prove. Hero con i nomi dei clienti, i numeri,
 * i servizi, i lavori con i loro dati, le referenze, le domande.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <ServiceIndex />
      <WorksRail />
      <References />
      <FaqTeaser />
    </>
  );
}
