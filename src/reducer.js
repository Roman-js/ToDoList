import React from 'react';

export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST';
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/Reducer/DELETE-TASK';
export const SET_TODOLIST = 'TodoList/Reducer/SET-TODOLIST';
export const SET_TASKS  = 'TodoList/Reducer/SET-TASKS';


const initialState = {
    todolists: [
        // {id: 0, title: 'ddddd', tasks: [{id:0, title:"ONe", isDone: false, priority: 'low'}]},
        // {id: 1, title: 'sssss', tasks: [{id:1, title:"Two", isDone: true, priority: 'low'}]},
        // {id: 2, title: 'sssss', tasks: []}
    ],
    // tasks: [
    //     // {id: 0}
    // ]
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_TODOLIST:
            return {...state,
                todolists: [...state.todolists, action.newTodolist]
            }

        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(
                    tl => {
                        if (tl.id === action.todoListId) {
                            return {...tl, tasks: [...tl.tasks, action.newTask]}
                        } else {
                            return tl
                        }
                    })
            }

        case CHANGE_TASK:
            return {
                ...state,
                todolists:
                    state.todolists.map(tl => {
                        if (tl.id === action.task.todoListId) {
                            return {
                                ...tl, tasks: tl.tasks.map(t => {
                                    if (t.id !== action.task.id) {
                                        return t
                                    } else {
                                        debugger
                                        return action.task
                                    }
                                })
                            }
                        } else {
                            return tl
                        }
                    })
            }

        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todoListId)
            }

        case DELETE_TASK:

            return {
                ...state,
                todolists: state.todolists.map(tl => {
                        if (tl.id !== action.todoListId) {
                            return tl
                        } else {
                            return {
                                ...tl, tasks: tl.tasks.filter(t => t.id !== action.taskId)
                            }
                        }
                    }
                )
            }

        case SET_TODOLIST: {return{ ...state,
            todolists: action.todolists.map(todolist=>({...todolist, tasks: []}))}  }

        case SET_TASKS: {return {...state,
        todolists: state.todolists.map(tl=>{
            if(tl.id === action.todolistId){
                return {...tl, tasks: action.tasks}}
                else {return tl}

        })}}
    }


    return state
}
export const addTodolistAC = (newTodolist)=>{
    return {
    type: ADD_TODOLIST,
    newTodolist: newTodolist}}

    export const addTaskAC = (newTask, todoListId)=>{
    return {
        type: ADD_TASK,
        newTask: newTask,
        todoListId: todoListId
    }}
    export const changeTaskAC = (task) =>{
    return {
        type: CHANGE_TASK,
        task
    }
    }
    export const deleteTodolistAC = (todoListId)=>{
    return{
        type: DELETE_TODOLIST,
        todoListId: todoListId
    }
    }
    export const deleteTaskAC = (taskId,todoListId) =>{
    return{
        type: DELETE_TASK,
        taskId: taskId,
        todoListId: todoListId
    }
    }
    export const setTodoListAC = (todolists)=>{
    return{
        type: SET_TODOLIST,
        todolists: todolists
    }
    }
    export const setTasksAC = (tasks, todolistId)=>{
    return{
        type: SET_TASKS,
        todolistId: todolistId,
        tasks: tasks
    }
    }

export default reducer
