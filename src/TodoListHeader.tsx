import React from 'react'
import AddNewItemForm from "./AddNewItemForm";
import TodoListTitle from "./TodoListTitle";

type OwnPropsType = {
    title: string
    deleteTodolist: ()=>void
    todoListId: string
    changeTitleTC: (todoListId: string, newTitle: string)=>void
    addItem: (newTitle: string)=>void
}

class TodoListHeader extends React.Component<OwnPropsType> {
    render() {
        return (
            <>
                <TodoListTitle title={this.props.title}
                               deleteTodolist={this.props.deleteTodolist}
                               todoListId={this.props.todoListId}
                               changeTitleTC={this.props.changeTitleTC}/>
                <AddNewItemForm addItem={this.props.addItem}/>
            </>
        )
    }
}

export default TodoListHeader