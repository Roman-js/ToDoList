import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolist, setTodoList} from "./reducer";
import axios from 'axios'
import {api} from "./api";


class App extends React.Component {

    nextTodoListId = 0;
    state = {
        todolists: [

        ]
    }
    componentDidMount() {
        this.restoreState()
    }


    restoreState = () => {
       api.restoreTodolists()
            .then(res => {
                //debugger
                console.log(res.data);
                this.props.setTodoList(res.data)
            });
    }


    addTodolist = (title) =>{
        debugger
        api.createTodolist(title)
            .then(res=> {
                debugger;
                let todolist = res.data.data.item;
                this.props.addTodolist(todolist)
            })
       //  let newItem ={
       //      title: title,
       //      id:this.nextTodoListId,
       //      tasks: []
       //  };
       // this.props.addTodolist(newItem)
       //  this.nextTodoListId++
    }



    saveState =() =>{

        let stateAsString = JSON.stringify(this.state.todolists)
        localStorage.setItem('todolists', stateAsString)
    }

    _restoreState = () =>{

        let stateAsString = localStorage.getItem('todolists')

        if (stateAsString !== null){
        let todolists = JSON.parse(stateAsString)

        this.setState( {todolists})

        }
    }


    render = () => {
//debugger;
        let todolist = this.props.todolists.map(tl =><TodoList id={tl.id} title={tl.title} tasks={tl.tasks}/>);

        return (

            <>
                <div>
                    <AddNewItemForm addItem={this.addTodolist}/>
                </div>

                <div className="App">
                    {todolist}


                </div>
            </>

        );
    }
}

const mapStateToProps = (state) =>{

    return {
        todolists: state.todolists
    }
}
// const mapDispatchToProps=(dispatch)=>{
//     return {
//         addTodolist: (newTodolist)=>{
//                 dispatch(addTodolistAC(newTodolist))
//             },
//             setTodolist: (todolists)=>{
//             dispatch(setTodoListAC(todolists))
//             }
//         }
//     }

const ConnectedApp = connect(mapStateToProps, {addTodolist, setTodoList})(App);

export default ConnectedApp;

