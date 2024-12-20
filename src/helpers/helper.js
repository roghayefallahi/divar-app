const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join("");
};

const searchPosts = (posts, search) => {
  if (!search) return posts;
  const searchedPosts = posts.filter((p) =>
    p.options.title.toLowerCase().includes(search)
  );
  return searchedPosts;
};
const filterPosts = (posts, category) => {
  if (!category) return posts;
  const filteredPosts = posts.filter((p) => p.category === category);
  return filteredPosts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }

  return { ...currentQuery, ...newQuery };
};
const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

export {
  shortenText,
  searchPosts,
  filterPosts,
  createQueryObject,
  getInitialQuery,
};
