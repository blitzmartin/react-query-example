import { PageContainer } from '@/shared/PageContainer'
import { useComments } from './home.queries'
import { QueryStateManager } from '@/shared'

export const Home = () => {
  const commentQuery = useComments()
  console.log(commentQuery)
  return (
    <PageContainer title="Home">
      <QueryStateManager
        query={commentQuery}
        renderOnError={<p>Error</p>}
        renderOnLoading={<p>Loading...</p>}
        renderOnSuccess={(commentData) => (
          <div>
            {commentData.map((comment) => (
              <div key={comment.id} className='flex flex-col-gap-2 pt-4'>
                <div>{comment.name}</div>
                <div>{comment.email}</div>
                <div>{comment.body}</div>
              </div>
            ))}
          </div>
        )}
      />
    </PageContainer>
  )
}
