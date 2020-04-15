import React from 'react';
import {connect} from "react-redux";
import {DELETE_TASK, deleteTask, deleteTaskTC} from "./reducer";
import {TaskType, TodoListType} from "./types/entities";
import {AppStateType} from "./store";

type StateType = {
    editMode: boolean
    title: string
}
type OwnPropsType = {
    task: TaskType
    title: string
    isDone: number //string
    priority: string
    changeStatus:(task: string, status: number)=>void
    changeTitle: (taskId: string, checked: string) => void
    todoListId: string
}


class TodoListTask extends React.Component <PropsType, StateType> {
    state: StateType = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.changeTitle(this.props.task.id, this.state.title)
    }

    onIsDoneChanged = (e: React.FormEvent<HTMLInputElement>) => {
        debugger
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status)
        // alert(e.currentTarget.checked);
    };
    onTitleChanged = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
        //  this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };
    deleteTask = () => {
        this.props.deleteTaskTC(this.props.todoListId, this.props.task.id)
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todoListId}/tasks/${this.props.task.id}`,
        //     {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}})


        //     api.deleteTask(this.props.todoListId, this.props.task.id)
        //     .then(res=>{
        //         if(res.data.resultCode === 0) this.props.deleteTask(this.props.task.id, this.props.todoListId)})

    }
    render = () => {
        let classForTask = (this.props.task.status === 2)
            ? "todoList-task done"
            : "todoList-task";
        return (
            <div className="todoList-tasks">
                <div className={classForTask}>
                    <input type="checkbox"
                           checked={this.props.task.status === 2 ? true : false}
                           onChange={this.onIsDoneChanged}
                    />
                    {this.state.editMode ? <input value={this.state.title}
                                                  autoFocus={true}
                                                  onChange={this.onTitleChanged}
                                                  onBlur={this.deactivateEditMode}/> :
                        <span onClick={this.activateEditMode}>
                          {this.props.task.title} {this.props.priority}
                    </span>
                    }
                    <button onClick={this.deleteTask}>X</button>
                </div>
            </div>
        );
    }
}

type MapStateToPropsType = {
    todolists: TodoListType[]

}
type MapDispatchPropsType = {
    deleteTaskTC: (todolistId: string, taskId: string)=>void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {

    return {
        todolists: state.todolist.todolists
    }
};
type PropsType = OwnPropsType & MapDispatchPropsType & MapStateToPropsType


const connectedTodoListTask = connect(mapStateToProps, {deleteTaskTC})(TodoListTask)

export default connectedTodoListTask;

