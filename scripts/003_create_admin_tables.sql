-- Create support_messages table for user support requests
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news_posts table for admin announcements
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'announcement' CHECK (category IN ('announcement', 'feature', 'update', 'event', 'resource')),
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;

-- Support messages policies
-- Users can insert their own support messages
CREATE POLICY "Anyone can submit support messages" ON support_messages
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

-- Only admins can view all support messages (for now, allow all authenticated users to view their own)
CREATE POLICY "Users can view their own messages" ON support_messages
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Allow all authenticated users to view and manage (temporary - for admin functionality)
CREATE POLICY "Authenticated users can view all messages" ON support_messages
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update messages" ON support_messages
  FOR UPDATE TO authenticated
  USING (true);

-- News posts policies
-- Anyone can read published news
CREATE POLICY "Anyone can read published news" ON news_posts
  FOR SELECT TO authenticated, anon
  USING (is_published = true);

-- Authenticated users can manage news (admin functionality)
CREATE POLICY "Authenticated users can manage news" ON news_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_support_messages_status ON support_messages(status);
CREATE INDEX IF NOT EXISTS idx_support_messages_created_at ON support_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_posts_published ON news_posts(is_published, created_at DESC);
