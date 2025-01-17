import { sp } from "utils/numbers";
import { Link, useSearchParams } from "react-router-dom";

import {
  createQueryObject,
  filterPosts,
  getInitialQuery,
  searchPosts,
  shortenText,
} from "helpers/helper";
import { useContext, useEffect, useState } from "react";
import { CityContext } from "../../App";

import styles from "./Main.module.css";

function Main({ data, query, setQuery, setSearch }) {
  const { selectedCities } = useContext(CityContext);
  const posts = data?.data.posts;
 
  

  const [diplayed, setDisplayed] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!posts) return;
    setDisplayed(posts);
    setQuery(getInitialQuery(searchParams));
  }, [posts]);

  useEffect(() => {
    if (selectedCities.length > 0) {
      setQuery((query) => createQueryObject(query, { cities: selectedCities.join(',') }));
    }
  }, [selectedCities, searchParams]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalPosts = searchPosts(posts, query.search);

    finalPosts = filterPosts(finalPosts, query.category, query.cities);
    setDisplayed(finalPosts);
  }, [query]);

  return (
    <div className={styles.container}>
      {diplayed.map((post) => (
        <Link to={`post/${post.id}`} key={post.id}>
          <div className={styles.card}>
            <div className={styles.info}>
              <p>{shortenText(post.title)}</p>
              <div>
                <p>{sp(post.amount)} ریال</p>
                <span>{post.city}</span>
              </div>
            </div>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
              alt={shortenText(post.title)}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Main;
