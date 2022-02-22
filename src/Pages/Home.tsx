import React from "react";
import { useForm } from "react-hook-form";

interface formData {
  title: string;
  des: string;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<formData>();
  const onSubmit = (data: formData) => {
    console.log(data);
    reset();
  };

  return (
    <section className="lg:max-w-6xl lg:mx-auto ">
      <div className="flex justify-center mt-4">
        <form
          className="flex flex-col lg:w-[600px] md:w-[600px] w-full space-y-5"
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
            className="outline-none border-2 border-gray-400 bg-white shadow focus:shadow-lg transition-all focus:ring-0 py-4 rounded-lg lg:h-[200px] resize-none md:h-[200px] h-full"
            placeholder="Start writing..."
            {...register("des")}
          ></textarea>
          <button className="bg-green-500 text-white py-2 rounded font-semibold hover:bg-white hover:text-green-500 transition-all hover:border-green-500 border-2 border-transparent">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;
