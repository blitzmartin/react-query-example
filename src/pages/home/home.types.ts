
export type PostResponse = {
    id: number
    userId: number
    title: string
    body: string
  }
  
  
  export type PostCreateRequest = {
    userId: number
    title: string
    body: string
  }
  