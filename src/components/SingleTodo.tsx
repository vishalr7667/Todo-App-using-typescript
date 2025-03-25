import React, { useState } from 'react'
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete} from 'react-icons/ai';
import { MdDone, MdCancel } from 'react-icons/md';

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const SingleTodo: React.FC<Props> = ({todo,  setTodos}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const handleEdit = () => {
        
        setEdit((prevEdit) => !prevEdit);
    }

    const handleUpdate = (e: React.FormEvent, id: number) => {
        
        e.preventDefault();
        setTodos(prevTodo => {
          const updatedTodo = prevTodo.map((todo) => todo.id === id ? {...todo, todo: editTodo} : todo)
          localStorage.setItem("todos", JSON.stringify(updatedTodo));
          return updatedTodo;
        });

        setEdit(false);
    }

    const handleDelete = (id: number) => {
        console.log("deleting todo");
        setTodos(prevTodos => {
            const updatedTodo: Todo[] =  prevTodos.filter((todo) => todo.id !== id)

            if (updatedTodo.length === 0) {
                localStorage.removeItem("todos")
            }else{
                localStorage.setItem("todos", JSON.stringify(updatedTodo))
            }
            return updatedTodo;
        });
    }

    const handleComplete = (id: number) => {
        setTodos(prevTodo => {
           const updatedTodo = prevTodo.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo)
           console.log("handleComplete",updatedTodo);
           
           localStorage.setItem("todos", JSON.stringify(updatedTodo));
           return updatedTodo;
        }
        )
    }

    // useEffect(() => { 
    //     localStorage.setItem("todos", JSON.stringify(todos));
    //     console.log("todos value in single todo", todos);
    // }, [todos]); 

  return (

    <div className='todos__single'>
        {edit ? (
            <form className='edit_form' onSubmit={(e) => handleUpdate(e, todo.id)}>
            <input type="text" className='todos__single--input' value={editTodo} onChange={(e) => {setEditTodo(e.target.value)}}/>
            <button type='submit' className='todos__single--button'>Update</button>
            </form>
        ):
        (
            <>
                <span className='todos__single--text'>{todo.todo}</span>
                <div>
                    <span onClick={() => {handleEdit()}} className='icon'>
                        <AiFillEdit />
                    </span>
                    <span onClick={() => {handleDelete(todo.id)}} className='icon'>
                        <AiFillDelete />
                    </span>
                    <span onClick={() => {handleComplete(todo.id)}} className='icon'>
                        { todo.isDone ? <MdCancel /> : <MdDone />}
                    </span>
                </div>
            </>
        )
        }
        
    </div>
  )
}

export default SingleTodo   