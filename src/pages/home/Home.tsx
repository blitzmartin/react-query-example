import { QueryStateManager, PageContainer, Button, Dialog, DialogTrigger, Input, Label, DialogDescription, DialogTitle, DialogHeader, Textarea, DialogFooter } from '@/shared'
import { toast } from '@/hooks/useToast'
import { randomId } from '@/lib/utils'
import { usePost, usePostCreateMutation } from './home.queries'
import { DialogContent } from '@radix-ui/react-dialog'
import { useState } from 'react'

export const Home = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const postQuery = usePost()

  const postCreateMutation = usePostCreateMutation()

  const onPostCreateSubmit = async () => {
    postCreateMutation.mutate(
      {
        userId: randomId(),
        title: 'New title',
        body: 'Lorem ipsum bla bla bla',
      },
      {
        onSettled: (data, error) => {
          if (error) {
            toast({
              description: 'Error creating post',
              variant: 'error',
            });
          } else {
            toast({
              description: 'Post created',
              variant: 'success',
            });
          }
        },
      }
    );
  };


  return (
    <PageContainer>
      <div className='flex w-full justify-end items-center py-4'>
        <Dialog open={isCreateOpen}>
          <DialogTrigger><Button variant="outline" onClick={() => setIsCreateOpen(true)}>New Post</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new post</DialogTitle>
              <DialogDescription>
                A small description, probably unnecesary
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label>Title</Label>
              <Input />
            </div>
            <div>
              <Label>Title</Label>
              <Textarea />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
