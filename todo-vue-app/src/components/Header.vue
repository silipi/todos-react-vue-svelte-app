<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ITodo } from "../models";

const props = defineProps<{
  todos: ITodo[];
}>();

const numberNotCompleted = computed(
  () => props.todos.filter((todo: ITodo) => !todo.completed).length
);
</script>
<template>
  <header
    class="
      py-4
      px-8
      h-36
      flex
      items-center
      justify-between
      bg-green-600
      text-white
    "
  >
    <div class="flex items-center">
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        class="w-10 md:w-24 mr-5 drop-shadow-md"
      />
      <div>
        <h2 class="mb-3 font-semibold text-3xl">Simple Todo App</h2>
        <h4 class="font-light">Built with Vue.js 3!</h4>
      </div>
    </div>
    <div>
      <h3 class="font-semibold text-xl">Stats:</h3>
      <p class="font-light text-sm">
        You have a total of
        <span class="font-semibold text-lg">{{ props.todos?.length }}</span>
        todos
      </p>
      <p class="font-light text-sm">
        <span class="font-semibold text-lg">{{ numberNotCompleted }}</span> of
        them are <strong>not</strong> completed
      </p>
    </div>
  </header>
</template>
