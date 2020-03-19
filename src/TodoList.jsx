import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import TodoListHeader from "./TodoListHeader";
import {connect} from "react-redux";
import {ADD_TASK, addTaskAC, CHANGE_TASK, changeTaskAC, DELETE_TODOLIST, deleteTodolistAC, setTasksAC} from "./reducer";
import * as axios from "axios";


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

        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}})
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id)
            })
    }

    deleteTodolist = ()=>{
        debugger
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}})
            .then(res=>{

                if(res.data.resultCode === 0) this.props.deleteTodoList(this.props.id);
            })
    }



    changeTask = (task, status) => {
       // debugger
        let todoListId = this.props.id;
        let updateTask = {...task, status: status ? 2 : 0};
        debugger
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${task.id}`,
          updateTask,
            {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}}
            )
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
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,{title:newTitle},
            {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}})
            .then(res=>{
                if(res.data.resultCode === 0) this.props.addTask(res.data.data.item, todolistId);
            })
        // let newTask = {
        //     id: this.nextTaskId,
        //     title: newTitle,
        //     isDone: false,
        //     priority: 'low',
        //
        // };
        // this.props.addTask(newTask, this.props.id);
        // this.nextTaskId++;


    };
    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div>
                    <TodoListHeader addItem={this.addTask}  title={this.props.title} deleteTodolist={this.deleteTodolist}/>
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
const mapDispatchToProps = (dispatch)=> {
    return {
        addTask: (newTask, todoListId) => {

            dispatch(addTaskAC(newTask, todoListId))
        },

        changeTask: (task)=>{

            dispatch(changeTaskAC(task))
        },

        deleteTodoList: (todoListId)=>{

            dispatch(deleteTodolistAC(todoListId))
        },
        setTasks: ( tasks, todolistId)=>{
            dispatch(setTasksAC(tasks, todolistId))
        }
    }
}

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList)

export default ConnectedTodoList;


