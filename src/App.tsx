import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-particles';
import { Brain, Search, ChevronRight, Star } from 'lucide-react';
import Footer from './components/Footer';
import FAQSection from './components/FAQ';
import Newsletter from './components/Newsletter';

const supplements = [
  {
    id: 1,
    name: 'L-Tyrosine',
    description: 'A neurotransmitter precursor that boosts mood and focus.',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=500',
    benefits: ['Improved Focus', 'Enhanced Mood', 'Better Cognitive Performance'],
    dosage: '500-2000mg per day',
    category: 'Amino Acids'
  },
  {
    id: 2,
    name: 'Alpha GPC',
    description: 'Enhanced cognitive function and memory support.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=500',
    benefits: ['Memory Enhancement', 'Mental Clarity', 'Cognitive Support'],
    dosage: '300-600mg per day',
    category: 'Cholinergics'
  },
  {
    id: 3,
    name: 'Lion\'s Mane',
    description: 'Natural nootropic mushroom for cognitive enhancement.',
    image: 'https://images.unsplash.com/photo-1616196334218-96f9229837e1?auto=format&fit=crop&q=80&w=500',
    benefits: ['Nerve Growth', 'Memory Support', 'Mental Clarity'],
    dosage: '500-3000mg per day',
    category: 'Mushrooms'
  }
];

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

const SupplementCard = ({ supplement }: { supplement: typeof supplements[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="card-inner" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
        {/* Front of card */}
        <div className="card-front">
          <img src={supplement.image} alt={supplement.name} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{supplement.name}</h3>
          <p className="text-gray-300 mb-4">{supplement.description}</p>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
            {supplement.category}
          </span>
        </div>

        {/* Back of card */}
        <div className="card-back">
          <h4 className="text-lg font-semibold text-white mb-4">Benefits:</h4>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {supplement.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <p className="text-gray-300">
            <span className="font-semibold">Recommended Dosage:</span><br />
            {supplement.dosage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSupplements = supplements.filter(supplement => 
    (selectedCategory === 'All' || supplement.category === selectedCategory) &&
    supplement.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['All', ...new Set(supplements.map(s => s.category))];

  return (
    <div className="min-h-screen text-gray-100">
      <CustomCursor />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-40"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">NootropicsHub</span>
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'Products', 'Research', 'About', 'Contact'].map((item) => (
              <a key={item} href="#" className="nav-link">
                {item}
              </a>
            ))}
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent 
                     bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Enhance Your Mind
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Discover premium nootropics backed by science and experience.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search nootropics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800/50 rounded-lg pl-12 
                         border border-gray-700 focus:border-blue-500 
                         focus:ring-2 focus:ring-blue-500/20 
                         transition-all duration-300"
              />
              <Search className="absolute left-4 top-4 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 
                          ${selectedCategory === category 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredSupplements.map((supplement) => (
                <motion.div
                  key={supplement.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <SupplementCard supplement={supplement} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;