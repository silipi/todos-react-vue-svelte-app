<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onBeforeMount, watchEffect } from "@vue/runtime-core";
import Header from "./components/Header.vue";
import { ITodo } from "./models";
import { formatDateToAgo } from "./utils";

const todos = ref<ITodo[]>([]);
const todosCreatedAt = ref<Date[]>([]);

onBeforeMount(() => {
  todos.value = JSON.parse(localStorage.getItem("todos") || "[]") || [];
});

watchEffect(() => {
  console.log(todos.value);
  if (todos.value === []) return;

  localStorage.setItem("todos", JSON.stringify(todos.value));
  todosCreatedAt.value = todos.value.map((t) => t.createdAt);
});

const inputValue = ref("");

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    todos.value = [
      ...todos.value,
      { value: inputValue.value, completed: false, createdAt: new Date() },
    ];
    inputValue.value = "";
  }
};

const handleDelete = (todo: ITodo) => {
  const newArray = todos.value.filter((t) => t !== todo);
  todos.value = newArray;
};

const handleComplete = (todo: ITodo) => {
  const indexOf = todos.value.indexOf(todo);

  todos.value[indexOf].completed = !todos.value[indexOf].completed;
};
</script>

<template>
  <Header :todos="todos" />
  <section
    class="flex flex-col md:flex-row px-6 md:px-0"
    style="height: calc(100vh - 144px)"
  >
    <div class="md:mx-5 lg:mx-10 my-4 md:mt-6">
      <label for="new" class="block">Insert a new task:</label>
      <input
        type="text"
        id="new"
        class="
          px-3
          py-2
          w-full
          shadow-md
          border
          outline-none
          rounded-md
          focus:ring-2 focus:ring-green-300
        "
        v-model="inputValue"
        @keydown="handleEnter"
        placeholder="e.g.: Learn Vue.js"
      />
    </div>
    <div style="width: 2px" class="hidden md:block h-full bg-gray-200" />
    <div class="flex-1 md:mx-5 lg:mx-10 overflow-y-auto py-6 h-full">
      <div
        v-for="(todo, i) in todos"
        class="
          px-8
          py-3
          not
          mb-4
          flex
          items-center
          justify-between
          bg-white
          shadow-md
          rounded-lg
          border border-b-4
        "
      >
        <div>
          <p class:completed="{todo.completed}">{{ todo.value }}</p>
          <p class:completed="{todo.completed}">
            {{ formatDateToAgo(todosCreatedAt[i]) }}
          </p>
        </div>
        <div>
          <button
            class="
              p-1.5
              mr-2
              rounded-full
              bg-red-300
              text-red-800
              hover:bg-red-200
              transition
              material-icons-outlined
            "
            @click="handleDelete(todo)"
          >
            delete
          </button>
          <button
            class="
              p-1.5
              rounded-full
              bg-green-300
              text-green-800
              hover:bg-green-200
              transition
              material-icons-outlined
            "
            @click="handleComplete(todo)"
          >
            {{ todo.completed ? "remove_done" : "done" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
