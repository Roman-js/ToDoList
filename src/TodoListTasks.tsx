import React from 'react';
import './TodoListTask'
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entities";

type OwnPropsType = {
    tasks: TaskType[]
    changeStatus: (task: string, status: number)=>void
    changeTitle: (taskId: string, checked: string)=>void
    todoListId: string

}

class TodoListTasks extends React.Component<OwnPropsType> {


    render = () => {

        let tasksEls = this.props.tasks.map((t) => {
            return <TodoListTask task={t}
                                 title={t.title}
                                 isDone={t.status}
                                 priority={t.priority}
                                 changeStatus={this.props.changeStatus}
                                 changeTitle={this.props.changeTitle}
                                 todoListId={this.props.todoListId}

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

