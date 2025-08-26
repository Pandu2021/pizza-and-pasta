// ========================================================================
// FILE: src/pages/BlogPage.jsx
// ========================================================================
import React from 'react';
import { blogPosts } from '../data/blogData';
import Header from '../components/Header';
import Button from '../components/Button';

const BlogPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header
        title="Our Blog"
        subtitle="Stories, tips, and news from the Paesano kitchen."
      />
      <main className="container mx-auto py-12 px-4">
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h2>
              <div className="text-sm text-gray-500 mb-4">
                <span>By {post.author}</span> | <span>{post.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
              <Button className="bg-transparent border border-red-700 text-red-700 hover:bg-red-700 hover:text-white">
                Read More
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;