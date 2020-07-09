import React from 'react';
import './App.css';
import {TodoListType} from "./types/entities";
import {Redirect, Route} from "react-router";
import {useSelector} from "react-redux";
import {AppStateType} from "./store";
import Login from "./Login";
import ConnectedRoot from "./Root";


const App = (props: StateType) => {

    const auth = useSelector((state:AppStateType) => state.todolist.auth);



        return (

            <div className='App'>

                <Route path={'/login'} component={Login}/>
                <Route path={'/todo'} component={ConnectedRoot}/>

                {/*<ConnectedRoot todolists={props.todolists}/>*/}
                {!auth? <Redirect to='/login' /> : <Redirect to='/todo'/>}

            </div>
        );
    }




export default App;

type StateType = {
    todolists: TodoListType[]
}


