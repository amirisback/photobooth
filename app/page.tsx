import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RedBand } from "@/components/ui/RedBand";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-surface-charcoal overflow-hidden">
        {/* Hero Image */}
        <Image
          src="/images/hero.png"
          alt="Global Network"
          fill
          className="object-cover opacity-40"
          priority
        />
        
        <div className="container-content relative z-10 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h1 className="text-display-xl text-white mb-8">
            EVERYONE.<br />CONNECTED.
          </h1>
          <p className="text-lead text-white/80 max-w-2xl mb-12 mx-auto">
            Our mission is to connect for a better future by using technology to improve people's lives and deliver on our purpose to connect Europe and Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="primary-pill" className="px-8 py-4 h-auto">Learn more about us</Button>
            <Button variant="glass-pill" className="px-8 py-4 h-auto">Our purpose</Button>
          </div>
        </div>
      </section>

      <RedBand />

      {/* Content Section Placeholder */}
      <section className="py-24 bg-surface-white">
        <div className="container-content text-center">
          <h2 className="text-h1-light mb-8">Latest from Vodafone</h2>
          <p className="text-body-lg text-text-body max-w-3xl mx-auto mb-16">
            Explore our latest news, reports, and innovations that are shaping the digital future.
          </p>
          <div className="h-[400px] border-2 border-dashed border-text-disabled rounded-lg flex items-center justify-center">
            <span className="text-text-disabled uppercase tracking-widest text-sm">Content Modules Coming Soon</span>
          </div>
        </div>
      </section>
      
      {/* Spacer to test footer */}
      <section className="h-[50vh] bg-surface-neutral flex items-center justify-center">
         <span className="text-text-body italic">Scrolling down to footer...</span>
      </section>
    </div>
  );
}
