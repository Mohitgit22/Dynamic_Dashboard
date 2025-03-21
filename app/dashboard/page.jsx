import { fetchPosts } from "@/utils/fetchData";
import PostsTable from "./components/Table/page";

const DashboardPage = async () => {
  const posts = await fetchPosts();

  if (posts.error) {
    return <div className="text-red-500 p-4">Error: {posts.error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">Content of API </h1>
      <PostsTable initialPosts={posts} />
    </div>
  );
};

export default DashboardPage;
