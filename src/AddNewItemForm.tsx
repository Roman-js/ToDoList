import React from 'react';
import TodoListTitle from "./TodoListTitle";



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
    onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>{
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
    let classForInput = (this.state.error)? 'error' : '';

        return (


                <div className="NewItemForm">
                    <input
                        value={this.state.title}
                        onChange={this.onTitleChanged}
                        className={classForInput}
                        type="text"
                        placeholder="New Item name"
                        onKeyPress={this.onAddItemEnterPress}/>
                    <button onClick={this.onAddItemClick}>Add</button>
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