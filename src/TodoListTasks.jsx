import React from 'react';
import './TodoListTask'
import TodoListTask from "./TodoListTask";


class TodoListTasks extends React.Component   {
    render = () => {

        let tasksEls = this.props.tasks.map((t) => {
             return <TodoListTask task = {t}
                                  title={t.title}
                                   isDone={t.isDone}
                                   priority={t.priority}
                 changeStatus={this.props.changeStatus}
             />
        });


        return (
            <div className="todoList-tasks">

                {tasksEls}

                {/* <TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>
                <TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>
                <TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>
                <TodoListTask title={this.props.tasks[3].title} isDone={this.props.tasks[3].isDone}/>
                */}

            </div>
        );
    }
}

export default TodoListTasks;

