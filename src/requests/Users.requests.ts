import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface LoginReqBody {
  email: string
  password: string
}
export interface RegisterReqBody {
  email: string
  password: string
  country: string
  name: string
  dob: string
}
export interface LogoutReqBody {
  refreshToken: string
}
export interface TokenPayload extends JwtPayload {
  userId: string
  userName: string
  tokenType: TokenType
}
