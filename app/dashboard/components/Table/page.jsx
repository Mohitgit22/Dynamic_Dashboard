"use client";
import { useState, useEffect } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchFilter from "../SearchFilter/page"; // Import the SearchFilter component
import LoadingSpinner from "../LoadingSpinner/page"; // Import the LoadingSpinner component

const PostsTable = ({ initialPosts }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Add loading state

  // Initialize with loading effect
  useEffect(() => {
    // Simulate initial data loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Search functionality
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.id.toString().includes(searchTerm)
  );

  // Search handler function for the SearchFilter component
  const handleSearch = (value) => {
    setLoading(true); // Start loading when search changes
    setSearchTerm(value);
    
    // Simulate search delay
    setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      setLoading(false); // End loading after "search" completes
    }, 300);
  };

  // Refresh handler
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate refreshing data
      setSearchTerm("");
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  };

  // Sort functionality
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // Handlers
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    // Simulate page change delay
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleViewDetails = (postId) => {
    router.push(`/dashboard/components/post/${postId}`);
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header and controls */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">Posts Management</h2>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
        
        {/* Search and pagination controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-64">
            {/* Use the SearchFilter component with loading state */}
            <SearchFilter 
              onSearch={handleSearch}
              placeholder="Search by title or ID..."
              isLoading={loading}
              className="mb-0" // Override the default mb-4
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={postsPerPage}
              onChange={(e) => setPostsPerPage(Number(e.target.value))}
              className="bg-gray-700 border border-gray-600 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <span className="text-gray-400 text-sm hidden md:block">
              Showing {filteredPosts.length > 0 ? indexOfFirstPost + 1 : 0}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Table with loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <button onClick={() => handleSort("id")} className="flex items-center gap-1">
                    ID <ArrowUpDown size={14} className="text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <button onClick={() => handleSort("title")} className="flex items-center gap-1">
                    Title <ArrowUpDown size={14} className="text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <tr 
                    key={post.id} 
                    className="hover:bg-gray-700 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{post.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      <div className="line-clamp-2">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(post.id)}
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 focus:outline-none transition-colors duration-150"
                      >
                        <span>View Details</span>
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                    {searchTerm ? "No posts match your search" : "No posts available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="hidden sm:block text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || loading}
              className={`p-2 rounded-md ${
                currentPage === 1 || loading
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="hidden sm:flex space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                i + 1 >= currentPage - 2 && i + 1 <= currentPage + 2 && (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={loading}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              ))}
            </div>
            <span className="text-sm text-gray-400 sm:hidden">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || loading}
              className={`p-2 rounded-md ${
                currentPage === totalPages || loading
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsTable;