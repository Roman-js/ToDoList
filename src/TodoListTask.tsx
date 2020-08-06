import React from 'react';
import {connect} from "react-redux";
import {deleteTaskTC} from "./reducer";
import {TaskType, TodoListType} from "./types/entities";
import {AppStateType} from "./store";
import {Checkbox, IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type StateType = {
    editMode: boolean
    title: string
}
type OwnPropsType = {
    task: TaskType
    title: string
    isDone: number //string
    priority: string
    changeStatus: (task: string, status: number) => void
    changeTitle: (taskId: string, checked: string) => void
    todoListId: string
}


class TodoListTask extends React.Component <PropsType, StateType> {
    state: StateType = {
        editMode: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };
    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task.id, this.state.title)
    };

    onIsDoneChanged = (e: React.FormEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status)

    };
    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    };
    deleteTask = () => {
        this.props.deleteTaskTC(this.props.todoListId, this.props.task.id)
    };
    render = () => {
        let classForTask = (this.props.task.status === 2)
            ? "todoList-task done"
            : "todoList-task";
        return (
            <div className="todoList-tasks">
                <div className={classForTask}>
                    <Checkbox color='primary'
                           checked={this.props.task.status === 2 ? true : false}
                           onChange={this.onIsDoneChanged}
                    />
                    {this.state.editMode ? <TextField
                            variant='outlined'
                            value={this.state.title}
                            autoFocus={true}
                            onChange={this.onTitleChanged}
                            onBlur={this.deactivateEditMode}/> :
                        <span onClick={this.activateEditMode}>
                          {this.props.task.title}
                    </span>
                    }
                    <IconButton onClick={this.deleteTask}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

type MapStateToPropsType = {
    todolists: TodoListType[]

}
type MapDispatchPropsType = {
    deleteTaskTC: (todolistId: string, taskId: string) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {

    return {
        todolists: state.todolist.todolists
    }
};
type PropsType = OwnPropsType & MapDispatchPropsType & MapStateToPropsType


const connectedTodoListTask = connect(mapStateToProps, {deleteTaskTC})(TodoListTask)

export default connectedTodoListTask;

