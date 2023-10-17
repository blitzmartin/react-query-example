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
        renderOnError={<div className='text-cyan-50 py-20'>Error</div>}
        renderOnLoading={<div className='text-cyan-50 py-20'>Loading...</div>}
        renderOnSuccess={(commentData) => (
          <div className='flex flex-col gap-8 max-w-[800px]'>
            {commentData.map((comment) => (
              <div key={comment.id} className='flex flex-col gap-4 justify-between border-2 px-6 py-4 rounded-lg border-foreground bg-cyan-50 font-body'>
                <div className="flex justify-between">
                  <div className='tex-lg font-semibold font-sans'>{comment.name.toUpperCase()}</div>
                  <div className='font-light text-slate-700'>{comment.email}</div>
                </div>
                <div className='text-slate-700'>{comment.body}</div>
              </div>
            ))}
          </div>
        )}
      />
    </PageContainer>
  )
}
