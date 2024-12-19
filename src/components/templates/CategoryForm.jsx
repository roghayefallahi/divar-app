import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { addCategory } from "services/admin";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });
  const [formKey, setFormKey] = useState(Date.now());

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast.success("دسته بندی با موفقیت اضافه شد.");
        queryClient.invalidateQueries("get-categories");
        setForm({ name: "", slug: "", icon: "" });
        setFormKey(Date.now());
      }
    },
    onError: (error) => {
      console.log("error", error);

      toast.error("خطایی در ارسال فرم رخ داد.");
    },
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.name || !form.slug || !form.icon) {
      toast.warn("لطفا تمام فیلدها را پر کنید.");
      return false;
    }

    mutate(form);
  };

  return (
    <div className={styles.container}>
      <h3>دسته بندی جدید</h3>

      <form
        key={formKey}
        onChange={changeHandler}
        onSubmit={submitHandler}
        className={styles.form}
      >
        <div>
          <label htmlFor="name">عنوان دسته بندی</label>
          <input type="text" name="name" id="name" defaultValue={form.name} />
        </div>
        <div>
          <label htmlFor="slug">اسلاگ</label>
          <input type="text" name="slug" id="slug" defaultValue={form.slug} />
        </div>
        <div>
          <label htmlFor="icon">آیکون</label>
          <input type="text" name="icon" id="icon" defaultValue={form.icon} />
        </div>
        <div>
          <button type="submit" disabled={isPending}>
            ایجاد
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
