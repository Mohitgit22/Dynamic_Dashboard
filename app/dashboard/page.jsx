// "use client";
// import { useEffect, useState } from "react";
// import Table from "./components/Table/page";
// import SearchFilter from "./components/SearchFilter/page";
// import Pagination from "./components/Pagination/page";
// import LoadingSpinner from "./components/LoadingSpinner/page";

// const DashboardPage = () => {
//   const [data, setData] = useState([]); // Initialize as empty array
//   const [filteredData, setFilteredData] = useState([]); // Initialize as empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 5;

//   useEffect(() => {
//     const fetchData=async()=>{
//       const dataf=await fetch("https://jsonplaceholder.typicode.com/posts");
//       const datajson=await dataf.json();
//       console.log("hi",datajson);
//       setData(datajson);
//     }
//     fetchData();
//   }, []);

//   useEffect(()=>{
//     console.log(data);
//   },[data]);
   
  
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Welcome</h1>
//       <p>This is the Dashboard page.</p>

//       {loading && <LoadingSpinner />}
//       {error && <p className="text-red-500">{error}</p>}

//       <SearchFilter data={data} setFilteredData={setFilteredData} />
//      <Table data={data } currentPage={currentPage} postsPerPage={postsPerPage} />
//       <Pagination totalPosts={filteredData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />
//     </div>
//   );
// };

// export default DashboardPage;

import { fetchPosts } from "@/utils/fetchData";
import Table from "./components/Table/page";

const DashboardPage = async () => {
  const posts = await fetchPosts();

  if (posts.error) {
    return <p className="text-red-500 text-center">{posts.error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Table initialPosts={posts} />
    </div>
  );
};

export default DashboardPage;
