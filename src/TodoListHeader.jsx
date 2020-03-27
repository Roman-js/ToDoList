import React from 'react'
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";

class TodoListHeader extends React.Component {
    render() {
        return (
            <>
                <TodoListTitle title={this.props.title}
                               deleteTodolist={this.props.deleteTodolist}
                               todoListId={this.props.todoListId}
                               changeTitleTodolist={this.props.changeTitleTodolist}/>
                <AddNewItemForm addItem={this.props.addItem}/>
            </>
        )
    }
}

export default TodoListHeader