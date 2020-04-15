
import {api} from "./api";
import {ChangeTaskType, TaskType, TodoListType} from "./types/entities";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST';
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/Reducer/DELETE-TASK';
export const SET_TODOLIST = 'TodoList/Reducer/SET-TODOLIST';
export const SET_TASKS = 'TodoList/Reducer/SET-TASKS';
export const CHANGE_TITLE_TODOLIST = 'TodoList/Reducer/CHANGE-TITLE-TODOLIST';


const initialState: InitialStateType = {
    todolists: [
        // {id: 0, title: 'ddddd', tasks: [{id:0, title:"ONe", isDone: false, priority: 'low'}]},
        // {id: 1, title: 'sssss', tasks: [{id:1, title:"Two", isDone: true, priority: 'low'}]},
        // {id: 2, title: 'sssss', tasks: []}
    ]
}

const reducer = (state = initialState, action: TodoActionType): InitialStateType => {

    switch (action.type) {

        case ADD_TODOLIST:
            return {
                ...state,
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
                        if (tl.id === action.todoListId) {
                            return {
                                ...tl, tasks: tl.tasks.map(t => {
                                    if (t.id !== action.taskId) {
                                        debugger
                                        return t
                                    } else {
                                        debugger
                                        return {...t, ...action.obj}
                                    }
                                })
                            }
                        } else {
                            return tl
                        }
                    })
            }
 
        case CHANGE_TITLE_TODOLIST:
            return {
                ...state, todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {
                            ...t, title: action.newTitle
                        }
                    } else {
                        return t
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

        case SET_TODOLIST: {
            return {
                ...state,
                todolists: action.todolists.map(todolist => ({...todolist, tasks: []}))
            }
        }

        case SET_TASKS: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }

                })
            }
        }
    }


    return state
}



export const addTodolist = (newTodolist: TodoListType): AddTodolistActionType => ({type: ADD_TODOLIST, newTodolist})
export const addTask = (newTask: TaskType, todoListId: string): AddTaskActionType => ({type: ADD_TASK, newTask, todoListId})
export const changeTask = (obj: any, taskId: string, todoListId: string): ChangeTaskActionType => ({type: CHANGE_TASK, taskId, obj, todoListId})
export const deleteTodolist = (todoListId: string): DeleteTodoListActionType => ({type: DELETE_TODOLIST, todoListId})
export const deleteTask = (taskId: string, todoListId: string): DeleteTaskActionType => ({type: DELETE_TASK, taskId, todoListId})
export const getTodoList = (todolists: Array<TodoListType>): SetTodoListActionType => ({type: SET_TODOLIST, todolists})
export const getTasks = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => ({type: SET_TASKS, todolistId, tasks})
export const changeTitleTodolist = (todolistId: string, newTitle: string): ChangeTitleTodolistActionType => ({type: CHANGE_TITLE_TODOLIST, todolistId, newTitle})

//Action creators type

type AddTodolistActionType = {
    type: typeof ADD_TODOLIST
    newTodolist: TodoListType
}
type AddTaskActionType = {
    type: typeof ADD_TASK
    newTask: TaskType
    todoListId: string
}
type ChangeTaskActionType = {
    type: typeof CHANGE_TASK
    obj: any
    taskId: string
    todoListId: string
}
type DeleteTodoListActionType = {
    type: typeof DELETE_TODOLIST
    todoListId: string
}
type DeleteTaskActionType = {
    type: typeof DELETE_TASK
    taskId: string
    todoListId: string
}
type SetTodoListActionType = {
    type: typeof SET_TODOLIST
    todolists: Array<TodoListType>
}
type SetTasksActionType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todolistId: string
}
type ChangeTitleTodolistActionType = {
    type: typeof CHANGE_TITLE_TODOLIST
    todolistId: string
    newTitle: string
}

type TodoActionType =
    AddTodolistActionType | AddTaskActionType |
    ChangeTaskActionType | DeleteTodoListActionType |
    DeleteTaskActionType | SetTodoListActionType |
    SetTasksActionType | ChangeTitleTodolistActionType
//______________________________________
type InitialStateType = {
    todolists: Array<TodoListType>
}
type ThunkType = ThunkAction<void, InitialStateType, unknown, TodoActionType >

//Thunk

export const loadTasksThunk = (todolistId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType>=>{
    return (dispatch: any)=> (
        api.getTasks(todolistId)
            .then(res => {
                let allTasks = res.data.items
                dispatch(getTasks(allTasks, todolistId))
            })
    )
}
export const addTodolistTC = (title: string): ThunkType =>{
    return(dispatch)=>{
        api.createTodolist(title)
            .then(res=> {
                let todolist = res.data.data.item;
                dispatch(addTodolist(todolist))
            })
    }
}
export const deleteTodolistTC = (todoListId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> =>{
    return(dispatch)=>{
        api.deleteTodolist(todoListId)
            .then(res=>{
                if(res.data.resultCode === 0) dispatch(deleteTodolist(todoListId));
            })
    }
}
export const restoreTodolistTC = (): ThunkAction<void, InitialStateType, unknown, TodoActionType> =>{
    return(dispatch: any)=>{
        api.getTodolists()
            .then(res => {

                dispatch(getTodoList(res.data))
            });
    }
}
                                                               // task string
export const changeTaskTC = (todoListId: string, taskId: string, task: object, obj: any): ThunkAction<void, InitialStateType, unknown, TodoActionType> =>{
   debugger
    return(dispatch)=>{
        api.putTask(todoListId, taskId, task)
            .then(res=>{
debugger
                if(res.data.resultCode === 0) {
                    let task = res.data.data.item;
                    dispatch(changeTask(obj ,todoListId, taskId ));

                };
            })
    }
}
export const addTaskTC = (newTitle: string, todoListId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> =>{
    return(dispatch: any)=>{
        api.createTask(newTitle, todoListId)
            .then(res=>{
                if(res.data.resultCode === 0)
                    dispatch(addTask(res.data.data.item, todoListId));
            })
    }
}
export const deleteTaskTC = (todoListId: string, taskId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> =>{
    return(dispatch: any)=>{
        api.deleteTask(todoListId, taskId)
            .then(res=>{
                if(res.data.resultCode === 0)
                    dispatch(deleteTask(taskId, todoListId))
            })
}
}
export const changeTitleTC = (todoListId: string, newTitle: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> =>{
    return (dispatch: any)=>{
        api.changeTodolistTitle(todoListId, newTitle)
            .then(res=>{

                if(res.data.resultCode===0){
                    dispatch(changeTitleTodolist(todoListId, newTitle))
                }
            })
    }
}

export default reducer

// export const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist})
// export const addTaskAC = (newTask, todoListId) => {
//     return {
//         type: ADD_TASK,
//         newTask: newTask,
//         todoListId: todoListId
//     }
// }
// export const changeTaskAC = (task) => {
//     return {
//         type: CHANGE_TASK,
//         task
//     }
// }
// export const deleteTodolistAC = (todoListId) => {
//     return {
//         type: DELETE_TODOLIST,
//         todoListId: todoListId
//     }
// }
// export const deleteTaskAC = (taskId, todoListId) => {
//     return {
//         type: DELETE_TASK,
//         taskId: taskId,
//         todoListId: todoListId
//     }
// }
// export const setTodoListAC = (todolists) => {
//     return {
//         type: SET_TODOLIST,
//         todolists: todolists
//     }
// }
// export const setTasksAC = (tasks, todolistId) => {
//     return {
//         type: SET_TASKS,
//         todolistId: todolistId,
//         tasks: tasks
//     }
// }
// export const changeTitleTodolistAC = (todolistId, newTitle) => ({type: CHANGE_TITLE_TODOLIST, todolistId, newTitle})