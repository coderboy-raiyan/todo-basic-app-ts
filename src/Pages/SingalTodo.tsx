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
}

const Todo = ({ todo }: data) => {
  console.log(todo);

  return (
    <div
      className=" p-3 rounded-lg border-2 shadow-lg border-gray-400 mt-7"
      style={{ backgroundColor: `${todo.bg}` }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-800">{todo.title}</h2>
        <div className="text-xl space-x-1">
          <button className="text-red-400 hover:scale-110 transition-all">
            <TiDelete />
          </button>
          <button className="text-blue-500 hover:scale-110 transition-all">
            <TiEdit />
          </button>
        </div>
      </div>

      <textarea
        disabled
        className="outline-none text-sm h-[100px] scrollbar-hide bg-transparent resize-none border-none w-full p-0 my-3"
        defaultValue={todo.des}
      ></textarea>
      <p className="text-right text-xs text-gray-600 font-semibold my-2">
        <Moment fromNow>{todo.date}</Moment>
      </p>
    </div>
  );
};

export default Todo;
