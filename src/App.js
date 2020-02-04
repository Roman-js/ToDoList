import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {


    state = {
        tasks: [
            {title: 'CSS', isDone: true, priority: 'high'},
            {title: 'JS', isDone: true, priority: 'low'},
            {title: 'HTML', isDone: false, priority: 'high'},
            {title: 'React', isDone: false, priority: 'low'},
            {title: 'Angular', isDone: true, priority: 'high'},
        ],
        filterValue: 'All'
    };

    changeStatus = (task, isDone) => {
        let newTask = this.state.tasks.map(t => {
            if (t != task) {
                return t
            } else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({tasks: newTask})
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    addTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            isDone: false,
            priority: 'low'
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks})

    };
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
                            if (this.state.filterValue === 'All') {
                                return true;
                            }
                            if (this.state.filterValue === 'Active') {
                                return t.isDone === false;
                            }
                            if (this.state.filterValue === 'Completed') {
                                return t.isDone === true;
                            }
                        })}/>
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>

        );
    }
}

export default App;

