import React from 'react'
import style from './TodoList.module.css'
import {IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type OwnPropsType = {
    title: string
    todoListId: string
    changeTitleTC: (todoListId: string, currentTitle: string) => void
    deleteTodolist: () => void
}
interface stateType {
    editMode: boolean
    currentTitle: string
}

class TodoListTitle extends React.Component <OwnPropsType> {

    state: stateType = {
        editMode: false,
        currentTitle: this.props.title
    };

    activeMode = () => {

        this.setState({editMode: true})

    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitleTC(this.props.todoListId, this.state.currentTitle)

    };
    titleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentTitle: e.currentTarget.value})
    };

    render() {
        return (
            <>
                {!this.state.editMode ?
                    <span className={style.title}>
            <h3 onClick={this.activeMode} className="todoList-header__title">{this.props.title}</h3>
                       <IconButton onClick={this.props.deleteTodolist}>
                           <Delete/>
                       </IconButton>
                   </span> :
                    <TextField
                        variant='outlined'
                        onBlur={this.deactivateEditMode}
                        autoFocus={true}
                        value={this.state.currentTitle}
                        onChange={this.titleChanged}
                    />}
            </>
        )
    }
}

export default TodoListTitle