import cogoToast from "cogo-toast";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Todo from "./SingalTodo";
const randomColor = require("randomcolor");

interface formData {
  id: string;
  title: string;
  des: string;
  date: string;
  bg: string;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<formData>();
  const [todos, setTodos] = useState<formData[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );
  const myColors = randomColor({
    luminosity: "light",
    hue: "green", // e.g. 'rgb(225,200,20)'
  });

  const onSubmit = (data: formData) => {
    data.bg = myColors;
    data.id = nanoid(10);
    data.date = new Date().toISOString();
    const newData = [...todos, data].reverse();
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
            className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all  focus:ring-0 py-4 rounded-lg lg:h-[200px] resize-none md:h-[200px] h-full w-full"
            placeholder="Start writing..."
            {...register("des")}
          ></textarea>
          <button className="bg-green-500 text-white py-2 rounded font-semibold hover:bg-white hover:text-green-500 transition-all hover:border-green-500 border-2 border-transparent">
            Submit
          </button>
        </form>
        {/* Show todos in the UI */}
        <div className="h-[500px] overflow-y-scroll scrollbar-hide mt-20 lg:mt-0 md:mt-0">
          <h1 className="text-center text-green-500 text-2xl">Your todos</h1>
          <div className="text-sm lg:mx-8 md:mx-4 space-y-5">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
