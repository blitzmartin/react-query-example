import { PhSmileySad } from '@/assets/icons'

export const DataFetchError = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <PhSmileySad width="38px" height="38px" />
      <div>Something when wrong when fetching data</div>
    </div>
  )
}
