import React from 'react';
import Button from "./Button";



class TodoListFooter extends React.Component  {

    render = () => {
    let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
    let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
    let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";


        return (
            <div className="todoList-footer">
                <Button title={'All'}
                        btnClass={classForAll}
                        onClickFn={() => {this.props.changeFilter('All')}}
                />
                <Button title={'Completed'}
                        btnClass={classForCompleted}
                        onClickFn={() => {this.props.changeFilter('Completed')}}
                />
                <Button title={'Active'}
                        btnClass={classForActive}
                        onClickFn={() => {this.props.changeFilter('Active')}}
                />
                {/*<button onClick={ () => {this.props.changeFilter('All')}} className={classForAll}>All</button>*/}
                {/*<button onClick={ () => {this.props.changeFilter('Completed')}} className={classForCompleted}>Completed</button>*/}
                {/*<button onClick={ () => {this.props.changeFilter('Active')}} className={classForActive}>Active</button>*/}
            </div>

        );
    }
}

export default TodoListFooter;

