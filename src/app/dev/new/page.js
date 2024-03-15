"use client";
import { useState } from "react";

const page = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events/new", {
        method: "POST",
        body: JSON.stringify({
          name: "test",
          price: {
            first: "100",
            second: "300",
            third: "1",
          },
          department: "cse",
          date: "dec 01",
        }),
      });

      if (response.ok) {
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className=" h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add event</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white">name</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">first</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">second</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">third</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">date</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">department</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              onClick={createPrompt}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default page;
