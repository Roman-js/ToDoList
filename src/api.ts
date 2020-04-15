import  axios from "axios";
import {ChangeTaskType, TaskType, TodoListType} from "./types/entities";



const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}
});


export const api = {
    createTask(newTitle: string, todolistId: string){
     return instance.post(`${todolistId}/tasks`, {title:newTitle})
 },

    createTodolist(title: string){
        return instance.post('', {title: title})
    },

    getTodolists(){

        return instance.get<TodoListType[]>('')
    },

    getTasks(taskId: string){
    return instance.get<GetTasksResponseType>(`${taskId}/tasks`)
    },

    deleteTodolist(todolistId: string){
     return instance.delete(`${todolistId}`)
 },

    putTask(todoListId: string, taskId: string, task: object){

     return  instance.put(`${todoListId}/tasks/${taskId}`, task)
 },

    deleteTask(todolistId: string, taskId: string){
     return  instance.delete(`${todolistId}/tasks/${taskId}`)
 },

 changeTodolistTitle (todoListId: string, updateTitle: string){

        return instance.put(`${todoListId}`, {title: updateTitle})
 }

}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

