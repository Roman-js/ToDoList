import  axios from "axios";
import {ChangeTaskType, TaskType, TodoListType} from "./types/entities";



const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {'API-KEY': 'e203b3f5-d0bb-401b-85c2-cf8ebe7c290c'}
});


export const api = {
    login(email: string, password: string){
        return instance.post(`auth/login`, {email, password})
            .then(response=> {
                console.log(response.data)
                    return response.data})
    },
    createTask(newTitle: string, todolistId: string){
     return instance.post(`todo-lists/${todolistId}/tasks`, {title:newTitle})
    },

    createTodolist(title: string){
        return instance.post('todo-lists/', {title: title})
    },

    getTodolists(){

        return instance.get<TodoListType[]>('todo-lists/')
    },

    getTasks(taskId: string){
    return instance.get<GetTasksResponseType>(`todo-lists/${taskId}/tasks`)
    },

    deleteTodolist(todolistId: string){
     return instance.delete(`todo-lists/${todolistId}`)
    },

    putTask(todoListId: string, taskId: string, task: object){
     return  instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, task)
    },

    deleteTask(todolistId: string, taskId: string){
     return  instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

 changeTodolistTitle (todoListId: string, updateTitle: string){

        return instance.put(`todo-lists/${todoListId}`, {title: updateTitle})
   }

}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

