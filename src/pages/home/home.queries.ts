import { queryClient } from '@/config/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PostCreateRequest, PostEditRequest, PostResponse } from './home.types'

const getPosts = async (): Promise<PostResponse[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data
  //  return response.data.splice(0, 20)
}

export const usePost = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  })

const postCreate = async (body: PostCreateRequest) => {
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    body
  )
  return response.data
}

export const usePostCreateMutation = () => {
  return useMutation({
    mutationFn: postCreate,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })
}

const postEdit = async (body: PostEditRequest) => {
  const response = await axios.put(
    // `https://jsonplaceholder.typicode.com/posts/${id}`,
    `https://jsonplaceholder.typicode.com/posts`,
    body
  )
  return response.data
}

export const usePostEditMutation = () => {
  return useMutation({
    mutationFn: postEdit,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })
}

const postDelete = async ({ id }: { id: number }) => {
  const response = await axios.delete(
    // `https://jsonplaceholder.typicode.com/posts/${id}`,
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  return response.data
}

export const usePostDeleteMutation = () => {
  return useMutation({
    mutationFn: postDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })
}
