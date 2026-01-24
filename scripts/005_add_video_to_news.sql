-- Add video_url column to news_posts table
ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS video_url TEXT;
