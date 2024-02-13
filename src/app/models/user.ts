export interface User {
  id: number | undefined
  firstName: string
  lastName: string
  email: string
  password : string
  roles: string[] | undefined
}
