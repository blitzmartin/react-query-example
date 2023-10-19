import { toast } from '@/hooks/useToast'
import { randomId } from '@/lib/utils'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  PageContainer,
  QueryStateManager,
  Textarea
} from '@/shared'

import { useState } from 'react'
import { usePost, usePostCreateMutation } from './home.queries'

export const Home = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
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
        onSettled: (data, error) => {
          if (error) {
            toast({
              description: 'Error creating post',
              variant: 'error'
            })
          } else {
            toast({
              description: 'Post created',
              variant: 'success'
            })
          }
        }
      }
    )
  }

  return (
    <PageContainer>
      <div className="flex w-full items-center justify-end py-4">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsCreateOpen(true)}>
              New Post
            </Button>
          </DialogTrigger>
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
      <h1 className="pb-10 text-center font-serif text-3xl font-extrabold text-cyan-50">
        Posts
      </h1>
      <QueryStateManager
        query={postQuery}
        renderOnError={<div className="py-20 text-cyan-50">Error</div>}
        renderOnLoading={<div className="py-20 text-cyan-50">Loading...</div>}
        renderOnSuccess={(commentData) => (
          <div className="flex max-w-[800px] flex-col gap-8">
            {commentData.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col justify-between gap-4 rounded-lg border-2 border-foreground bg-cyan-50 px-6 py-4 font-body"
              >
                <div className="flex justify-between">
                  <div className="tex-lg font-sans font-semibold">
                    {comment.title.toUpperCase()}
                  </div>
                </div>
                <div className="text-slate-700">{comment.body}</div>
              </div>
            ))}
          </div>
        )}
      />
    </PageContainer>
  )
}
