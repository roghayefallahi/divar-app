import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { getCategory } from "services/admin";
import { getCookie } from "utils/cookie";

import styles from "./AddPost.module.css";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: [],
  });

  const [formKey, setFormKey] = useState(Date.now());
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    // if (name) {
    //   setForm({
    //     ...form,
    //     [name]: name === "images" ? e.target.files[0] : e.target.value,
    //   });
    // }
    if (name) {
      if (name === "images") {
        // تبدیل فایل‌ها به آرایه و ذخیره در state
        setForm({
          ...form,
          images: Array.from(e.target.files),
        });
      } else {
        setForm({
          ...form,
          [name]: e.target.value,
        });
      }
    }
  };
  const createPost = (newPost) => {
    const formData = new FormData();
    for (let key in newPost) {
      if (key === "images") {
        newPost.images.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, newPost[key]);
      }
    }
    const accessToken = getCookie("accessToken");

    return axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      toast.success(" آگهی با موفقیت اضافه شد.");
      queryClient.invalidateQueries("get-posts"); // Refresh the posts list
      setForm({
        title: "",
        content: "",
        amount: null,
        city: "",
        category: "",
        images: [],
      });
      setFormKey(Date.now());
    },
    onError: () => {
      toast.error("خطایی در ارسال فرم رخ داد.");
    },
  });

  const addHandler = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.amount ||
      !form.category ||
      !form.city ||
      !form.images ||
      form.images.length === 0 ||
      !form.content
    ) {
      toast.error("لطفا تمام فیلدها را پر کنید.");
    } else {
      mutate(form);
    }
    // const formData = new FormData();
    // for (let i in form) {
    //   // formData.append(i, form[i]);
    //   if (i === "images") {
    //     // افزودن هر فایل به فرم‌دیتا
    //     form.images.forEach((file) => formData.append("images", file));
    //   } else {
    //     formData.append(i, form[i]);
    //   }
    // }
    // const accessToken = getCookie("accessToken");

    // axios
    //   .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then((res) => {
    //     toast.success(" آگهی با موفقیت اضافه شد.");
    //     setForm({
    //       title: "",
    //       content: "",
    //       amount: null,
    //       city: "",
    //       category: "",
    //       images: [],
    //     });
    //     setFormKey(Date.now());
    //   })
    //   .catch((error) => toast.error("خطایی در ارسال فرم رخ داد."));
  };

  return (
    <div className={styles.container}>
      <h3>افزودن آگهی</h3>
      <form
        key={formKey}
        onSubmit={addHandler}
        onChange={changeHandler}
        className={styles.form}
      >
        <div>
          <div>
            <label htmlFor="title">عنوان</label>
            <input type="text" id="title" name="title" />
          </div>
          <div>
            <label htmlFor="city">شهر</label>
            <input type="text" id="city" name="city" />
          </div>
          <div>
            <label htmlFor="amount">قیمت</label>
            <input type="number" id="amount" name="amount" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="category">دسته بندی</label>
            <select name="category" id="category" defaultValue={form.category}>
              <option disabled value="">
                انتخاب کنید
              </option>
              {data?.data.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="images">عکس</label>
            <input type="file" id="images" name="images" multiple />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" />
          </div>
        </div>
        <div>
          <button type="submit">افزودن</button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
