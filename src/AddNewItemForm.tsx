import React from 'react';
import TodoListTitle from "./TodoListTitle";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";





class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        error: false,
        title: ''
    };



    onAddItemClick = () => {
       // let newTitle = this.newTaskTitleRef.current.value;
        let newTitle = this.state.title;
        this.setState({title:''})
        if(newTitle === ''){
            this.setState({error: true})
        }
        else{
            this.setState({error: false})
            this.props.addItem(newTitle);
        }


    };
    onTitleChanged = (e: any) =>{
        let newTitle = e.currentTarget.value;
        this.setState({
            error: false,
            title: newTitle})
    };
    onAddItemEnterPress = (e: any) =>{
        if(e.key === 'Enter'){
            this.onAddItemClick();
        }
    }
    render() {
    let error = this.state.error? 'This is required' : '';

        return (


                <div className="NewItemForm">
                    <TextField
                        variant='outlined'
                        value={this.state.title}
                        onChange={this.onTitleChanged}
                        placeholder="New Item name"
                        error={this.state.error}
                        helperText={error}
                        onKeyPress={this.onAddItemEnterPress}/>
                    {/*<Button variant='contained' color='primary' onClick={this.onAddItemClick}>Add</Button>*/}
                    <IconButton color='primary' onClick={this.onAddItemClick}>
                        <AddBox />
                    </IconButton>
                </div>


        );

    }
}


type StateType = {
    error: boolean
    title: string
}
type OwnPropsType = {
    addItem: (newTitle: string)=>void
}


export default AddNewItemForm;