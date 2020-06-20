import React from 'react'
import style from './TodoList.module.css'
import {IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {InputProps as StandardInputProps} from "@material-ui/core/Input/Input";

type OwnPropsType = {
    title: string
    todoListId: string
    changeTitleTC: (todoListId: string, currentTitle: string)=>void
    deleteTodolist: ()=>void
}

class TodoListTitle extends React.Component <OwnPropsType>{

    state = {
        editMode: false,
        currentTitle: this.props.title
    }

    activeMode =() =>{

        this.setState({editMode: true})

    }

// .then(res=>{
//     if(res.data.resultCode === 0) {
//     let task = res.data.data.item;
//     this.props.changeTask(task);
    deactivateEditMode = ()=>{
        this.setState({editMode:false})
        this.props.changeTitleTC(this.props.todoListId, this.state.currentTitle)

    }
    titleChanged = (e: any) =>{
        this.setState({currentTitle: e.currentTarget.value})
    }
    render() {
        return (
            <>
               { !this.state.editMode?
                   <span className={style.title}>
            <h3 onClick={this.activeMode} className="todoList-header__title">{this.props.title}</h3>
                       <IconButton onClick={this.props.deleteTodolist}>
                           <Delete />
                       </IconButton>
                   </span>:
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