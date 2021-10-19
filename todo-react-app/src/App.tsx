import React, { KeyboardEventHandler, useEffect, useState } from "react";
import Header from "./components/Header";
import { ITodo } from "./models";
import { formatDateToAgo } from "./utils";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]") || []
  );
  const [todosCreatedAt, setTodosCreatedAt] = useState<Date[]>([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodosCreatedAt(todos.map((t) => t.createdAt));
  }, [todos]);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setTodos((current) => [
        ...current,
        { value: inputValue, completed: false, createdAt: new Date() },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (todo: ITodo) => {
    const newArray = todos.filter((t) => t !== todo);
    setTodos(newArray);
  };

  const handleComplete = (todo: ITodo) => {
    const indexOf = todos.indexOf(todo);
    const newArray = todos.map((t, i) => {
      if (i === indexOf) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });
    setTodos(newArray);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header todos={todos} />
      <section
        className="flex flex-col md:flex-row px-6 md:px-0"
        style={{ height: "calc(100vh - 144px)" }}
      >
        <div className="md:mx-5 lg:mx-10 my-4 md:mt-6">
          <label htmlFor="new" className="block">
            Insert a new task:
          </label>
          <input
            type="text"
            id="new"
            className="px-3 py-2 w-full shadow-md border outline-none rounded-md focus:ring-2 focus:ring-blue-300"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="e.g.: Learn React.js"
          />
        </div>
        <div
          style={{ width: "2px" }}
          className="hidden md:block h-full bg-gray-200"
        />
        <div className="flex-1 md:mx-5 lg:mx-10 overflow-y-auto py-6 h-full">
          {todos.map((todo, i) => (
            <div className="px-8 py-3 not mb-4 flex items-center justify-between bg-white shadow-md rounded-lg border border-b-4">
              <div>
                <p>{todo.value}</p>
                <p>{formatDateToAgo(todosCreatedAt[i])}</p>
              </div>
              <div>
                <button
                  className="p-1.5 mr-2 rounded-full bg-red-300 text-red-800 hover:bg-red-200 transition material-icons-outlined "
                  onClick={() => handleDelete(todo)}
                >
                  delete
                </button>
                <button
                  className="p-1.5 rounded-full bg-green-300 text-green-800 hover:bg-green-200 transition material-icons-outlined "
                  onClick={() => handleComplete(todo)}
                >
                  {todo.completed ? "remove_done" : "done"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
