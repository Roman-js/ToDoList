import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    tasks = [
        {title:'CSS' , isDone: true, priority: 'high' },
        {title: 'JS' , isDone: true, priority: 'low' },
        {title: 'HTML', isDone: false, priority: 'high'},
        {title: 'React', isDone: false, priority: 'low'},
        {title: 'Angular', isDone: true, priority: 'high'},
    ];
    filterValue = 'All';
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks={this.tasks} />
                    <TodoListFooter filterValue={this.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

