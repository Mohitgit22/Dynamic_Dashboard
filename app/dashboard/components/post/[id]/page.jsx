

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, FileText, Hash, Calendar } from "lucide-react";

const PostDetailsPage = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        // Get the post ID from the params
        const postId = params.id;

        // Fetch post data
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const postData = await response.json();

        // Fetch user data for the post
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        let userData = {};

        if (userResponse.ok) {
          userData = await userResponse.json();
        }

        // Fetch comments for the post
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        let comments = [];

        if (commentsResponse.ok) {
          comments = await commentsResponse.json();
        }

        // Combine all data
        setPost({
          ...postData,
          user: userData,
          comments: comments
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [params.id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="w-full max-w-full">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Post Details</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-full">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Post Details</h1>
        <div className="bg-red-500 bg-opacity-20 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Error: {error}</p>
          <button
            onClick={handleGoBack}
            className="mt-4 flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors duration-150"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full max-w-full">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Post Details</h1>
        <div className="text-gray-400 text-center p-8">
          <p>Post not found</p>
          <button
            onClick={handleGoBack}
            className="mt-4 flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-150 mx-auto"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">Post Details</h1>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-150"
        >
          <ArrowLeft size={16} />
          Back to Posts
        </button>

        {/* Post header */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Hash size={18} className="text-gray-400" />
                <span className="text-sm">Post ID: {post.id}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <User size={18} className="text-gray-400" />
                <span className="text-sm">
                  Author: {post.user?.name || `User ${post.userId}`}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 col-span-1 md:col-span-2">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm">
                  Published: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Post body */}
            <div className="bg-gray-700 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <FileText size={20} className="text-blue-400 mt-1" />
                <h2 className="text-lg font-semibold text-white">Content</h2>
              </div>
              <p className="text-gray-300 whitespace-pre-line">
                {post.body}
              </p>
            </div>

            {/* User information */}
            {post.user && Object.keys(post.user).length > 0 && (
              <div className="bg-gray-700 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <User size={20} className="text-blue-400 mt-1" />
                  <h2 className="text-lg font-semibold text-white">Author Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Name</h3>
                    <p className="text-white">{post.user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Email</h3>
                    <p className="text-white">{post.user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Username</h3>
                    <p className="text-white">{post.user.username}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Website</h3>
                    <p className="text-white">{post.user.website}</p>
                  </div>
                  {post.user.company && (
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="text-gray-400 text-sm mb-1">Company</h3>
                      <p className="text-white">{post.user.company.name}</p>
                      <p className="text-gray-300 text-sm mt-1">{post.user.company.catchPhrase}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comments section */}
            {post.comments && post.comments.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-3a1 1 0 11-2 0 1 1 0 012 0zm-1 5a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-lg font-semibold text-white">Comments ({post.comments.length})</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white">{comment.name}</h3>
                        <span className="text-xs text-gray-400">{comment.email}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{comment.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;