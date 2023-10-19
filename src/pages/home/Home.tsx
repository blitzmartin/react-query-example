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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PageContainer,
  QueryStateManager,
  Textarea
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePost, usePostCreateMutation } from './home.queries'

const createPostValidationSchema = z.object({
  title: z.string({ required_error: 'Post title is required' }).min(2, {
    message: 'Post title is not valid'
  }),
  body: z.string({ required_error: 'Post body is required' }).min(2, {
    message: 'Post body is not valid'
  })
})

type CreatePostFormValues = z.infer<typeof createPostValidationSchema>

export const Home = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const postQuery = usePost()

  const createPostForm = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostValidationSchema)
  })
  const postCreateMutation = usePostCreateMutation()

  const onPostCreateSubmit = async (values: CreatePostFormValues) => {
    postCreateMutation.mutate(
      {
        ...values,
        userId: randomId()
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
    setIsCreateOpen(false)
  }

  return (
    <PageContainer>
      <div className="flex w-full items-center justify-end py-4">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsCreateOpen(true)}>New Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new post</DialogTitle>
              <DialogDescription>
                A small description, probably unnecesary
              </DialogDescription>
            </DialogHeader>
            <Form {...createPostForm}>
              <form
                onSubmit={createPostForm.handleSubmit(onPostCreateSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={createPostForm.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          id="post-title"
                          {...field}
                          hasErrors={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createPostForm.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Textarea id="post-content" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button type="submit">Save</Button>
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
                  <div className="font-sans font-semibold">
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
