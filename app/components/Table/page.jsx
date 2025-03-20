"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Pagination from "../Pagination/page";
import SearchFilter from "../SearchFilter/page";

const Table = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        setError("Failed to fetch data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle Search and Filtering
  const handleSearch = (query) => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.id.toString().includes(query)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SearchFilter onSearch={handleSearch} />
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id} className="text-center">
                  <td className="border p-2">{post.id}</td>
                  <td className="border p-2">{post.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalPosts={filteredPosts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Table;
