import { PhPencilSimpleLine, PhPlus, PhTrash } from '@/assets/icons'
import { toast } from '@/hooks/useToast'
import { randomId } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared'
import { DataFetchError } from '@/shared/DataFetchError'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  usePost,
  usePostCreateMutation,
  usePostDeleteMutation,
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
    <PageContainer
      title="POSTS"
      action={
        <Dialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onClose={() => createPostForm.reset()}
        >
          <DialogTrigger asChild>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  className="flex items-center justify-between gap-2"
                >
                  New Post <PhPlus width="16px" height="16px" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New post</p>
              </TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogContent>
            <Form {...createPostForm}>
              <form
                onSubmit={createPostForm.handleSubmit(onPostCreateSubmit)}
                className="flex flex-col gap-4"
              >
                <DialogHeader>
                  <DialogTitle>New post</DialogTitle>
                  <DialogDescription>Create new post</DialogDescription>
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
      }
    >
      <QueryStateManager
        query={postQuery}
        renderOnError={<DataFetchError />}
        renderOnLoading={<div className="py-20">Loading...</div>}
        renderOnSuccess={(postData) => (
          <div className="flex w-full flex-col gap-8">
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
  const postEditMutation = usePostEditMutation()
  const postDeleteMutation = usePostDeleteMutation()

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

  const onPostEditSubmit = async (values: CreatePostFormValues) => {
    postEditMutation.mutate(
      {
        ...values,
        userId: post.userId,
        id: post.id
      },
      {
        onSettled: (data, error) => {
          if (error) {
            toast({
              description: 'Error editing post',
              variant: 'error'
            })
          } else {
            toast({
              description: 'Post edited',
              variant: 'success'
            })
            handleClose()
          }
        }
      }
    )
  }

  const handleDelete = () => {
    postDeleteMutation.mutate(
      { id: post.id },
      {
        onSettled: (data, error) => {
          if (error) {
            toast({
              description: 'Error deleting post',
              variant: 'error'
            })
          } else {
            toast({
              description: 'Post deleted',
              variant: 'success'
            })
            handleClose()
          }
        }
      }
    )
  }

  return (
    <div key={post.id} className="flex w-full flex-col justify-between gap-1">
      <div className="flex w-full justify-between">
        <div className="font-display text-xl">{post.title}</div>
        <div className="flex items-center justify-between">
          <Dialog
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onClose={() => editPostForm.reset()}
          >
            <DialogTrigger asChild>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" onClick={() => setIsEditOpen(true)}>
                    <PhPencilSimpleLine width="16px" height="16px" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit post</p>
                </TooltipContent>
              </Tooltip>
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
          <AlertDialog>
            <Tooltip>
              <TooltipTrigger>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                    <PhTrash width="16px" height="16px" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete post</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete post</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure? This action cannot be undone. This will
                  permanently delete this post from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="text-sm text-card">{post.body}</div>
    </div>
  )
}
