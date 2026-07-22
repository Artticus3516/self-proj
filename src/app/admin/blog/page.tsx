"use client";

import {useEffect, useState, useTransition} from "react";
import {supabase} from "@/lib/supabase";
import type {Database} from "@/lib/database.types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    async function fetchPosts() {
        const {data} = await supabase
            .from("blog_posts")
            .select("*")
            .order("created_at", {ascending: false});
        setPosts(data ?? []);
    }

    useEffect(() => {
        void fetchPosts();
    }, []);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (editingId) {
            const {error: err} = await supabase
                .from("blog_posts")
                .update({title, content})
                .eq("id", editingId);
            if (err) {
                setError(err.message);
                return;
            }
            setEditingId(null);
        } else {
            const {error: err} = await supabase.from("blog_posts").insert({title, content});
            if (err) {
                setError(err.message);
                return;
            }
        }
        setTitle("");
        setContent("");
        void fetchPosts();
    }

    function handleDelete(id: string) {
        startTransition(async () => {
            await supabase.from("blog_posts").delete().eq("id", id);
            if (expandedId === id) setExpandedId(null);
            void fetchPosts();
        });
    }

    return (
        <div className="p-8 space-y-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
                <p className="mt-1 text-sm text-zinc-500">
                    Manage editorial insights and technical articles.
                </p>
            </div>

            {/* Add form */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                <h2 className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase">
                    {editingId ? "Edit Post" : "New Post"}
                </h2>
                <form onSubmit={handleAdd} className="space-y-3">
                    <input
                        required
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors"
                    />
                    <textarea
                        required
                        name="content"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Post body content…"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors resize-none"
                    />
                    {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
                        >
                            {editingId ? "Update" : "Publish Post"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setTitle("");
                                    setContent("");
                                }}
                                className="px-5 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-semibold hover:bg-zinc-800/40 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Posts table */}
            <div data-testid="blogs-list" className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                    <h2 className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase">
                        Published Posts
                    </h2>
                    <span className="text-xs text-zinc-600 font-mono">{posts.length} entries</span>
                </div>

                {posts.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-zinc-700">No posts yet.</div>
                ) : (
                    <div className="divide-y divide-zinc-800/60">
                        {posts.map((post) => (
                            <div key={post.id} className="hover:bg-zinc-800/20 transition-colors">
                                <div className="flex items-start justify-between gap-4 px-5 py-4">
                                    <article className="min-w-0 flex-1 space-y-0.5">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                                            className="text-left text-sm font-medium text-white hover:text-zinc-300 transition-colors w-full"
                                        >
                                            {post.title}
                                        </button>
                                        <p className="text-[10px] font-mono text-zinc-700">
                                            {new Date(post.created_at).toLocaleString("en-IN", {
                                                timeZone: "Asia/Kolkata",
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </p>
                                    </article>
                                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                                            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-[10px] font-mono text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors"
                                        >
                                            {expandedId === post.id ? "Collapse" : "Preview"}
                                        </button>
                                        <button
                                            data-testid="edit-blog-btn"
                                            onClick={() => {
                                                setEditingId(post.id);
                                                setTitle(post.title);
                                                setContent(post.content);
                                            }}
                                            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-[10px] font-mono text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            disabled={isPending}
                                            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-[10px] font-mono text-zinc-600 hover:border-red-900/60 hover:text-red-400 transition-colors disabled:opacity-40"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {/* Expandable content preview */}
                                {expandedId === post.id && (
                                    <div className="px-5 pb-5">
                                        <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/50 px-4 py-3">
                                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
                                                {post.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
