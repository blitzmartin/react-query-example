import { queryClient } from "@/config/react-query"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostCreateRequest, PostResponse } from "./home.types"

const getPosts = async (
): Promise<PostResponse[]> => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  //  return response.data.splice(0, 20)
}

export const usePost = () =>
    useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
    })



const postCreate = async (body: PostCreateRequest ) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', body)
    return response.data
}

export const usePostCreateMutation = () => {
    return useMutation({
        mutationFn: postCreate,
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
        },
    })
}
