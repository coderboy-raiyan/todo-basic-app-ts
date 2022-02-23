import cogoToast from "cogo-toast";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface formData {
  id: string;
  title: string;
  des: string;
  date: string;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<formData>();
  const [todos, setTodos] = useState<formData[]>([]);

  const onSubmit = (data: formData) => {
    data.id = nanoid(10);
    data.date = new Date().toISOString();
    const newData = [...todos, data];
    setTodos(newData);
    cogoToast.success("YAY!!🥳🎉 You added a todo");
    reset();
  };

  // set the todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="lg:max-w-6xl lg:mx-auto ">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cold-1 px-4 mt-10">
        <form
          className="flex flex-col  w-full space-y-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center font-semibold text-3xl text-green-500">
            📜📜 Write Todo 📜📜
          </h1>
          <input
            required
            className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all focus:ring-0 py-4 rounded-lg"
            type="text"
            placeholder="Write a title..."
            {...register("title")}
          />
          <textarea
            required
            className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all  focus:ring-0 py-4 rounded-lg lg:h-[200px] resize-none md:h-[200px] h-full"
            placeholder="Start writing..."
            {...register("des")}
          ></textarea>
          <button className="bg-green-500 text-white py-2 rounded font-semibold hover:bg-white hover:text-green-500 transition-all hover:border-green-500 border-2 border-transparent">
            Submit
          </button>
        </form>
        <div>
          <h1 className="text-center">Your todos</h1>
        </div>
      </div>
    </section>
  );
};

export default Home;
