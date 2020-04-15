import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, restoreTodolistTC} from "./reducer";
import { TodoListType} from "./types/entities";
import {AppStateType} from "./store";


class App extends React.Component<PropsType & StateType> {

    state = {
        todolists: []
    }

    componentDidMount() {
        this.restoreState()
    }


    restoreState = () => {
        this.props.restoreTodolistTC()
    }


    addTodolist = (title: string) =>{
        this.props.addTodolistTC(title)
    }


    render = () => {

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

const mapStateToProps = (state: AppStateType): MapStateToPropsType =>{

    return {
        todolists: state.todolist.todolists
    }
}

const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
    addTodolistTC, restoreTodolistTC})(App);

export default ConnectedApp;

type StateType = {
    todolists: TodoListType[]
}
type OwnPropsType = {
    todolists: TodoListType[]
}
type MapStateToPropsType = {
    todolists: TodoListType[]
}
type MapDispatchToPropsType = {
    addTodolistTC: (title: string) => void
    restoreTodolistTC: () => void
}

type PropsType = OwnPropsType & MapDispatchToPropsType & MapStateToPropsType

