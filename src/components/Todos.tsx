import { useTodos } from "../store/todo"
import {useSearchParams} from 'react-router-dom';

const Todos = () => {
  const {todos, toggleToDoAsCompleted, handleDeleteToDo, handleEditToDo} = useTodos();

  const [searchParams] = useSearchParams();

  const todosData = searchParams.get("todos");

  let filterData = todos;   

  if(todosData === "active"){
    filterData = filterData.filter((task) => !task.completed)
  }

  if(todosData === "completed"){
    filterData = filterData.filter((task) => task.completed)
  }

  return (
        <ul className="main-task">
            {
                filterData.map((todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`} 
                            checked={todo.completed}
                            onChange={() => toggleToDoAsCompleted(todo.id)}
                        />
                        <label htmlFor={`todo-${todo.id}`}> {todo.task} </label>
                        {
                            todo.completed && (
                            <button type="button" onClick={() => handleDeleteToDo(todo.id)}>Delete</button>
                            )
                        }

                        {
                          !todo.completed && (
                            <button type="button" onClick={() => handleEditToDo(todo.id)}>Edit</button>
                          )
                        }
                 </li>
                })  
            }
        </ul>
  )
}

export default Todos