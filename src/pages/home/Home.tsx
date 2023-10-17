import { PageContainer } from '@/shared/PageContainer'
import { useData } from '../home.queries'
import { QueryStateManager } from '@/shared'

export const Home = () => {
  const dataQuery = useData()
  return (
    <PageContainer title="Home">
      <QueryStateManager 
      query={dataQuery}
      renderOnError={<p>Error</p>}
      renderOnLoading={<p>Loading...</p>}
      renderOnSuccess={(data) => (
        <>
          <h3>{data.other}</h3>
          <p>
          A velit cupiditate eos debitis error et saepe aperiam et veniam
          necessitatibus eum natus molestiae. Aut galisum nemo eum nesciunt dolore
          qui optio dolorum qui voluptatem dolor et explicabo molestiae et
          consequatur repellendus ut repudiandae Quis.
          </p>
        </>
      )}
      />
    </PageContainer>
  )
}
