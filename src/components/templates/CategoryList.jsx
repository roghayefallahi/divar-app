import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

import Loader from "components/modules/Loader";
import { deleteCategory, getCategory } from "services/admin";

import styles from "./CategoryList.module.css";

function CategoryList() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });


  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-categories");
      toast.success("دسته‌بندی با موفقیت حذف شد!");
    },
    onError: (error) => {
      console.log("خطا در حذف دسته‌بندی:", error);
      toast.error("حذف دسته‌بندی ناموفق بود!");
    },
  });

  const deleteHandler = (e) => {
    const categoryId = e.currentTarget.getAttribute("data-id");

    mutate(categoryId);
  };

  return (
    <>
      <div className={styles.list}>
        {isPending ? (
          <Loader />
        ) : (
          data.data.map((i) => (
            <div key={i.id}>
              <img src={`${i.icon}.svg`} alt="" />
              <h5>{i.name}</h5>
              <p>slug:{i.slug}</p>

              <FaTrashAlt data-id={i.id} onClick={deleteHandler} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CategoryList;
