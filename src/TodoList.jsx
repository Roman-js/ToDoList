import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import TodoListHeader from "./TodoListHeader";
import {connect} from "react-redux";
import {
    ADD_TASK,
    addTask,
    CHANGE_TASK,
    changeTask,
    changeTitleTodolist,
    DELETE_TODOLIST,
    deleteTodolist,
    setTasks
} from "./reducer";
import * as axios from "axios";
import {api} from "./api";


class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState()
    }

    nextTaskId = 0;
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

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem(`our-state - ${this.props.id}`, stateAsString)
    }

    _restoreState = () => {
        let state = this.state
        let stateAsString = localStorage.getItem(`our-state - ${this.props.id}`);
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }
        // callback add correct id
        //setState ассинхронный
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id > this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        })
    }
    restoreState=()=> {

        api.restoreTasks(this.props.id)
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id)
            })
    }

    deleteTodolist = ()=>{

        api.deleteTodolist(this.props.id)
            .then(res=>{

                if(res.data.resultCode === 0) this.props.deleteTodolist(this.props.id);
            })
    }



    changeTask = (task, status) => {
       // debugger
        let todoListId = this.props.id;
        let updateTask = {...task, status: status ? 2 : 0};
        debugger
        api.putTask(todoListId, task.id, updateTask )
            .then(res=>{
                if(res.data.resultCode === 0) {
                    let task = res.data.data.item;
                    this.props.changeTask(task);

                };
            })


        //

    }

    changeStatus = (task, status) => {
        this.changeTask(task, {status: status})

    };

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})

    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };


    addTask = (newTitle) => {

         let todolistId = this.props.id;
        api.createTask(newTitle, this.props.id)
            .then(res=>{
                if(res.data.resultCode === 0) this.props.addTask(res.data.data.item, todolistId);
            })



    };
    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div>
                    <TodoListHeader addItem={this.addTask}
                                    title={this.props.title}
                                    deleteTodolist={this.deleteTodolist}
                                    todoListId={this.props.id}
                                    changeTitleTodolist={this.props.changeTitleTodolist}/>
                    </div>
                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        tasks={tasks.filter(t => {
                            if (this.state.filterValue === 'All') {
                                return true;
                            }
                            if (this.state.filterValue === 'Active') {
                                return t.isDone === false;
                            }
                            if (this.state.filterValue === 'Completed') {
                                return t.isDone === true;
                            }
                        })}
                        todoListId={this.props.id}/>
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>

        );
    }
}
// const mapDispatchToProps = (dispatch)=> {
//     return {
//         addTask: (newTask, todoListId) => {
//
//             dispatch(addTaskAC(newTask, todoListId))
//         },
//
//         changeTask: (task)=>{
//
//             dispatch(changeTask(task))
//         },
//
//         deleteTodoList: (todoListId)=>{
//
//             dispatch(deleteTodolist(todoListId))
//         },
//         setTasks: ( tasks, todolistId)=>{
//             dispatch(setTasks(tasks, todolistId))
//         },
//        changeTitleTodolist: (todolistId, newTitle)=>{
//             debugger
//             dispatch(changeTitleTodolistAC(todolistId, newTitle))
//        }
//     }
// }

const ConnectedTodoList = connect(null, {addTask, changeTask, deleteTodolist, setTasks, changeTitleTodolist})(TodoList)

export default ConnectedTodoList;


