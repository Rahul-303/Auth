import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../server";

interface Todo {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

type TodoArray = Todo[];

const Todos = () => {
  const [todos, setTodos] = useState<TodoArray>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = async (e: any) => {
    e.preventDefault();
    try {
      const todo = {
        title,
        description,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.post(`${server}/todo/create`, todo, config);
      setTodos(prevTodos => [...prevTodos, res.data]);
      setTitle('');
      setDescription('')
    } catch (err) {
      console.log(err);
    }
  };

  const markDone = async(todoId : string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    };
    try{
      const res = await axios.patch(`${server}/todo/mark/${todoId}`,{done : true}, config)
      setTodos(todos.map(todo => todo._id === res.data._id ? res.data : todo))
    }catch(err){
      console.log(err);
    }
  }

  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(`${server}/todo/gettodos`, config);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={addTodo}>Add Todo</button>

      {todos.map((todo) => (
        <div key={todo._id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={() => markDone(todo._id)}>
            {todo.done ? "Done" : "Mark as Done"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
