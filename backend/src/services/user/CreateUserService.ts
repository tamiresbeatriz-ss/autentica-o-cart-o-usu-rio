import prismaClient from "../../prisma";
import {hash} from 'bcryptjs'

interface UserRequest{
    nome: string
    email:string
    login:string
    senha:string
}

class CreateUserService {
    async execute({nome, email, login, senha}: UserRequest){
        
        //verificar se foi enviado o valor do e-mail
        if (!email) {
            throw new Error("E-mail não enviado!")
        }

        //verifica se o email já foi cadastrado
        const UserAreadyExists = await prismaClient.usuario.findFirst(
            {
                where:{
                    email:email
                }
            }
        )
        if(UserAreadyExists){
            throw new Error('Email já utilizado')
        }

        //criptografando a senha
        const senhaHash = await hash(senha,8);

        //cadastro no banco de dados
        const user = await prismaClient.usuario.create({
            data:{
                nome: nome,
                email : email,
                login : login,
                senha : senhaHash
            },
            select:{
                id:true,
                nome:true,
                email:true,
                login : true
            }
        })
        return user;
    }
}
export {CreateUserService};