import prismaClient from "../../prisma";


interface CartaoRequest{
    numero: string
    nomeUsuario:string
    validade:string
    digitoSeguranca:string
    usuario:string
}

class CreateCardService {
    async execute({numero, nomeUsuario, validade, digitoSeguranca, usuario}: CartaoRequest){
        if (!numero) {
            throw new Error("Numero do cartão não enviado");
        }
        if (!nomeUsuario) {
            throw new Error("Nome do usuário não enformado");
        }
        if (!validade) {
            throw new Error("Validade não informada");
        }
        if (!digitoSeguranca) {
            throw new Error("Digito de seguranca não enviado");
        }
       
        const CardAreadyExists = await prismaClient.cartao.findFirst(
            {
                where:{
                    numero:numero
                }
            }
        )
        if(CardAreadyExists){
            throw new Error('Cartão já está cadastrado!');
        }

        
        const card = await prismaClient.cartao.create({
            data:{
                numero:numero,
                nomeUsuario:nomeUsuario,
                validade:validade,
                digitoSeguranca:digitoSeguranca,
                id_usuario: usuario

            },
            select:{
                numero:true,
                nomeUsuario:true,
                validade:true,
                id_usuario: true
            }
        })
        return card;
    }
}
export {CreateCardService};