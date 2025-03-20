"use client";

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-4 py-2 border rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
