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
    onShowFiltersClick = () => {this.setState({isHidden:true})};
    onHideFiltersClick = () => {this.setState({isHidden:false})};


    render = () => {
    let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
    let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
    let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";


        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <>
                    <Button variant={this.props.filterValue === "All" ? "outlined" : "text"}
                            color='default'
                            onClick={this.onAllFilterClick}>All</Button>
                    <Button variant={this.props.filterValue === "Completed" ? "outlined" : "text"}
                            color='default'
                            onClick={this.onCompletedFilterClick}>Completed</Button>
                    <Button variant={this.props.filterValue === "Active" ? "outlined" : "text"}
                            color='default'
                            onClick={this.onActiveFilterClick}>Active</Button>
                </>}


                {!this.state.isHidden && <span onClick={() =>{this.setState({isHidden: true})}}>Hide</span>}
                {this.state.isHidden && <span onClick={() =>{this.setState({isHidden: false})}}>Show</span>}
            </div>

        );
    }
}

export default TodoListFooter;

