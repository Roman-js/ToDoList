import {api} from "./api";
import {TaskType, TodoListType} from "./types/entities";
import {ThunkAction} from "redux-thunk";

export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST';
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/Reducer/DELETE-TASK';
export const SET_TODOLIST = 'TodoList/Reducer/SET-TODOLIST';
export const SET_TASKS = 'TodoList/Reducer/SET-TASKS';
export const CHANGE_TITLE_TODOLIST = 'TodoList/Reducer/CHANGE-TITLE-TODOLIST';
export const AUTHORIZED = 'TodoList/Reducer/AUTHORIZED';


const initialState: InitialStateType = {
    todolists: [],
    auth: false
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
                        if (tl.id === action.task.todoListId) {
                            return {
                                ...tl, tasks: tl.tasks.map(t => {
                                    if (t.id !== action.task.id) {
                                        return t
                                    } else {
                                        return {...t, ...action.task}
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
        case AUTHORIZED: {
            return {
                ...state, auth: action.auth
            }
        }
    }


    return state
}


export const addTodolist = (newTodolist: TodoListType): AddTodolistActionType => ({type: ADD_TODOLIST, newTodolist})
export const addTask = (newTask: TaskType, todoListId: string): AddTaskActionType => ({
    type: ADD_TASK,
    newTask,
    todoListId
})
export const changeTask = (task: TaskType, taskId: string, todoListId: string): ChangeTaskActionType => ({
    type: CHANGE_TASK,
    task,
    taskId,
    todoListId
})
export const deleteTodolist = (todoListId: string): DeleteTodoListActionType => ({type: DELETE_TODOLIST, todoListId})
export const deleteTask = (taskId: string, todoListId: string): DeleteTaskActionType => ({
    type: DELETE_TASK,
    taskId,
    todoListId
})
export const getTodoList = (todolists: Array<TodoListType>): SetTodoListActionType => ({type: SET_TODOLIST, todolists})
export const getTasks = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => ({
    type: SET_TASKS,
    todolistId,
    tasks
})
export const changeTitleTodolist = (todolistId: string, newTitle: string): ChangeTitleTodolistActionType => ({
    type: CHANGE_TITLE_TODOLIST,
    todolistId,
    newTitle
})
export const approveAuth = (auth: boolean) =>({
    type: AUTHORIZED,
    auth
})

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
    task: TaskType
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
type AuthorizedType = {
    type: typeof AUTHORIZED
    auth: boolean

}

type TodoActionType =
    AddTodolistActionType | AddTaskActionType |
    ChangeTaskActionType | DeleteTodoListActionType |
    DeleteTaskActionType | SetTodoListActionType |
    SetTasksActionType | ChangeTitleTodolistActionType |
    AuthorizedType

//______________________________________
type InitialStateType = {
    todolists: Array<TodoListType>
    auth: boolean
}
type ThunkType = ThunkAction<void, InitialStateType, unknown, TodoActionType>

//Thunk

export const loadTasksThunk = (todolistId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch) => (
        api.getTasks(todolistId)
            .then(res => {
                let allTasks = res.data.items
                dispatch(getTasks(allTasks, todolistId))
            })
    )
}
export const addTodolistTC = (title: string): ThunkType => {
    return (dispatch: any) => {
        api.createTodolist(title)
            .then(res => {
                let todolist = res.data.data.item;
                dispatch(addTodolist(todolist))
            })
    }
}
export const deleteTodolistTC = (todoListId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch) => {
        api.deleteTodolist(todoListId)
            .then(res => {
                if (res.data.resultCode === 0) dispatch(deleteTodolist(todoListId));
            })
    }
}
export const restoreTodolistTC = (): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch: any) => {
        api.getTodolists()
            .then(res => {
                dispatch(getTodoList(res.data))
            })
            .catch(error => {
                console.log(error)
            });
    }
}
// task TaskType
export const changeTaskTC = (todoListId: string, taskId: string, task: TaskType, obj: any): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch) => {
        api.putTask(todoListId, taskId, task)
            .then(res => {
                if (res.data.resultCode === 0) {
                    let task: TaskType = res.data.data.item;
                    dispatch(changeTask(task, todoListId, taskId));
                }
                ;
            })
            .catch((err) => {
            })
    }
}
export const addTaskTC = (newTitle: string, todoListId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch: any) => {
        api.createTask(newTitle, todoListId)
            .then(res => {
                if (res.data.resultCode === 0)
                    dispatch(addTask(res.data.data.item, todoListId));
            })
    }
}
export const deleteTaskTC = (todoListId: string, taskId: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch: any) => {
        api.deleteTask(todoListId, taskId)
            .then(res => {
                if (res.data.resultCode === 0)
                    dispatch(deleteTask(taskId, todoListId))
            })
    }
}
export const changeTitleTC = (todoListId: string, newTitle: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch: any) => {
        api.changeTodolistTitle(todoListId, newTitle)
            .then(res => {

                if (res.data.resultCode === 0) {
                    dispatch(changeTitleTodolist(todoListId, newTitle))
                }
            })
    }
}
export const authorizeTC = (email: string, password: string): ThunkAction<void, InitialStateType, unknown, TodoActionType> => {
    return (dispatch: any) => {
        api.login(email, password)
            .then(res => {
               if(res.resultCode === 0) {
                   dispatch(approveAuth(true))
               }
            })
    }
}

export default reducer

