import React from 'react';


class TodoListTask extends React.Component   {
    onIsDoneChanged =(e) =>{
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
        // alert(e.currentTarget.checked);

    }

    render = () => {

        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input type="checkbox"
                           checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}
                    />
                    <span>{this.props.title} {this.props.priority}</span>
                </div>
            </div>

        );
    }
}

export default TodoListTask;

