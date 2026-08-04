"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initTracking } from "@/lib/tracking";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/database.types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

// ─── Fade-up animation variant ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

// ─── Blog Card ─────────────────────────────────────────────────────────────
function BlogCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const excerpt = post.content.slice(0, 150) + (post.content.length > 150 ? "..." : "");
  const words = post.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl border border-border
                 bg-card/80 backdrop-blur-xl overflow-hidden
                 transition-all duration-500 hover:border-primary/40 hover:bg-card"
    >
      {/* Top accent line — slides in on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-transparent group-hover:bg-primary/30 transition-all duration-500" />

      <Link href={`/blog/${post.id}`} className="flex flex-col flex-1 focus:outline-none">
        {/* Card header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Engineering — {formattedDate}
            </span>
            <h2 className="text-lg font-semibold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h2>
          </div>
          {/* Mechanical corner chevron */}
          <span
            className="mt-1 text-muted-foreground group-hover:text-primary transition-colors duration-300 text-lg leading-none select-none"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        {/* Summary */}
        <div className="px-6 py-5 flex-1">
          <p className="text-sm leading-relaxed text-muted-foreground font-light group-hover:text-foreground transition-colors duration-300">
            {excerpt}
          </p>
        </div>

        {/* Footer / Read Time */}
        <div className="px-6 pb-6 mt-auto">
          <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors duration-300" aria-hidden="true" />
            {readTime}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initTracking("/blog");
    async function fetchPosts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) {
          setPosts(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    void fetchPosts();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24">
        {/* ── Page header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-foreground">
            Insights & <br className="sm:hidden" /> Engineering
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground font-light max-w-xl">
            Deep dives into enterprise architecture, SaaS scaling, and premium
            web design. Thoughts from the engineers and designers at Archon.
          </p>
        </motion.div>

        {/* ── Featured tag band ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {["All Posts", "Engineering", "Design", "DevOps", "Marketing", "UX/UI"].map(
            (tag, i) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-colors duration-300 ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            )
          )}
        </motion.div>

        {/* ── Blog cards grid ──────────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            No blog posts published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* ── Newsletter CTA ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: "easeOut" }}
          className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-border rounded-tl-2xl" aria-hidden="true" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-border rounded-tr-2xl" aria-hidden="true" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-border rounded-bl-2xl" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-border rounded-br-2xl" aria-hidden="true" />

          <div className="space-y-2 max-w-lg">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Stay updated
            </p>
            <p className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
              Join the Archon Newsletter
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Receive our latest articles, case studies, and engineering practices directly to your inbox. No spam, just pure signal.
            </p>
          </div>

          <form className="w-full sm:w-auto flex gap-3 flex-col sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-input/20 border border-input text-foreground placeholder:text-muted-foreground text-sm rounded-xl px-5 py-3.5 focus:outline-none focus:border-primary transition-colors w-full sm:w-64 shadow-sm"
              required
            />
            <button
              type="submit"
              className="shrink-0 inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl
                         bg-primary text-primary-foreground text-sm font-semibold tracking-wide
                         transition-all duration-300 hover:bg-primary-hover hover:scale-105 active:scale-95
                         shadow-md"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
