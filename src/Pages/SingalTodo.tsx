import React from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import Moment from "react-moment";

interface data {
  todo: {
    id: string;
    title: string;
    des: string;
    date: string;
    bg: string;
  };
  handelDelete: (id: string) => void;
}

const Todo = ({ todo, handelDelete }: data) => {
  console.log(todo);

  return (
    <div
      className=" p-3 rounded-lg hover:shadow shadow-gray-200 shadow-lg duration-700 transition-all mt-7"
      style={{ backgroundColor: `${todo.bg}` }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-white">{todo.title}</h2>
        {/* edit and delete buttons */}
        <div className="text-2xl space-x-1">
          <button
            onClick={() => handelDelete(todo.id)}
            className="text-white hover:scale-110 transition-all"
          >
            <TiDelete />
          </button>
          <button className="text-white hover:scale-110 transition-all">
            <TiEdit />
          </button>
        </div>
      </div>

      <textarea
        disabled
        className="outline-none text-sm h-[100px] scrollbar-hide bg-transparent resize-none border-none w-full p-0 my-3 text-white"
        defaultValue={todo.des}
      ></textarea>
      <p className="text-right text-xs text-gray-100 font-semibold my-2">
        <Moment fromNow>{todo.date}</Moment>
      </p>
    </div>
  );
};

export default Todo;
