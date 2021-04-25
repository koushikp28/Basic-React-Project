import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList : [],
            todoIdList : [],
            maxId : 0,
            updateId : null
        }
    }

    componentDidMount() {        
        let todoList = this.state.todoList
        let todoIdList = this.state.todoIdList
        let maxId = this.state.maxId

        todoIdList = new Array(maxId).fill(false)

        todoList.map((todo) => {
            todoIdList[todo.id] = true
        })

        this.setState({
            todoIdList,
        })
    }

    handleAddTodo = (data) => {
        let todoList = this.state.todoList

        let newTodo = { data: data }
        newTodo.id = this.getAvailableId()

        todoList.push(newTodo)

        this.setState({
            todoList
        })
    }

    handleDeleteTodo = (id) => {
        let records = this.state.todoList
        let todoIdList = this.state.todoIdList

        let index = records.findIndex((record) => {
            return record.id === id
        })
        records.splice(index, 1)

        todoIdList[id] = false
        this.setState({
            todoList: records,
            todoIdList
        })
    }

    handleUpdateTodo = (id) => {
        this.setState({
            updateId: id
        })
    }

    handleSaveTodo = (id, todo) => {
        let data = {
            id: id,
            data: todo
        }

        let records = this.state.todoList

        let index = records.findIndex((record) => {
            return record.id === id
        })
        records.splice(index, 1, data)

        this.setState({
            todoList: records,
            updateId: null
        })

    }

    getAvailableId = () => {
        let todoIdList = this.state.todoIdList
        let maxId = this.state.maxId

        let availableId = todoIdList.indexOf(false)

        if(availableId === -1){
            maxId++
            availableId = maxId
            todoIdList[maxId] = true
        } else{
            todoIdList[availableId] = true
        }

        this.setState({
            todoIdList,
            maxId
        })

        return availableId
    }

    renderTodos = () => {
        let todos = []
        todos.push(
            <Todo mode="create" key="create" handleAddTodo={this.handleAddTodo} />
        )

        this.state.todoList.forEach(todo => {
            todos.push(
                <Todo 
                    key={todo.id} 
                    id={todo.id}
                    data={todo.data} 
                    mode={this.state.updateId === todo.id ? "update" : "read"}
                    handleDeleteTodo={this.handleDeleteTodo}
                    handleUpdateTodo={this.handleUpdateTodo}
                    handleSaveTodo={this.handleSaveTodo}
                />
            )
        })

        return todos
    }

    render() {
        const { todoList } = this.state

        return (
            <div className="todos">
                <h2> Todos </h2>
                {this.renderTodos()}
            </div>
        );
    }
}

TodoList.propTypes = {

};

export default TodoList;