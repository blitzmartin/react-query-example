import { QueryStateManager, PageContainer, Button } from '@/shared'
import { toast } from '@/hooks/useToast'
import { randomId } from '@/lib/utils'
import { usePost, usePostCreateMutation } from './home.queries'

export const Home = () => {
  const postQuery = usePost()
  
  
  const postCreateMutation = usePostCreateMutation()

  const onPostCreateSubmit = async () => {
    postCreateMutation.mutate(
      {
        userId: randomId(),
        title: 'New title',
        body: 'Lorem ipsum bla bla bla'
      },
      {
        onSuccess: () => {
          toast({ // returning 201, toast is not shown
            description: 'Post created',
            variant: 'success',
          })
        },
      }
    )
  }

  return (
    <PageContainer>
      <div className='flex w-full justify-end items-center py-4'>
        <Button onClick={() => onPostCreateSubmit()} className='rounded-md text-accent px-2 py-1'>New Post</Button>
      </div>
      <h1 className="text-3xl text-center font-extrabold font-serif text-cyan-50 pb-10">Posts</h1>
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
