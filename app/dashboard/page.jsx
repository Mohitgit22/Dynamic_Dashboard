

import { fetchPosts } from "@/utils/fetchData";
import Table from "./components/Table/page";

const DashboardPage = async () => {
  const posts = await fetchPosts();

  if (posts.error) {
    return <p className="text-red-500 text-center">{posts.error}</p>;
  }

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">Dashboard</h1> */}
      <Table initialPosts={posts} />
    </div>
  );
};

export default DashboardPage;
