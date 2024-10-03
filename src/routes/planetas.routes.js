import { Router } from "express";

const planetasRoutes = Router()

let planetas = [
    {
        id:  Number(Math.floor(Math.random() * 999999) + 1),
        nome:"Dev",
        temperatura: 13.3,
        agua: false, //indicação de existencia de water
        atm: ["JS", "NODE", "VS", "Code",
        ]
    },
]

//rota para buscar todos os elementos do array de planetas
planetasRoutes.get("/", (req, res) => {
    return res.status(200).send(planetas)
})

//é uma rota para cadastrar um novo planeta
planetasRoutes.post("/", (req, res) => {
    const {
        nome,
        temperatura,
        agua,
        atm
    } = req.body; 

    if(!nome || !temperatura || !agua){
     return res.status(404).send({
        message: "os campos nome, temperatura e água são obrigatórios"
     })
    }
    
//validação de existência de water

    if(agua != "sim" & agua != "não"){
    return res.status(400).send({
        message: "Digite 'sim' ou 'não'!",
    })
    }

    const novoPlaneta = {
        id: Number(Math.floor(Math.random() * 999999) + 1),
        nome,
        temperatura,
        agua,
        atm
    }

    planetas.push(novoPlaneta)
    return res.status(201).send({
        message:"Planeta cadastrado",
        novoPlaneta
    })
})

//rota para buscar um elemento especifico do array planetas
planetasRoutes.get("/:id", (req, res) => {
    const { id } = req.params
    //console.log(id)

    const filme = planetas.find((movie) => movie.id === Number(id))

    //console.log (filme)

    if (!filme) {
        return res.status(404).send({ message: "Filme não foi encontrado!" })
    }
    return res.status(201).send(filme)

})

//rota para editar um FilmeMarcante
planetasRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const filme = planetas.find((movie) => movie.id === Number(id))

    if (!filme) {
        return res.status(404).send({ message: "Filme não foi encontrado!" })
    }
    const { titulo, genero, emCartaz} = req.body; 
    //console.log()

    filme.titulo = titulo,
    filme.genero = genero,
    filme.emCartaz = emCartaz


    return res.status(200).send({
        message: "Filme atualizado",
        filme,
    })
})

//Rota para deletar um filme
planetasRoutes.delete("/:id", (req, res) => {
    const { id } = req.params
    
    const filme = planetas.find((movie) => movie.id === Number(id))
    if (!filme) {
        return res.status(404).send({ message: "Filme não foi encontrado!" })
    }
    planetas = planetas.filter((movie) => movie.id !== Number(id))
    
    return res.status(200).send({ message: "Filme deletado", filme})
    })
    
    export default planetasRoutes