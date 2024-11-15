import { TokenType, UserVerifyStatus } from '~/constants/enum'
import { USERS_MESSAGES } from '~/constants/messages'
import { dataSource } from '~/dataSource'
import { IsFavorite } from '~/models/entity/isFavorite'
import { RefreshToken } from '~/models/entity/refreshToken'
import { Users } from '~/models/entity/users'
import { hashPassword } from '~/util/crypto'
import { signToken } from '~/util/jwt'
class UserServices {
  private signAccessToken({ id, email, verify }: { id: string; email: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        id,
        email,
        token_type: TokenType.AccessToken,
        verify
      },
      option: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
    })
  }
  private signRefreshToken({ id, email, verify }: { id: string; email: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        id,
        email,
        token_type: TokenType.RefreshToken,
        verify
      },
      option: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }

  private signAccessAndRefreshToken({ id, email, verify }: { id: string; email: string; verify: UserVerifyStatus }) {
    return Promise.all([this.signAccessToken({ id, email, verify }), this.signRefreshToken({ id, email, verify })])
  }

  async loginService({ id, email }: { id: string; email: string }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      id: id as string,
      email: email,
      verify: UserVerifyStatus.Verrified
    })

    const user = await dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne()

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(RefreshToken)
      .values([{ token: refresh_token, user: user }])
      .execute()

    console.log(access_token)

    return { access_token, refresh_token }
  }
  async registerService({
    email,
    password,
    country,
    name,
    dob
  }: {
    email: string
    password: string
    country: string
    name: string
    dob: string
  }) {
    const firstUser = await dataSource
      .getRepository(Users)
      .createQueryBuilder('users')
      .orderBy('users.id', 'DESC')
      .getOne()

    let newUserId: number = 0

    if (firstUser != null) {
      newUserId = (firstUser.id as number) + 1
    }
    const hashedPassword = hashPassword(password)
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([{ id: newUserId, email, password: hashedPassword, country, name, dob }])
      .execute()
    return {
      message: USERS_MESSAGES.REGISTER_SUCCESS
    }
  }
  async logout(refresh_token: string, userId: string) {
    const result = await dataSource
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('token = :token', { token: refresh_token })
      .andWhere('userId = :userId', { userId })
      .execute()

    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }
  async getMeService(id: string) {
    const user = await dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne()
    return user
  }
  async favoriteService(userId: string, productId: string) {
    const isFavorited = await dataSource
      .getRepository(IsFavorite)
      .createQueryBuilder('isFavorite')
      .where('isFavorite.user= :userId', {userId})
      .andWhere('isFavorite.product = :productId', {productId})
      .getOne()
    if(!isFavorited){
      await dataSource
      .createQueryBuilder()
      .insert()
      .into(IsFavorite)
      .values([{ product: productId, user: userId }])
      .execute()
    }else {
      await dataSource
      .createQueryBuilder()
      .delete()
      .from(IsFavorite)
      .where('user= :userId', {userId})
      .andWhere('product = :productId', {productId})
      .execute()
    }
    return;
  }
}
const userServices = new UserServices()
export default userServices
