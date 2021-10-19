import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ITodo } from "../models";

export const todos: Writable<ITodo[]> = writable(
  JSON.parse(localStorage.getItem("todos")) || []
);
