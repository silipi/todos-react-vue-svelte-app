<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import type { ITodo } from './models';
  import { todos } from './store';
  import { formatDateToAgo } from './utils';

  let inputValue: string = '';
  let todosCreatedAt: Date[] = [];

  onMount(() => {
    console.log(JSON.parse(localStorage.getItem('todos')))
    $todos = JSON.parse(localStorage.getItem('todos')) || [];
  });

  todos.subscribe((value) => {
    localStorage.setItem('todos', JSON.stringify(value));


    todosCreatedAt = value.map(t => t.createdAt);
    todosCreatedAt = todosCreatedAt;
  });

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      $todos = [...$todos, { value: inputValue, completed: false, createdAt: new Date() }];
      inputValue = '';
    }
  };

  const handleDelete = (todo: ITodo) => {
    const newArray = $todos.filter((t) => t !== todo);
    $todos = newArray;
  };

  const handleComplete = (todo: ITodo) => {
    const indexOf = $todos.indexOf(todo);

    $todos[indexOf].completed = !$todos[indexOf].completed;
  };
</script>

<div class="h-screen w-screen overflow-hidden">
  <Header />
  <section class="flex flex-col md:flex-row px-6 md:px-0" style="height: calc(100vh - 144px)">
    <div class="md:mx-5 lg:mx-10 my-4 md:mt-6">
      <label for="new" class="block">Insert a new task:</label>
      <input
        type="text"
        id="new"
        class="px-3 py-2 w-full shadow-md border outline-none rounded-md focus:ring-2 focus:ring-red-300"
        bind:value={inputValue}
        on:keydown={handleEnter}
        placeholder="e.g.: Learn Svelte.js"
      />
    </div>
    <div style="width: 2px;" class="hidden md:block h-full bg-gray-200" />
    <div class="flex-1 md:mx-5 lg:mx-10 overflow-y-auto py-6 h-full">
      {#each $todos as todo, i}
        <div
          class="px-8 py-3 not mb-4 flex items-center justify-between bg-white shadow-md rounded-lg border border-b-4"
        >
        <div>
          <p class:completed={todo.completed}>{todo.value}</p>
          <p class:completed={todo.completed}>{formatDateToAgo(todosCreatedAt[i])}</p>
        </div>
          <div>
            <button
              class="p-1.5 mr-2 rounded-full bg-red-300 text-red-800 hover:bg-red-200 transition material-icons-outlined "
              on:click={() => handleDelete(todo)}>delete</button
            >
            <button
              class="p-1.5 rounded-full bg-green-300 text-green-800 hover:bg-green-200 transition material-icons-outlined "
              on:click={() => handleComplete(todo)}
              >{todo.completed ? 'remove_done' : 'done'}</button
            >
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>


<style>
  p.completed {
    text-decoration: line-through;
    color: #aaa;
  }
</style>
