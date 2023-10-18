import { PageContainer } from '@/shared/PageContainer'
import { usePost, usePostCreateMutation } from './home.queries'
import { QueryStateManager } from '@/shared'
import { toast } from '@/hooks/useToast'
import { randomId } from '@/lib/utils'

export const Home = () => {
  const postQuery = usePost()
  
  
  const postCreateMutation = usePostCreateMutation()

  const onPostCreateSubmit = async (values: any) => {
    postCreateMutation.mutate(
      {
        userId: randomId(),
        title: 'New title',
        body: 'Lorem ipsum bla bla bla'
      },
      {
        onSuccess: () => {
          toast({
            description: 'Post created',
            variant: 'success',
          })
        },
      }
    )
  }

  return (
    <PageContainer title="Posts">
      <QueryStateManager
        query={postQuery}
        renderOnError={<div className='text-cyan-50 py-20'>Error</div>}
        renderOnLoading={<div className='text-cyan-50 py-20'>Loading...</div>}
        renderOnSuccess={(commentData) => (
          <div className='flex flex-col gap-8 max-w-[800px]'>
            {commentData.map((comment) => (
              <div key={comment.id} className='flex flex-col gap-4 justify-between border-2 px-6 py-4 rounded-lg border-foreground bg-cyan-50 font-body'>
                <div className="flex justify-between">
                  <div className='tex-lg font-semibold font-sans'>{comment.title.toUpperCase()}</div>
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
