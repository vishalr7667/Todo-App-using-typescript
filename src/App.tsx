import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
const  App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {    
    const todosStorage = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(todosStorage);
    console.log("todos value in app file", todosStorage)
  }, []);


  const handleAdd = (e: React.FormEvent) => {
    console.log("adding todo");
    e.preventDefault();
    if(todo.trim()){
      setTodos((prevTodos) => [...prevTodos, {id: Date.now(), todo, isDone: false}]);
      localStorage.setItem("todos", JSON.stringify([...todos, {id: Date.now(), todo, isDone: false}]));
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Clone the todos state to prevent mutation
    let activeTodos = todos.filter(todo => !todo.isDone);
    let completedTodos = todos.filter(todo => todo.isDone);

    let movedItem;

    // Remove from source list
    if (result.source.droppableId === "activeList") {
        [movedItem] = activeTodos.splice(result.source.index, 1);
    } else {
        [movedItem] = completedTodos.splice(result.source.index, 1);
    }

    // Toggle the isDone status
    movedItem.isDone = !movedItem.isDone;

    // Add to destination list
    if (result.destination.droppableId === "activeList") {
        activeTodos.splice(result.destination.index, 0, movedItem);
    } else {
        completedTodos.splice(result.destination.index, 0, movedItem);
    }

    // **🔥 Correct way to update state & localStorage**
    setTodos(() => {
        const updatedTodos = [...activeTodos, ...completedTodos];
        // ✅ Update localStorage AFTER state is updated
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
    });
  };

  return (
    <>
      <div className="App">
        <span className="heading">Taskify</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        {/* <div className="todoListWrapper">
          <TodoList todos={todos} setTodos={setTodos} isCompleted={false} />
          <TodoList todos={todos} setTodos={setTodos} isCompleted={true} />
        </div> */}
          <div className="todoListWrapper">
            <DragDropContext onDragEnd={onDragEnd}>
                <TodoList todos={todos.filter(todo => !todo.isDone)} setTodos={setTodos} isCompleted={false} />
                <TodoList todos={todos.filter(todo => todo.isDone)} setTodos={setTodos} isCompleted={true} />
            </DragDropContext>
          </div>
      </div>
    </>
  )
}

export default App
