-- SQL Migration/Schema for Supabase Production Deployment

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create traffic_logs table
CREATE TABLE IF NOT EXISTS public.traffic_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_agent TEXT NOT NULL,
  consent_granted BOOLEAN NOT NULL
);

-- Setup Row Level Security (RLS) policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_logs ENABLE ROW LEVEL SECURITY;

-- Read policies (public reads services and blog posts)
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read blog posts" ON public.blog_posts FOR SELECT USING (true);

-- Insert policy for public forms
CREATE POLICY "Allow public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert traffic logs" ON public.traffic_logs FOR INSERT WITH CHECK (true);

-- Admin CRUD access (Requires auth - check user is authenticated)
CREATE POLICY "Allow admin CRUD services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin CRUD blog posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin select leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin select traffic logs" ON public.traffic_logs FOR SELECT USING (auth.role() = 'authenticated');
