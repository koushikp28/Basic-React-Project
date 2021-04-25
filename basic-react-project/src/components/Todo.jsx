import {React, useState} from 'react'

function Todo(props) {
    const { data, id, mode } = props
    const [ todo, setTodo ] = useState(data || "")

    const addTodo = () => {
        if(props.handleAddTodo && typeof props.handleAddTodo === "function"){
            props.handleAddTodo(todo)
            setTodo("")
        } 
    }

    const deleteTodo = () => {
        if(props.handleDeleteTodo && typeof props.handleDeleteTodo === "function"){
            props.handleDeleteTodo(id)
        }
    }

    const editTodo = () => {
        if(props.handleUpdateTodo && typeof props.handleUpdateTodo === "function"){
            props.handleUpdateTodo(id)
        }
    }

    const saveTodo = () => {
        if(props.handleSaveTodo && typeof props.handleSaveTodo === "function"){
            props.handleSaveTodo(id, todo)
        }
    }

    const cancelTodo = () => {
        if(props.handleUpdateTodo && typeof props.handleUpdateTodo === "function"){
            props.handleUpdateTodo(null)
        }
    }

    return (
        <div className="todo">
            { mode === "create" || mode === "update" ? <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/> : null}
            
            { mode === "create" ? <input type="button" onClick={addTodo} value="Add"/> : null}
            
            { mode === "read" ? <span className="data" onDoubleClick={editTodo}>{data}</span> : null}

            { mode === "read" ? <input type="button" onClick={deleteTodo} value="Delete"/> : null}

            { mode === "update" ? <input type="button" onClick={saveTodo} value="Save"/> : null}

            { mode === "update" ? <input type="button" onClick={cancelTodo} value="Cancel"/> : null}
        </div>
    )
}

export default Todo
