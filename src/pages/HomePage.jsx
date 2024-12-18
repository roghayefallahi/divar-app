import { useQuery } from "@tanstack/react-query";

import Loader from "components/modules/Loader";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { getCategory } from "services/admin";
import { getAllPosts } from "services/user";

const style = { display: "flex" };

function HomePage({ query, setQuery, search, setSearch }) {
  const { data: posts, isPending: postsLoading } = useQuery({
    queryKey: ["get-all-posts"],
    queryFn: getAllPosts,
  });
  const { data: categories, isPending: categoriesLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  return (
    <>
      {postsLoading || categoriesLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar categories={categories} query={query} setQuery={setQuery} />
          <Main data={posts} query={query} setQuery={setQuery} setSearch={setSearch} search={search}/>
        </div>
      )}
    </>
  );
}

export default HomePage;
