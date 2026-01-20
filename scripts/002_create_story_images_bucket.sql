-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public)
VALUES ('story-images', 'story-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload story images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'story-images');

-- Allow public to view story images
CREATE POLICY "Allow public to view story images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'story-images');

-- Allow users to delete their own images
CREATE POLICY "Allow users to delete their own story images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'story-images' AND auth.uid()::text = (storage.foldername(name))[1]);
