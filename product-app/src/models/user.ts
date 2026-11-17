export interface User {
  userResourceId: string
  name: string
  username: string
  email: string
}

export interface NewUser {
  name: string
  username: string
  email: string
  password: string
}
