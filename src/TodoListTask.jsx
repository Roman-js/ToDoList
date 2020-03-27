import React from 'react';
import {connect} from "react-redux";
import {DELETE_TASK, deleteTask} from "./reducer";
import * as axios from "axios";
import {api} from "./api";



class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () =>{
        this.setState({editMode: true})
    }
    deactivateEditMode = () =>{
        this.setState({editMode: false})
        this.props.changeTitle(this.props.task.id, this.state.title)
    }

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
        // alert(e.currentTarget.checked);
    };
    onTitleChanged = (e) =>{
        this.setState({title: e.currentTarget.value})
      //  this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };
    deleteTask = () =>{
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todoListId}/tasks/${this.props.task.id}`,
        //     {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}})
            api.deleteTask(this.props.todoListId, this.props.task.id)
            .then(res=>{
                if(res.data.resultCode === 0) this.props.deleteTask(this.props.task.id, this.props.todoListId)})

    }
    render = () => {
        let classForTask = (this.props.task.status === 2)
            ? "todoList-task done"
            : "todoList-task";
        return (
            <div className="todoList-tasks">
                <div className={classForTask}>
                    <input type="checkbox"
                           checked={this.props.task.status === 2 ? true: false}
                           onChange={this.onIsDoneChanged}
                    />
                    {this.state.editMode? <input value={this.state.title}
                                                 autoFocus={true}
                                                 onChange={this.onTitleChanged}
                                                 onBlur={this.deactivateEditMode}/>:
                    <span onClick={this.activateEditMode}>
                         {this.props.task.id} {this.props.task.title} {this.props.priority}
                    </span>
               }
                    <button onClick={this.deleteTask}>X</button>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) =>{
    return {
        todolists: state.todolists,
    }
};

// const mapDispatchToProps=(dispatch)=>{
//     //debugger;
//     return{
//     deleteTask : (taskId,todoListId)=>{
//
//     dispatch(deleteTaskAC(taskId,todoListId))}}
// };

const connectedTodoListTask = connect(mapStateToProps, {deleteTask})(TodoListTask)

export default connectedTodoListTask;

