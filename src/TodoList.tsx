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

import { TaskType} from "./types/entities";
import {Grid, Paper} from "@material-ui/core";


class TodoList extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [
            // {id: 0, title: 'CSS', isDone: true, priority: 'high'},
            // {id: 1,title: 'JS', isDone: true, priority: 'low'},
            // {id: 2,title: 'HTML', isDone: false, priority: 'high'},
            // {id: 3,title: 'React', isDone: false, priority: 'low'},
            // {id: 4,title: 'Angular', isDone: true, priority: 'high'},
        ],
        filterValue: 'All'
    };

    // saveState = () => {
    //     let stateAsString = JSON.stringify(this.state)
    //     localStorage.setItem(`our-state - ${this.props.id}`, stateAsString)
    // }

    // _restoreState = () => {
    //     let state = this.state
    //     let stateAsString = localStorage.getItem(`our-state - ${this.props.id}`);
    //     if (stateAsString) {
    //         state = JSON.parse(stateAsString)
    //     }
    //     // callback add correct id
    //     //setState ассинхронный
    //     this.setState(state, () => {
    //         this.state.tasks.forEach(t => {
    //             if (t.id > this.nextTaskId) {
    //                 this.nextTaskId = t.id + 1;
    //             }
    //         })
    //     })
    // }
    restoreState=()=> {

        this.props.loadTasksThunk(this.props.id)
        // api.getTasks(this.props.id)
        //     .then(res => {
        //         let allTasks = res.data.items;
        //         this.props.getTasks(allTasks, this.props.id)
        //     })
    }

    deleteTodolist = ()=>{
        this.props.deleteTodolistTC(this.props.id)
        // api.deleteTodolist(this.props.id)
        //     .then(res=>{
        //
        //         if(res.data.resultCode === 0) this.props.deleteTodolist(this.props.id);
        //     })
    }



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
        let {tasks = []} = this.props
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
                                    //changeTitleTodolist={this.props.changeTitleTodolist}
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
     changeTitleTodolist, loadTasksThunk, deleteTodolistTC, changeTaskTC, addTaskTC, changeTitleTC})(TodoList)

export default ConnectedTodoList;


