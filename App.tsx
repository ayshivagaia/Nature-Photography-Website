
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Instagram, Mail, Globe } from 'lucide-react';
import { PHOTOS } from './constants';
import { Category } from './types';
import PhotoCard from './components/PhotoCard';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPhotos = activeCategory === 'All' 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === activeCategory);

  const categories: Category[] = ['All', 'Archaic Terrains', 'Lichened Geometry', 'The Vespertine Hour'];

  return (
    <div className="min-h-screen bg-moss text-silver font-sans">
      {/* Immersive Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-moss/90 backdrop-blur-md py-4 shadow-2xl' : 'py-8'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-2xl font-serif tracking-[0.2em] uppercase">Primal Light</span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-lichen mt-1">Nature Photography Studio</span>
          </motion.div>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-4 hover:text-lichen transition-colors"
          >
            <span className="text-xs uppercase tracking-[0.2em] hidden md:block">The Archive</span>
            <div className="w-8 h-[1px] bg-silver group-hover:w-12 group-hover:bg-lichen transition-all"></div>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-moss flex flex-col items-center justify-center p-12"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-12 right-12 p-4 border border-white/10 hover:border-lichen transition-colors rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['Home', 'Gallery', 'The Ontological Gaze', 'Field Notes'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.1, x: 10 }}
                  className="text-4xl md:text-6xl font-serif italic hover:text-lichen transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, filter: 'blur(10px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-moss/60 via-transparent to-moss"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-serif italic mb-8 leading-tight drop-shadow-lg"
          >
            "The slow, deliberate efflorescence of time, captured in the stillness of the lens."
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-12 h-[1px] bg-lichen"></div>
            <a href="#gallery" className="text-xs uppercase tracking-[0.4em] text-lichen hover:text-silver transition-colors">Descend Into Silence</a>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <span className="text-lichen text-xs uppercase tracking-[0.4em] mb-4 block">The Collections</span>
            <h2 className="text-5xl md:text-6xl font-serif italic">Visual Echoes</h2>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] relative transition-colors ${activeCategory === cat ? 'text-lichen' : 'text-silver/50 hover:text-silver'}`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 w-full h-[1px] bg-lichen"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* The Ontological Gaze (Philosophy) */}
      <section id="the-ontological-gaze" className="py-32 bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
          <span className="text-[20rem] font-serif italic">Light</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-lichen text-xs uppercase tracking-[0.4em] mb-6 block">Philosophy</span>
          <h2 className="text-5xl md:text-7xl font-serif italic mb-16">The Ontological Gaze</h2>
          
          <div className="space-y-12 text-lg md:text-xl font-light leading-relaxed text-silver/80">
            <p>
              To press the shutter is not to capture a moment, but to unearth the architectural blueprints of the soul buried beneath the sediment of the mundane. In the "Primal Light" studio, we view photography as a synthesis of the <span className="text-lichen italic">Ancient Mind</span> and <span className="text-silver">Modern Observation</span>. Like Theodore Roethke’s roots that "clutch and reach," our lens searches for the subterranean connections between the tectonic patience of granite and the flickering vulnerability of human consciousness.
            </p>
            <p>
              We practice what we call the <span className="italic">Ethics of Silence</span>. In an era of frantic visual consumption, we stand still until the light reveals its own history. This is not passive waiting; it is an active ontological engagement. By stripping away the noise of the contemporary, we allow the sacred fractals of the botanical world and the liminal shadows of the vespertine hour to speak their own archaic vernacular.
            </p>
            <p>
              Our portfolio is a manifesto against the ephemeral. Each frame is a fossilized realization that the landscape is not something we look <span className="italic">at</span>, but something we inhabit as a mirror. We do not seek to document nature; we seek to witness the slow, inevitable blossoming of existence itself—the primal light that existed before our arrival and will persist long after our departure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Newsletter */}
      <footer id="field-notes" className="pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div>
            <h3 className="text-4xl font-serif italic mb-8">Inquire or Reflect</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="group border-b border-white/10 focus-within:border-lichen transition-colors py-4">
                <input 
                  type="text" 
                  placeholder="IDENTITY" 
                  className="bg-transparent w-full outline-none text-xs tracking-widest uppercase placeholder:text-white/20"
                />
              </div>
              <div className="group border-b border-white/10 focus-within:border-lichen transition-colors py-4">
                <input 
                  type="email" 
                  placeholder="COMMUNICATION PATHWAY" 
                  className="bg-transparent w-full outline-none text-xs tracking-widest uppercase placeholder:text-white/20"
                />
              </div>
              <div className="group border-b border-white/10 focus-within:border-lichen transition-colors py-4">
                <textarea 
                  placeholder="THE MESSAGE" 
                  rows={4}
                  className="bg-transparent w-full outline-none text-xs tracking-widest uppercase placeholder:text-white/20 resize-none"
                ></textarea>
              </div>
              <button className="flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-lichen hover:text-silver transition-colors">
                Transmit <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-4xl font-serif italic mb-8">Field Notes</h3>
              <p className="text-silver/50 font-light mb-8 max-w-sm">
                Receive quarterly meditations on light, optics, and the natural world. No noise, only essence.
              </p>
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  className="bg-white/5 border border-white/10 px-6 py-4 outline-none text-xs tracking-widest uppercase w-full"
                />
                <button className="bg-silver text-moss px-8 py-4 hover:bg-lichen transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-12 mt-12">
              <a href="#" className="hover:text-lichen transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-lichen transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-lichen transition-colors font-sans text-xs tracking-widest uppercase">Behance</a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/20">© 2024 Primal Light Photography</span>
          <div className="flex gap-8 text-[10px] tracking-[0.4em] uppercase text-white/20">
            <a href="#" className="hover:text-silver transition-colors">Terms of Silence</a>
            <a href="#" className="hover:text-silver transition-colors">Visual Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
