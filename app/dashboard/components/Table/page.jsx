"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Filter, RefreshCw, Eye } from "lucide-react";
import Pagination from "../Pagination/page";
import SearchFilter from "../SearchFilter/page";
import LoadingSpinner from "../LoadingSpinner/page";

const PostsTable = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const postsPerPage = 10;

  const handleSearch = (query) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.id.toString().includes(query)
      );
      setFilteredPosts(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 300);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPosts = React.useMemo(() => {
    const sortablePosts = [...filteredPosts];
    if (sortConfig.key) {
      sortablePosts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePosts;
  }, [filteredPosts, sortConfig]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts(initialPosts);
      setFilteredPosts(initialPosts);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
    }
    return null;
  };

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Posts Management</CardTitle>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <SearchFilter onSearch={handleSearch} />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-900">
                <TableRow>
                  <TableHead 
                    className="w-[100px] cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ID {getSortIcon('id')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      Title {getSortIcon('title')}
                    </div>
                  </TableHead>
                  {/* <TableHead className="w-[100px] text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <TableCell className="font-medium">
                        <Badge variant="outline">{post.id}</Badge>
                      </TableCell>
                      <TableCell className="max-w-md truncate" title={post.title}>
                        {post.title}
                      </TableCell>
                      {/* <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                      No posts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {currentPosts.length > 0 ? indexOfFirstPost + 1 : 0} to {Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} posts
          </div>
          <Pagination
            totalPosts={filteredPosts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsTable;





