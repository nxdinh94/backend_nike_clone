import { TokenType, UserVerifyStatus } from '~/constants/enum';
import { dataSource } from '~/dataSource';
import { RefreshToken } from '~/models/entity/refreshToken';
import { Users } from '~/models/entity/users';
import { signToken } from '~/util/jwt';
class UserServices{
    
    private signAccessToken({user_id, user_name,verify} : {user_id: string,user_name: string, verify: UserVerifyStatus}){
        return signToken({
            payload : {
                user_id,
                user_name,
                token_type: TokenType.AccessToken,
                verify
            },
            option:{
                expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN,
            },
            privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
        })
    }
    private signRefreshToken({user_id, user_name,verify} : {user_id: string, user_name: string,verify: UserVerifyStatus}){
        return signToken({
            payload : {
                user_id, 
                user_name,
                token_type: TokenType.RefreshToken,
                verify
            },
            option:{
                expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN,
            },
            privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
        })
    }

    private signAccessAndRefreshToken({user_id, user_name, verify} : {user_id: string,user_name: string, verify: UserVerifyStatus}){
        return Promise.all([
            this.signAccessToken({user_id, user_name,verify}), 
            this.signRefreshToken({user_id,user_name, verify})
        ])
    }

    async loginService ({email, password}: {email:string, password:string}){
        const user = await dataSource.getRepository(Users)
                    .createQueryBuilder('user')
                    .where("user.email = :email", {email})
                    .andWhere("user.password = :password", {password})
                    .getOne()
                
        if(user){
            const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
                user_id : user.id?.toString() as string, 
                user_name : user.name?.toString() as string, 
                verify: UserVerifyStatus.Verrified
            })
    
            await dataSource.createQueryBuilder().insert().into(RefreshToken).values([
                {userId :  user.id?.toString() as string, token: refresh_token}
            ]).execute()
    
            return {access_token, refresh_token, user}
        }else {
            return 'Invalid email or password'
        }
    }
    async registerService ({email, password, name, role}: {email:string, password:string, name:string, role: number}){
       
        const firstUser = await dataSource
        .getRepository(Users)
        .createQueryBuilder("users").orderBy('users.id', 'DESC').getOne()

        let newUserId: number = 0

        if(firstUser != null){
            newUserId = firstUser.id as number + 2
        }
    
        await dataSource
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values([
            { id: newUserId,  email, password, name, role },
        ]).execute()

        const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
            user_id : newUserId.toString(), 
            user_name: name,
            verify: UserVerifyStatus.Verrified
        })

        await dataSource.createQueryBuilder().insert().into(RefreshToken).values([
            {userId : newUserId, token: refresh_token}
        ]).execute()

        return {access_token, refresh_token}



    }
    
}   
const userServices = new UserServices();
export default userServices 