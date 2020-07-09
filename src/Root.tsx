import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, restoreTodolistTC} from "./reducer";
import {TodoListType} from "./types/entities";
import {AppStateType} from "./store";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Login from "./Login";
import {Redirect, Route} from "react-router";




class App extends React.Component<PropsType & StateType> {

    state = {
        todolists: [],
        login: false
    }

    componentDidMount() {
        debugger
        this.restoreState()
    }


    restoreState = () => {
        this.props.restoreTodolistTC()
    }


    addTodolist = (title: string) => {
        this.props.addTodolistTC(title)
    }



    render = () => {

        let todolist = this.props.todolists.map(tl => <TodoList id={tl.id} title={tl.title} tasks={tl.tasks}/>);

        return (

            <div className='App'>




               {/* <Route path={'/login'} component={Login}/>
                {!this.props.auth ? <Redirect to={'/login'}/> :*/}
                    <div>
                        <AppBar position='static'>
                            <Toolbar>
                                <IconButton edge='start' color='inherit'>
                                    <Menu/>
                                </IconButton>
                                <Typography variant='h6'>
                                    News
                                </Typography>
                                <Button color='inherit'>Login</Button>
                            </Toolbar>
                        </AppBar>
                        <Container fixed>
                            <Grid container style={{padding: '20px 10px'}}>
                                <AddNewItemForm addItem={this.addTodolist}/>
                            </Grid>
                            <Grid container spacing={2}>

                                {todolist}

                            </Grid>
                        </Container>
                    </div>
               {/* }*/}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {

    return {
        todolists: state.todolist.todolists,
        auth: state.todolist.auth
    }
}

const ConnectedRoot = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        addTodolistTC, restoreTodolistTC
    })(App);

export default ConnectedRoot;

type StateType = {
    todolists: TodoListType[]
}
type OwnPropsType = {
    todolists: TodoListType[]
}
type MapStateToPropsType = {
    todolists: TodoListType[]
    auth: boolean
}
type MapDispatchToPropsType = {
    addTodolistTC: (title: string) => void
    restoreTodolistTC: () => void
}

type PropsType = OwnPropsType & MapDispatchToPropsType & MapStateToPropsType

