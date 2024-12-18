import { useQuery } from "@tanstack/react-query";

import Loader from "components/modules/Loader";
import { getPosts } from "services/user";
import { sp } from "utils/numbers";

import styles from "./PostsList.module.css"

function PostsList() {
  const { data, isPending } = useQuery({
    queryKey: ["my-posts-list"],
    queryFn: getPosts,
  });



  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                alt={post.options.title}
              />
              <div >
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} ریال</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostsList;
