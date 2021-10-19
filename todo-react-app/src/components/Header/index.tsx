import { ITodo } from "../../models";
import ReactLogo from "../../logo.svg";

const Header = ({ todos }: { todos: ITodo[] }) => {
  const numberNotCompleted = todos.filter((todo) => !todo.completed).length;

  return (
    <header className="py-4 px-8 h-36 flex items-center justify-between bg-blue-500 text-white">
      <div className="flex items-center">
        <img
          src={ReactLogo}
          alt="Svelte logo"
          className="w-10 md:w-24 mr-5 drop-shadow-md"
        />
        <div>
          <h2 className="mb-3 font-semibold text-3xl">Simple Todo App</h2>
          <h4 className="font-light">Built with React.js!</h4>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-xl">Stats:</h3>
        <p className="font-light text-sm">
          You have a total of{" "}
          <span className="font-semibold text-lg">{todos?.length}</span> todos
        </p>
        <p className="font-light text-sm">
          <span className="font-semibold text-lg">{numberNotCompleted}</span> of
          them are
          <strong>not</strong> completed
        </p>
      </div>
    </header>
  );
};

export default Header;
