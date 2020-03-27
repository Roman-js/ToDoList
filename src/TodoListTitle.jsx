import React from 'react'
import {api} from "./api";

class TodoListTitle extends React.Component {

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

        api.changeTodolistTitle(this.props.todoListId, this.state.currentTitle)
            .then(res=>{
                debugger
                if(res.data.resultCode===0){
                    this.props.changeTitleTodolist(this.props.todoListId, this.state.currentTitle) //     let task = res.data.data.item; //this.state.currentTitle
                }
            })


    }
    titleChanged = (e) =>{
        this.setState({currentTitle: e.currentTarget.value})
    }
    render() {
        return (
            <>
               { !this.state.editMode?
            <h3 onClick={this.activeMode} className="todoList-header__title">{this.props.title}
            <button onClick={this.props.deleteTodolist}>X</button></h3>:
            <input
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