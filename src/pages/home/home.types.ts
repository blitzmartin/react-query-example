
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

  // check this type, if needs id
  export type PostEditRequest = {
    userId: number
    title: string
    body: string
  }
  
  