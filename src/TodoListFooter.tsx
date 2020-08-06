import React from 'react';
import {Button} from "@material-ui/core";


type StateType = {
    isHidden: boolean
}
type OwnPropsType = {
    changeFilter: (incoming:string)=>void
    filterValue: string
}

class TodoListFooter extends React.Component<OwnPropsType>  {



    state: StateType = {
        isHidden: false
    };

    onAllFilterClick = () => {this.props.changeFilter('All')};
    onCompletedFilterClick = () => {this.props.changeFilter('Completed')};
    onActiveFilterClick = () => {this.props.changeFilter('Active')};

    render = () => {
        
        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <>
                    <Button variant={this.props.filterValue === "All" ? "contained" : "text"}
                            color={this.props.filterValue === 'All' ? 'primary' : "default"}
                            onClick={this.onAllFilterClick}>All</Button>
                    <Button variant={this.props.filterValue === "Completed" ? "contained" : "text"}
                            color={this.props.filterValue === 'Completed' ? 'primary' : "default"}
                            onClick={this.onCompletedFilterClick}>Completed</Button>
                    <Button variant={this.props.filterValue === "Active" ? "contained" : "text"}
                            color={this.props.filterValue === 'Active' ? 'primary' : "default"}
                            onClick={this.onActiveFilterClick}>Active</Button>
                </>}


                {!this.state.isHidden && <span onClick={() =>{this.setState({isHidden: true})}}>Hide</span>}
                {this.state.isHidden && <span onClick={() =>{this.setState({isHidden: false})}}>Show</span>}
            </div>

        );
    }
}

export default TodoListFooter;

