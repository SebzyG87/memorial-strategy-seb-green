import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, BookOpen, Bot, Search } from 'lucide-react';
import { helpArticles } from '@/data/helpArticles';

type Tab = 'articles' | 'ai';

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm Seb's AI Assistant. Ask me anything about this service and I'll do my best to help." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const button = document.querySelector('[data-help-button]');
        if (button && !(event.target as Node).contains(button)) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Try Ollama first
    try {
      const response = await Promise.race([
        fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'qwen2.5',
            prompt: userMessage,
            stream: false
          })
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000))
      ]) as Response;

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      setLoading(false);
      return;
    } catch {
      // Ollama unavailable — search articles locally
    }

    // Smart offline search through help articles
    const query = userMessage.toLowerCase();
    const scored = helpArticles.map(article => {
      const queryWords = query.split(' ').filter((w: string) => w.length > 3);
      let score = 0;
      queryWords.forEach((word: string) => {
        if (article.title.toLowerCase().includes(word)) score += 3;
        if (article.category.toLowerCase().includes(word)) score += 2;
        if (article.content.toLowerCase().includes(word)) score += 1;
      });
      return { article, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      const best = scored[0].article;
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Here's what I found that might help:\n\n**${best.title}**\n\n${best.content}\n\n*My live AI is currently offline. Browse all help articles above for more information.*`
      }]);
    } else {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I couldn't find a specific answer to that. My live AI is currently offline.\n\nTry browsing the help articles above — they cover most common questions. Or get in touch directly using the contact button.`
      }]);
    }

    setLoading(false);
  };

  return (
    <>
      <motion.button
        data-help-button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} /> : <HelpCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-6 w-[350px] h-[500px] max-h-[65vh] bg-background/95 backdrop-blur-xl border border-teal-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('articles')}
                className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'articles' 
                    ? 'text-teal-500 border-b-2 border-teal-500 bg-teal-500/5' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <BookOpen size={16} />
                Articles
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'ai' 
                    ? 'text-teal-500 border-b-2 border-teal-500 bg-teal-500/5' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bot size={16} />
                AI Assistant
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {activeTab === 'articles' ? (
                <div className="h-full flex flex-col p-4 gap-4">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {filteredArticles.map((article) => (
                      <button
                        key={article.slug}
                        className="w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition-all"
                      >
                        <p className="text-xs text-teal-500 font-medium mb-1">{article.category}</p>
                        <p className="text-sm font-medium text-foreground">{article.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col p-4">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-rose-500 text-white' : 'bg-muted/50 text-foreground'}`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask a question..."
                      className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="px-3 py-2 bg-rose-500 text-white rounded-lg text-sm disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
