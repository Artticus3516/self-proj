"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {initTracking} from "/lib/tracking";
import {supabase} from "/lib/supabase";
import type {Database} from "/lib/database.types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

// ─── Fade-up animation variant ────────────────────────────────────────────────
const fadeUp = {
    hidden: {opacity: 0, y: 28},
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {duration: 0.55, delay: i * 0.12, ease: "easeOut" as const},
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
            className="group relative flex flex-col rounded-2xl border border-white/10
                 bg-zinc-950/40 backdrop-blur-xl overflow-hidden
                 transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/50"
        >
            {/* Top accent line — slides in on hover */}
            <div
                className="absolute inset-x-0 top-0 h-px bg-white/0 group-hover:bg-white/20 transition-all duration-500"/>

            <Link href={`/blog/${post.id}`} className="flex flex-col flex-1 focus:outline-none">
                {/* Card header */}
                <div className="flex items-start justify-between p-6 pb-4 border-b border-white/[0.06]">
                    <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
              Engineering — {formattedDate}
            </span>
                        <h2 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-zinc-200 transition-colors duration-300">
                            {post.title}
                        </h2>
                    </div>
                    {/* Mechanical corner chevron */}
                    <span
                        className="mt-1 text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 text-lg leading-none select-none"
                        aria-hidden="true"
                    >
            ↗
          </span>
                </div>

                {/* Summary */}
                <div className="px-6 py-5 flex-1">
                    <p className="text-sm leading-relaxed text-zinc-400 font-light group-hover:text-zinc-300 transition-colors duration-300">
                        {excerpt}
                    </p>
                </div>

                {/* Footer / Read Time */}
                <div className="px-6 pb-6 mt-auto">
                    <p className="font-mono text-[9px] tracking-[0.3em] text-zinc-700 uppercase flex items-center gap-2">
                        <span
                            className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors duration-300"
                            aria-hidden="true"/>
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
                const {data, error} = await supabase
                    .from("blog_posts")
                    .select("*")
                    .order("created_at", {ascending: false});
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
        <main className="min-h-screen bg-[#030303] text-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24">
                {/* ── Page header ──────────────────────────────────────────────── */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.55, ease: "easeOut"}}
                    className="mb-16 max-w-3xl"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-white">
                        Insights & <br className="sm:hidden"/> Engineering
                    </h1>
                    <p className="mt-5 text-base leading-relaxed text-zinc-500 font-light max-w-xl">
                        Deep dives into enterprise architecture, SaaS scaling, and premium
                        web design. Thoughts from the engineers and designers at Archon.
                    </p>
                </motion.div>

                {/* ── Featured tag band ────────────────────────────────────────── */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.55, delay: 0.2, ease: "easeOut"}}
                    className="flex flex-wrap gap-3 mb-12"
                >
                    {["All Posts", "Engineering", "Design", "DevOps", "Marketing", "UX/UI"].map(
                        (tag, i) => (
                            <button
                                key={tag}
                                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-colors duration-300 ${
                                    i === 0
                                        ? "bg-white text-black"
                                        : "bg-zinc-900/50 text-zinc-400 border border-white/10 hover:bg-zinc-800 hover:text-white"
                                }`}
                            >
                                {tag}
                            </button>
                        )
                    )}
                </motion.div>

                {/* ── Blog cards grid ──────────────────────────────────────────── */}
                {loading ? (
                    <div className="text-center py-20 text-zinc-500 font-mono text-sm">
                        Loading posts...
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500 font-mono text-sm">
                        No blog posts published yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                        {posts.map((post, i) => (
                            <BlogCard key={post.id} post={post} index={i}/>
                        ))}
                    </div>
                )}

                {/* ── Newsletter CTA ───────────────────────────────────────────── */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.55, delay: 0.4, ease: "easeOut"}}
                    className="relative rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden"
                >
                    <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-2xl"
                          aria-hidden="true"/>
                    <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-2xl"
                          aria-hidden="true"/>
                    <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-2xl"
                          aria-hidden="true"/>
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-2xl"
                          aria-hidden="true"/>

                    <div className="space-y-2 max-w-lg">
                        <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                            Stay updated
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                            Join the Archon Newsletter
                        </p>
                        <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            Receive our latest articles, case studies, and engineering practices directly to your inbox.
                            No spam, just pure signal.
                        </p>
                    </div>

                    <form className="w-full sm:w-auto flex gap-3 flex-col sm:flex-row"
                          onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-zinc-900 border border-white/10 text-white text-sm rounded-xl px-5 py-3.5 focus:outline-none focus:border-white/30 transition-colors w-full sm:w-64"
                            required
                        />
                        <button
                            type="submit"
                            className="shrink-0 inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl
                         bg-white text-black text-sm font-semibold tracking-wide
                         transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95
                         shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                        >
                            Subscribe
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
