import { Avatar, AvatarFallback, AvatarImage, Button, Separator } from '.'

export const Sidebar = () => {
  return (
    <div className="flex h-screen min-w-[240px] flex-col items-center justify-start gap-16 bg-primary px-6  py-8">
      <Avatar className="h-32 w-32">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <div className="flex h-full w-full flex-col items-start justify-start gap-6">
        <div className="flex w-full flex-col items-start justify-start gap-1">
          <h2 className="font-display text-xl text-background">USERNAME</h2>
          <Separator className="h-0.5 bg-background" />
          <p className="text-sm">blitzmartin</p>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-1">
          <h2 className="font-display text-xl text-background">
            FIRST & LAST NAME
          </h2>
          <Separator className="h-0.5 bg-background" />
          <p className="text-sm">annalisa de martino</p>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-1">
          <h2 className="font-display text-xl text-background">EMAIL</h2>
          <Separator className="h-0.5 bg-background" />
          <p className="text-sm">lizmartin@mail.com</p>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-1">
          <h2 className="font-display text-xl text-background">CITY</h2>
          <Separator className="h-0.5 bg-background" />
          <p className="text-sm">Naples</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-start">
        <Button variant="outline">Logout</Button>
      </div>
    </div>
  )
}

type SidebarItem = {
  id: number
  label: string
  value: string
}
