import React from 'react'
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";

class TodoListHeader extends React.Component {
    render() {
        return (
            <>
                <TodoListTitle title={this.props.title} deleteTodolist={this.props.deleteTodolist}/>
                <AddNewItemForm addItem={this.props.addItem}/>
            </>
        )
    }
}

export default TodoListHeader