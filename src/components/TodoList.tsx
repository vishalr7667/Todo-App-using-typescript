import React from 'react'
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import {Draggable, Droppable} from '@hello-pangea/dnd'

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    isCompleted: boolean;
}

const TodoList: React.FC<Props> = ({todos, setTodos, isCompleted}) => {
  
  return (
    // <div className='todos'>
    //     {todos.filter(todo => todo.isDone === isCompleted)
    //     .map((todo) => (
    //         <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
    //     ))}
    // </div>
    <Droppable droppableId={isCompleted ? "completedList" : "activeList"}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="todos">
           <p className='title'> {isCompleted ? "Completed List" : "Active List"} </p>
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <SingleTodo todo={todo} todos={todos} setTodos={setTodos} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default TodoList





