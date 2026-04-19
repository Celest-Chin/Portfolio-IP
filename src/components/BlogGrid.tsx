import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BLOG_POSTS } from "../data";
import { ArrowUpRight, Plus, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const BlogGrid = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    titleZh: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    excerpt: "",
    content: ""
  });

  useEffect(() => {
    setIsAdmin(new URLSearchParams(window.location.search).get('admin') === 'true');
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map(post => post.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter(post => post.category === activeCategory);
  }, [activeCategory, posts]);

  const handleShare = async (post: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      alert("Title and Content are required.");
      return;
    }
    setPosts([newPost, ...posts]);
    setIsAddOpen(false);
    // Reset form
    setNewPost({
      title: "",
      titleZh: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      image: "",
      excerpt: "",
      content: ""
    });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Celest Chin's Insights",
    "description": "Insights on Brand Marketing, AI, and Digital Transformation by Celest Chin.",
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "alternativeHeadline": post.titleZh,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": "Celest Chin"
      }
    }))
  };

  return (
    <section id="insights" className="py-24 px-4 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF]">
          Blog & Insights
        </h2>
        <p className="text-[#007BFF] font-medium mt-2 font-[family-name:var(--font-chinese)]">
          博客与见解
        </p>
      </motion.div>

      {/* Filter Bar & Add Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-16"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 text-sm tracking-widest uppercase transition-all duration-300 rounded-full border ${
              activeCategory === category 
                ? "bg-[#001A33] border-[#007BFF] text-white" 
                : "bg-transparent border-transparent text-[#A0A0A0] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}

        {/* Add New Blog Button (Hidden from public, requires ?admin=true in URL) */}
        {isAdmin && (
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <button
                className="w-10 h-10 rounded-full bg-[#001A33] border border-[#007BFF] text-[#007BFF] flex items-center justify-center hover:bg-[#007BFF] hover:text-white transition-all duration-300 ml-2 md:ml-4 shadow-[0_0_15px_rgba(0,123,255,0.2)] hover:shadow-[0_0_20px_rgba(0,123,255,0.5)]"
                title="Add New Blog"
              >
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="md:w-[600px] w-[95vw] max-h-[90vh] bg-black border border-white/10 text-white rounded-2xl p-6 overflow-y-auto custom-scrollbar">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Create New Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Title (English) *</label>
                <input 
                  type="text" 
                  required
                  value={newPost.title}
                  onChange={e => setNewPost({...newPost, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Title (Chinese)</label>
                <input 
                  type="text" 
                  value={newPost.titleZh}
                  onChange={e => setNewPost({...newPost, titleZh: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors font-[family-name:var(--font-chinese)]"
                  placeholder="输入中文标题"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Category / Tag</label>
                  <select
                    value={newPost.category}
                    onChange={e => setNewPost({...newPost, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value="" disabled className="bg-[#001A33] text-white/50">Select a category</option>
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat} className="bg-[#001A33] text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newPost.date}
                    onChange={e => setNewPost({...newPost, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Image URL</label>
                <input 
                  type="url" 
                  value={newPost.image}
                  onChange={e => setNewPost({...newPost, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Excerpt (Short Summary)</label>
                <textarea 
                  value={newPost.excerpt}
                  onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none h-20"
                  placeholder="Brief description of the post..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Content *</label>
                <textarea 
                  required
                  value={newPost.content}
                  onChange={e => setNewPost({...newPost, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-y h-40"
                  placeholder="Write your blog content here. Use double line breaks for paragraphs."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-6 py-2 rounded-lg border border-white/20 text-white/70 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        )}
      </motion.div>

      <motion.div layout className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.title + index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="border-b border-white/10 last:border-0"
            >
              <Dialog>
                <DialogTrigger
                  nativeButton={false}
                  render={
                    <div className="w-full text-left cursor-pointer py-10 flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center hover:bg-white/[0.02] transition-colors md:px-6 rounded-2xl group" />
                  }
                >
                  {/* Left Content */}
                  <div className="flex-1 space-y-3 w-full">
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#007BFF] font-medium font-[family-name:var(--font-chinese)]">
                      {post.titleZh}
                    </p>
                    <p className="text-muted-foreground font-light leading-relaxed line-clamp-2 mt-4 max-w-2xl">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-widest pt-4">
                      {post.category && (
                        <span className="text-primary font-bold">{post.category}</span>
                      )}
                      {post.category && <span>•</span>}
                      <span>5 MIN READ</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Right Image */}
                  {post.image && (
                    <div className="w-full md:w-[320px] h-[200px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=675";
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  )}
                </DialogTrigger>
                <DialogContent className="md:w-[800px] md:h-[600px] w-[95vw] h-[80vh] max-w-none bg-black border-white/10 text-white rounded-none p-0 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-8 md:p-12 relative">
                      {/* Share Button */}
                      <button 
                        onClick={() => handleShare(post)}
                        className="absolute top-8 right-8 md:top-12 md:right-12 p-2 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-white/70 hover:text-primary transition-all duration-300 group/share"
                        title="Share this post"
                      >
                        <Share2 className="w-5 h-5 group-hover/share:scale-110 transition-transform" />
                      </button>

                      <DialogHeader className="mb-8 pr-12">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-xs text-primary uppercase tracking-widest">
                            {post.date}
                          </div>
                          {post.category && (
                            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest border border-white/10 px-2 py-1">
                              {post.category}
                            </div>
                          )}
                        </div>
                        <DialogTitle className="text-3xl md:text-4xl font-bold leading-tight mb-2 text-left">
                          {post.title}
                        </DialogTitle>
                        <p className="text-xl text-[#007BFF] font-[family-name:var(--font-chinese)] mb-6 text-left">
                          {post.titleZh}
                        </p>
                        {/* @ts-ignore - image added in data.ts */}
                        {post.image && (
                          <div className="relative aspect-video w-full overflow-hidden border border-white/10 mb-8 bg-white/[0.03]">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Use a more reliable fallback if Google Drive fails
                                target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=675";
                                target.onerror = null;
                              }}
                            />
                          </div>
                        )}
                      </DialogHeader>
                      
                      <div className="prose prose-invert max-w-none text-left">
                        {post.content.split('\n\n').map((paragraph, pIndex) => {
                          // Handle markdown style links [text](url)
                          const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
                          const urlRegex = /(https?:\/\/[^\s]+)/g;
                          
                          let content: React.ReactNode[] = [paragraph];

                          // First, handle markdown links
                          const parts: React.ReactNode[] = [];
                          let lastIndex = 0;
                          let match;

                          while ((match = markdownLinkRegex.exec(paragraph)) !== null) {
                            // Add text before match
                            parts.push(paragraph.substring(lastIndex, match.index));
                            // Add link
                            parts.push(
                              <a 
                                key={match.index} 
                                href={match[2]} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                {match[1]}
                              </a>
                            );
                            lastIndex = markdownLinkRegex.lastIndex;
                          }
                          parts.push(paragraph.substring(lastIndex));

                          // If no markdown links found, fallback to raw URL detection
                          if (parts.length === 1 && typeof parts[0] === 'string') {
                            const rawParts = parts[0].split(urlRegex);
                            content = rawParts.map((part, i) => 
                              urlRegex.test(part) ? (
                                <a 
                                  key={i} 
                                  href={part} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline break-all"
                                >
                                  {part}
                                </a>
                              ) : part
                            );
                          } else {
                            content = parts;
                          }
                          
                          const inlineImage = (post as any).inlineImages?.find((img: any) => img.afterParagraph === pIndex);
                          
                          return (
                            <React.Fragment key={pIndex}>
                              <p className="text-lg text-white/80 font-light leading-relaxed mb-6 break-words">
                                {content}
                              </p>
                              {inlineImage && (
                                <div className="my-10">
                                  <div className="relative aspect-video w-full overflow-hidden border border-white/10 mb-3 bg-white/[0.03]">
                                    <img 
                                      src={inlineImage.url} 
                                      alt={inlineImage.caption} 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200&h=675";
                                        target.onerror = null;
                                      }}
                                    />
                                  </div>
                                  <p className="text-sm text-muted-foreground font-mono text-center italic">
                                    {inlineImage.caption}
                                  </p>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

