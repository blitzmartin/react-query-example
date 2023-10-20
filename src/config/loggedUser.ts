import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getUserDetails = async (): Promise<UserResponse[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
  //  return response.data.splice(0, 20)
}

export const useUserDetails = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetails()
  })

export type UserResponse = {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

export type Company = {
  name: string
  catchPhrase: string
  bs: string
}
