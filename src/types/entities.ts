


export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
    tasks: Array<TaskType>


}

export type TaskType = {

    // title: string
    // description: string
    // completed: boolean
    // status: number
    // priority: string
    // startDate: string
    // deadline: string

    description: string
    title: string
    completed: boolean
    status: number
    priority: string //number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string


}

export type ChangeTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type RootStateType = {
    todolists: TodoListType[]
    filterValue: string
}