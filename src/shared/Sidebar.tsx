import { Avatar, AvatarFallback, AvatarImage } from '.'

export const Sidebar = () => {
  return (
    <div className="flex h-screen min-w-[240px] flex-col items-center justify-start bg-primary py-8">
      <Avatar className="h-32 w-32">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <p>This</p>
      <p>is</p>
      <p>the</p>
      <p>sidebar</p>
    </div>
  )
}
