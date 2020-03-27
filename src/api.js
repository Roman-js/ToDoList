import * as axios from "axios";



const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {'API-KEY': '0c05e3f5-1bb0-4c63-a612-ce4b6957f3bd'}
});


export const api = {
    createTask(newTitle, todolistId){
     return instance.post(`${todolistId}/tasks`, {title:newTitle})
 },

    createTodolist(title){
        return instance.post('', {title: title})
    },

    restoreTodolists(){
        return instance.get()
    },

    restoreTasks(taskId){
    return instance.get(`${taskId}/tasks`)
    },

    deleteTodolist(todolistId){
     return instance.delete(`${todolistId}`)
 },

    putTask(todoListId, taskId, updateTask){
     return  instance.put(`${todoListId}/tasks/${taskId}`, updateTask)
 },

    deleteTask(todolistId, taskId){
     return  instance.delete(`${todolistId}/tasks/${taskId}`)
 },

 changeTodolistTitle (todoListId, updateTitle){
        debugger
        return instance.put(`${todoListId}`, {title: updateTitle})
 }

}

