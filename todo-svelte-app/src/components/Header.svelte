<script lang="ts">
  import SvelteLogo from '../assets/svelte.png'
  import { todos } from '../store';
  let numberNotCompleted = 0;

  $: numberNotCompleted = $todos?.filter((todo) => !todo.completed).length;
</script>

<header class="py-4 px-8 h-36 flex items-center justify-between bg-red-500 text-white">
  <div class="flex items-center">
    <img
      src={SvelteLogo}
      alt="Svelte logo"
      class="w-10 md:w-24 mr-5 drop-shadow-md"
    />
    <div>
      <h2 class="mb-3 font-semibold text-3xl">Simple Todo App</h2>
      <h4 class="font-light">Built with Svelte.js!</h4>
    </div>
  </div>
  <div>
    <h3 class="font-semibold text-xl">Stats:</h3>
    <p class="font-light text-sm">
      You have a total of <span class="font-semibold text-lg">{$todos?.length}</span> todos
    </p>
    <p class="font-light text-sm">
      <span class="font-semibold text-lg">{numberNotCompleted}</span> of them are
      <strong>not</strong> completed
    </p>
  </div>
</header>
