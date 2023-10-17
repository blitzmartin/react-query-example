import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getData = async (
  ): Promise<DataResponse> => {
    const response = await axios.get('/add/endpoint')
    return response.data // response or response.data?
  }
  
  export const useData = () =>
    useQuery({
      queryKey: ['dataKey'],
      queryFn: () => getData(),
    })

    export type DataResponse = {
        id: string
        other: string
    }
