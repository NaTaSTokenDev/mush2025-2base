import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, Timestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost } from './BlogPost';
import type { BlogPost as BlogPostType } from '../types';
import { AlertCircle, Plus } from 'lucide-react';

interface BlogListProps {
  isAdmin?: boolean;
  onNewPost?: () => void;
}

export function BlogList({ isAdmin, onNewPost }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const postsRef = collection(db, 'blog_posts');
    const q = query(
      postsRef,
      isAdmin ? where('id', '!=', '') : where('is_published', '==', true),
      orderBy('created_at', 'desc')
    );

    // Use real-time listener instead of one-time fetch
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || '',
            slug: data.slug || '',
            content: data.content || '',
            excerpt: data.excerpt || '',
            author_id: data.author_id || '',
            created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
            updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
            published_at: data.published_at?.toDate?.()?.toISOString() || null,
            meta_title: data.meta_title || null,
            meta_description: data.meta_description || null,
            featured_image: data.featured_image || null,
            is_published: data.is_published || false
          } as BlogPostType;
        });
        
        setPosts(fetchedPosts);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to load blog posts');
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-amber-800">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {isAdmin && (
        <div className="mb-8">
          <button
            onClick={onNewPost}
            className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Blog Post
          </button>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-amber-700 text-lg">
            {isAdmin ? 'No posts found. Create your first blog post!' : 'No published posts yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map(post => (
            <BlogPost key={post.id} post={post} isPreview />
          ))}
        </div>
      )}
    </div>
  );
}