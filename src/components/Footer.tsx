export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-aura-bg px-6 py-24 border-t border-aura-dark/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start">
          <div>
            <h2 className="text-3xl font-serif text-aura-dark tracking-[0.2em] lowercase italic font-light">aura</h2>
            <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-aura-dark/40 font-light max-w-[200px] leading-relaxed">
              Design for stillness. Crafted for longevity.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-aura-dark hover:text-aura-brass transition-colors font-light">Philosophy</a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-aura-dark hover:text-aura-brass transition-colors font-light">The Archive</a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-aura-dark hover:text-aura-brass transition-colors font-light">Methodology</a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-aura-dark hover:text-aura-brass transition-colors font-light">Contact</a>
          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-aura-dark mb-4 font-light">London — Antwerp — Tokyo</p>
            <a href="https://instagram.com" className="text-xs uppercase tracking-[0.2em] text-aura-dark hover:text-aura-brass transition-colors font-light italic font-serif">Instagram</a>
            <div className="mt-12">
              <p className="text-[10px] uppercase tracking-[0.2em] text-aura-dark/30 font-light italic font-serif">© {currentYear} Study of Stillness</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
