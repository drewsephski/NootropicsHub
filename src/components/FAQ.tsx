import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        id: 1,
        question: 'What are nootropics?',
        answer: 'Nootropics are substances that may improve cognitive function, particularly executive functions, memory, creativity, or motivation in healthy individuals.'
      },
      {
        id: 2,
        question: 'Are nootropics safe?',
        answer: 'When used as directed, many nootropics are considered safe. However, it\'s important to consult with a healthcare professional before starting any supplement regimen.'
      }
    ]
  },
  {
    category: 'Usage',
    questions: [
      {
        id: 3,
        question: 'How long does it take to see results?',
        answer: 'Effects can vary depending on the specific nootropic and individual factors. Some may work immediately, while others may take several weeks of consistent use.'
      },
      {
        id: 4,
        question: 'What\'s the best time to take nootropics?',
        answer: 'The optimal timing depends on the specific nootropic and your goals. Some are best taken in the morning, while others may be more effective at different times.'
      }
    ]
  }
];

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-8">
          {filteredFaqs.map((category) => (
            <div key={category.category}>
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="space-y-2">
                {category.questions.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question w-full"
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    >
                      <span className="text-left">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="faq-answer">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;