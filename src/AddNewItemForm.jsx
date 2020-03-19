import React from 'react';
import TodoListTitle from "./TodoListTitle";


class AddNewItemForm extends React.Component {

    state={
        error: false,
        title: ''
    };


      //  newTaskTitleRef = React.createRef();

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
    onTitleChanged = (e) =>{
        let newTitle = e.currentTarget.value;
        this.setState({
            error: false,
            title: newTitle})
    };
    onAddItemEnterPress = (e) =>{
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

export default AddNewItemForm;

