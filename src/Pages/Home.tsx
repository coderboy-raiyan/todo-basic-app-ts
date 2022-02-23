import cogoToast from "cogo-toast";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Todo from "./SingalTodo";

interface formData {
  id: string;
  title: string;
  des: string;
  date: string;
  bg: string;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<formData>();
  const [switchEdit, setSwitchEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<formData>({} as formData);
  // todo states
  const [todos, setTodos] = useState<formData[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );

  // generate random colors
  const myRandomColors: string[] = ["#FB7C72", "#32FBDC", "#894AEC", "#FFDA45"];

  // save the todo in the local storage
  const onSubmit = (data: formData) => {
    data.bg = myRandomColors[Math.floor(Math.random() * 5)];
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

  // delete a todo
  const handelDelete = (selectedId: string): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const afterDeletedTodo = todos.filter(({ id }) => id !== selectedId);
        setTodos(afterDeletedTodo);
      } else {
        Swal.fire("Ok no problem", "", "info");
      }
    });
  };

  return (
    <section className="lg:max-w-6xl lg:mx-auto ">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cold-1 px-4 mt-10">
        {switchEdit ? (
          <form
            className="flex flex-col  w-full space-y-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-center font-semibold text-3xl text-green-500">
              📜📜 Edit Todo 📜📜
            </h1>
            <input
              required
              className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all focus:ring-0 py-4 rounded-lg"
              type="text"
              defaultValue={editData?.title}
              placeholder="Write a title..."
              {...register("title")}
            />
            <textarea
              required
              className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all  focus:ring-0 py-4 rounded-lg lg:h-[200px] resize-none md:h-[200px] h-full w-full"
              defaultValue={editData?.des}
              placeholder="Start writing..."
              {...register("des")}
            ></textarea>
            <div className="flex space-x-4">
              <button className="edit_btn">Update todo</button>
              <button
                onClick={() => {
                  setSwitchEdit(false);
                  setEditData({} as formData);
                }}
                className="delete_btn"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
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
              defaultValue=""
              placeholder="Write a title..."
              {...register("title")}
            />
            <textarea
              required
              className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all  focus:ring-0 py-4 rounded-lg lg:h-[200px] resize-none md:h-[200px] h-full w-full"
              placeholder="Start writing..."
              defaultValue=""
              {...register("des")}
            ></textarea>
            <button className="bg-green-500 text-white py-2 rounded font-semibold hover:bg-white hover:text-green-500 transition-all hover:border-green-500 border-2 border-transparent">
              Add todo
            </button>
          </form>
        )}
        {/* Show todos in the UI */}
        <div className=" my-20 lg:mt-0 md:mt-0">
          <h1 className="text-center text-green-500 text-2xl font-semibold">
            Tasks
          </h1>
          <div className="h-[500px] overflow-y-scroll scrollbar-hide text-sm lg:mx-8 md:mx-4 space-y-5">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} handelDelete={handelDelete} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
