import { PageContainer } from '@/shared/PageContainer'
import { useComments } from './home.queries'
import { QueryStateManager } from '@/shared'

export const Home = () => {
  const commentQuery = useComments()
  console.log(commentQuery)
  return (
    <PageContainer title="Comments">
      <QueryStateManager
        query={commentQuery}
        renderOnError={<p>Error</p>}
        renderOnLoading={<p>Loading...</p>}
        renderOnSuccess={(commentData) => (
          <div className='flex flex-col gap-8 max-w-[800px]'>
            {commentData.map((comment) => (
              <div key={comment.id} className='flex flex-col gap-4 justify-between border-2 px-6 py-4 rounded-lg border-foreground bg-cyan-100 font-body'>
                <div className="flex justify-between">
                  <div className='tex-lg font-semibold font-sans'>{comment.name.toUpperCase()}</div>
                  <div className='font-light'>{comment.email}</div>
                </div>
                <div>{comment.body}</div>
              </div>
            ))}
          </div>
        )}
      />
    </PageContainer>
  )
}
