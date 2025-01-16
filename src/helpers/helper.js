const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join("");
};

const searchPosts = (posts, search) => {
  if (!search) return posts;
  const searchedPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search)
  );
  return searchedPosts;
};
const filterPosts = (posts, category, cities) => {
  // if (!category) return posts;
  // const filteredPosts = posts.filter((p) => p.category === category);
  // return filteredPosts;
  let filtered = posts;

  if (category) {
    filtered = filtered.filter((p) => p.category_id == category);
  }

  if (cities && cities.length > 0) {
    filtered = filtered.filter((p) => cities.includes(p.city));
  }

  return filtered;
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
  if (newQuery.cities === "") {
    const { cities, ...rest } = currentQuery;
    return rest;
  }

  return { ...currentQuery, ...newQuery };
};
const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const cities = searchParams.get("cities");
  if (category) query.category = category;
  if (search) query.search = search;
  if (cities) query.cities = cities;
  return query;
};

export {
  shortenText,
  searchPosts,
  filterPosts,
  createQueryObject,
  getInitialQuery,
};
