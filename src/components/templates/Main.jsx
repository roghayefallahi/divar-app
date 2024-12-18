import { sp } from "utils/numbers";
import { Link, useSearchParams } from "react-router-dom";

import {
  filterPosts,
  getInitialQuery,
  searchPosts,
  shortenText,
} from "helpers/helper";

import styles from "./Main.module.css";
import { useEffect, useState } from "react";

function Main({ data, query, setQuery, search, setSearch }) {
  const posts = data?.data.posts;

  const [diplayed, setDisplayed] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!posts) return;
    setDisplayed(posts);
    setQuery(getInitialQuery(searchParams));
  }, [posts]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalPosts = searchPosts(posts, query.search);

    finalPosts = filterPosts(finalPosts, query.category);
    setDisplayed(finalPosts);
  }, [query]);

  return (
    <div className={styles.container}>
      {diplayed.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <div className={styles.card}>
            <div className={styles.info}>
              <p>{shortenText(post.options.title)}</p>
              <div>
                <p>{sp(post.amount)} ریال</p>
                <span>{post.options.city}</span>
              </div>
            </div>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
              alt={shortenText(post.options.title)}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Main;
