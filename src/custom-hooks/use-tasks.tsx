import useHttp from "./use-http"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Task, TaskType } from "../Pages/List/Detail/Task"

//获取任务列表
export const useTasks = (params?: Partial<Task>) => {
    const http = useHttp()
    return useQuery<Task[]>(['tasks',params],() => http('tasks',{data:params}))
}

//获取任务列表的类型
export const useTaskTypes = () => {
    const http = useHttp()
    return useQuery<TaskType[]>(['taskTypes'],() => http('taskTypes',{}))
}

//添加任务
export const useAddTask = () => {
    const queryClient = useQueryClient()
    const http = useHttp()
    const addTask = (params?: Partial<Task>) => http('tasks',{ data:params,method:'POST' })
    const { mutate,data:task } = useMutation(addTask,{
        onSuccess(){
            queryClient.invalidateQueries('tasks')
        }
    })
    return { mutate,task }
}