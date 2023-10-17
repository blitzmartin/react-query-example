import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getComments = async (
): Promise<Comment[]> => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
    console.log(response.data)
    return response.data
}

export const useComments = () =>
    useQuery({
        queryKey: ['comments'],
        queryFn: () => getComments(),
    })

export type Comment = {
    id: number
    postId: number
    name: string
    email: string
    body: string
}


/*
const antivirusActivate = async (body: AntivirusActivateRequest) => {
    const response = await axiosInstance.post('/api/v1/antivirus/activate', body)
    return response.data
}

export const useAntivirusActivateMutation = () => {
    return useMutation({
        mutationFn: antivirusActivate,
        onSuccess: () => {
            queryClient.invalidateQueries(['antivirusStatus'])
        },
    })
}

  const antivirusActivateMutation = useAntivirusActivateMutation()

  const onToggleAntivirusSubmit = async (values: AntivirusActivationValues) => {
    antivirusActivateMutation.mutate(
      {
        tenantId: tenant.id,
        apiKey: values.avApiKey,
      },
      {
        onSuccess: () => {
          toast({
            description: t('antivirus-activated'),
            variant: 'success',
          })
        },
      }
    )
  }

*/