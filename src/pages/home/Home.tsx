import { PhPencilSimpleLine, PhPlus } from '@/assets/icons'
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
import {
  usePost,
  usePostCreateMutation,
  usePostEditMutation
} from './home.queries'
import { PostResponse } from './home.types'

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
  const handleClose = () => {
    setIsCreateOpen(false)
    createPostForm.reset()
  }

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
            handleClose()
          }
        }
      }
    )
  }

  return (
    <PageContainer>
      <div className="flex w-full items-center justify-end py-4">
        <Dialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onClose={() => createPostForm.reset()}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center justify-between gap-2"
            >
              New Post <PhPlus width="16px" height="16px" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...createPostForm}>
              <form
                onSubmit={createPostForm.handleSubmit(onPostCreateSubmit)}
                className="flex flex-col gap-4"
              >
                <DialogHeader>
                  <DialogTitle>Create new post</DialogTitle>
                  <DialogDescription>
                    A small description, probably unnecesary
                  </DialogDescription>
                </DialogHeader>
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
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Textarea
                          id="post-content"
                          {...field}
                          hasErrors={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="pb-10 text-center font-display text-4xl font-bold ">
        Posts
      </h1>
      <QueryStateManager
        query={postQuery}
        renderOnError={<div className="py-20 ">Error</div>}
        renderOnLoading={<div className="py-20">Loading...</div>}
        renderOnSuccess={(postData) => (
          <div className="flex max-w-[800px] flex-col gap-8">
            {postData.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      />
    </PageContainer>
  )
}

const editPostValidationSchema = z.object({
  title: z.string({ required_error: 'Post title is required' }).min(2, {
    message: 'Post title is not valid'
  }),
  body: z.string({ required_error: 'Post body is required' }).min(2, {
    message: 'Post body is not valid'
  })
})

type EditPostFormValues = z.infer<typeof editPostValidationSchema>

export const PostCard = ({ post }: { post: PostResponse }) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const handleClose = () => {
    setIsEditOpen(false)
    editPostForm.reset()
  }
  const editPostForm = useForm<EditPostFormValues>({
    defaultValues: {
      title: post.title,
      body: post.body
    },
    resolver: zodResolver(editPostValidationSchema)
  })
  const postEditMutation = usePostEditMutation()
  const onPostEditSubmit = async (values: CreatePostFormValues) => {
    postEditMutation.mutate(
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
            handleClose()
          }
        }
      }
    )
  }
  return (
    <div
      key={post.id}
      className="flex flex-col justify-between gap-4 rounded-lg border-2 border-foreground px-6 py-4"
    >
      <div className="flex justify-between">
        <div className="">{post.title.toUpperCase()}</div>
        <Dialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onClose={() => editPostForm.reset()}
        >
          <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => setIsEditOpen(true)}>
              <PhPencilSimpleLine width="16px" height="16px" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...editPostForm}>
              <form
                onSubmit={editPostForm.handleSubmit(onPostEditSubmit)}
                className="flex flex-col gap-4"
              >
                <DialogHeader>
                  <DialogTitle>Create new post</DialogTitle>
                  <DialogDescription>
                    A small description, probably unnecesary
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={editPostForm.control}
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
                  control={editPostForm.control}
                  name="body"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Textarea
                          id="post-content"
                          {...field}
                          hasErrors={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="text-slate-700">{post.body}</div>
    </div>
  )
}
