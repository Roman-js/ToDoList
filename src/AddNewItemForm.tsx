import React from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type StateType = {
    error: boolean
    title: string
}
type OwnPropsType = {
    addItem: (newTitle: string)=>void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        error: false,
        title: ''
    };

    onAddItemClick = () => {
        let newTitle = this.state.title;
        this.setState({title:''});
        if(newTitle === ''){
            this.setState({error: true})
        }
        else{
            this.setState({error: false});
            this.props.addItem(newTitle);
        }
    };
    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let newTitle = e.currentTarget.value;
        this.setState({
            error: false,
            title: newTitle})
    };
    onAddItemEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) =>{
        if(e.key === 'Enter'){
            this.onAddItemClick();
        }
    };
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
                    <IconButton color='primary' onClick={this.onAddItemClick}>
                        <AddBox />
                    </IconButton>
                </div>
        );

    }
}
export default AddNewItemForm;