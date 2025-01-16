import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Loader from "components/modules/Loader";
import { deletePost, getPosts } from "services/user";
import { sp } from "utils/numbers";

import styles from "./PostsList.module.css";
import { toast } from "react-toastify";

function PostsList() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["my-posts-list"],
    queryFn: getPosts,
  });


  
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries("my-posts-list");
      toast.success("آگهی با موفقیت حذف شد!");
    },
    onError: (error) => {
      console.log("خطا در حذف آگهی:", error);
      toast.error("حذف آگهی ناموفق بود!");
    },
  });

  const deleteHandler = (e) => {
    const postId = e.currentTarget.getAttribute("data-id");

    mutate(postId);
  };

  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data?.data.posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                alt={post.title}
              />
              <div>
                <p>{post.title}</p>
                <span>{post.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} ریال</span>
                <div className={styles.actions}>
                  <FaTrashAlt
                    data-id={post.id}
                    className={styles.trash}
                    onClick={deleteHandler}
                  />
                  <FaEdit className={styles.edit} />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostsList;
