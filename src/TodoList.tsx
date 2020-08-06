import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListHeader from "./TodoListHeader";
import {connect} from "react-redux";
import {
     addTaskTC, changeTaskTC, changeTitleTC,
    changeTitleTodolist, deleteTodolistTC, loadTasksThunk,
} from "./reducer";

import {TaskType} from "./types/entities";
import {Grid, Paper} from "@material-ui/core";

class TodoList extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.restoreState()
    }

    state: StateType = {
        tasks: [],
        filterValue: 'All'
    };


    restoreState=()=> {
        this.props.loadTasksThunk(this.props.id)
    };

    deleteTodolist = ()=>{
        this.props.deleteTodolistTC(this.props.id)
    };

    changeTask = (taskId: string, obj: object) => {


        let changedTask = this.props.tasks.find(task => {

            return task.id === taskId
        });
        let task = {...changedTask, ...obj} as TaskType;
        this.props.changeTaskTC(this.props.id, taskId, task, obj);
    };


    changeStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status}) //{status: status}
    };

    changeTitle = (taskId: string, newTitle: string) => {

        this.changeTask(taskId, {title:newTitle})

    };

    changeFilter = (newFilterValue: string) => {
        this.setState({filterValue: newFilterValue})
    };


    addTask = (newTitle: string) => {
        this.props.addTaskTC(newTitle, this.props.id)

    };
    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="App">
                <div className="todoList">

                        <Grid item >
                            <Paper style={{margin: '10px', padding: '10px'}}>
                    <TodoListHeader addItem={this.addTask}
                                    title={this.props.title}
                                    deleteTodolist={this.deleteTodolist}
                                    todoListId={this.props.id}
                                    changeTitleTC={this.props.changeTitleTC}
                        />

                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        tasks={tasks.filter(t => {
                            if (this.state.filterValue === 'All') {
                                return true;
                            }
                            if (this.state.filterValue === 'Active') {
                                return t.status === 0;
                            }
                            if (this.state.filterValue === 'Completed') {
                                return t.status === 2;
                            }
                        })}
                        todoListId={this.props.id}/>

                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                            </Paper>
                        </Grid>
                </div>
            </div>

        );
    }
}

type StateType = {
    tasks: TaskType[]
    filterValue: string
}
type MapDispatchToPropsType = {

    loadTasksThunk: (todlilistId: string)=>void
    deleteTodolistTC: (todlilistId: string)=>void
    addTaskTC: (newTitle: string, todolistId: string)=>void
    changeTitleTodolist: (todoListId: string, newTitle: string)=>void // delete
    changeTitleTC: (todoListId: string, newTitle: string)=>void
    changeTaskTC: (todoListId: string, taskId: string, task: TaskType, obj: object)=>void
}


type OwnPropsType = {

    id: string
    title: string
    tasks: TaskType[]
}
type PropsType = MapDispatchToPropsType  & OwnPropsType


const ConnectedTodoList = connect<null, MapDispatchToPropsType,  OwnPropsType>(null, {
     changeTitleTodolist, loadTasksThunk, deleteTodolistTC, changeTaskTC, addTaskTC, changeTitleTC})(TodoList);

export default ConnectedTodoList;


