import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Star, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const button = document.querySelector('[data-feedback-button]');
        if (button && !(event.target as Node).contains(button)) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase.from('feedback').insert({
        page_url: window.location.href,
        rating,
        message,
        user_email: email || null,
        app_name: 'memorial-strategy',
      });
    } catch (error) {
      // Silently fail - Supabase may not be configured
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => {
      setIsOpen(false);
      setSuccess(false);
      setRating(0);
      setMessage('');
      setEmail('');
    }, 2000);
  }

  return (
    <>
      <motion.button
        data-feedback-button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-[350px] bg-background/95 backdrop-blur-xl border border-teal-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {success ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-teal-500" />
                </div>
                <p className="text-lg font-medium">Thanks for your feedback!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Share Feedback</h3>
                  <button type="button" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? 'fill-teal-500 text-teal-500' : 'text-muted-foreground hover:text-teal-400'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">What happened?</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full p-3 bg-muted/50 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Your email (optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || rating === 0}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {loading ? 'Sending...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
