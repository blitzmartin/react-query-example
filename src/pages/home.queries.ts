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