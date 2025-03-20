export const fetchPosts = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  };
  