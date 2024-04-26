import prismaClient from "../../prisma";

interface CardVerify{
    numero:string
    id_Usersession:string
}

class CardVerifyService{
    async execute({numero, id_Usersession}:CardVerify){
        const Card = await prismaClient.cartao.findFirst(
            {
                where:{
                    numero:numero
                }
            }
        )
        if(!Card){
            throw new Error("Esse cartão não está cadastrado!");   
        }
        if(Card.id_usuario == id_Usersession){
            return {ok:true};
        }else{
            return {não:"Não foi possivel!"};
        }
    }
}

export {CardVerifyService}