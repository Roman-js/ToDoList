import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodolistAC, setTodoListAC} from "./reducer";
import axios from 'axios'


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
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                //debugger
                console.log(res.data);
                this.props.setTodolist(res.data)
            });
    }


    addTodolist = (title) =>{
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title},
            {withCredentials: true, headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}}
            )
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
const mapDispatchToProps=(dispatch)=>{
    return {
        addTodolist: (newTodolist)=>{
                dispatch(addTodolistAC(newTodolist))
            },
            setTodolist: (todolists)=>{
            dispatch(setTodoListAC(todolists))
            }
        }
    }

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;

