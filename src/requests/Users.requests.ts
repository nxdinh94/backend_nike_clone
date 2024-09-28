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
}
export interface LogoutReqBody {
  refresh_token: string
}
export interface TokenPayload extends JwtPayload {
  userId: string
  userName: string
  tokenType: TokenType
}
