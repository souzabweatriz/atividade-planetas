import { Router } from "express";

const filmesRoutes = Router()

let filmesMarcantes = [
    {
        id:  Number(Math.floor(Math.random() * 99) + 1),
        titulo:"Coraline",
        genero: "Animação",
        emCartaz: false
    },
    {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo:"Enrolados",
        genero: "Animação",
        emCartaz: false
    },
    {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo:"É assim que acaba",
        genero: "Romance",
        emCartaz: true,
    }
]

//rota para buscar todos os elementos do array de filmesMarcantes
filmesRoutes.get("/", (req, res) => {
    return res.status(200).send(filmesMarcantes)
})

//é uma rota para criar novo filmeMarcante
filmesRoutes.post("/", (req, res) => {
    const { titulo, genero, emCartaz} = req.body; //recebo um nome e um preço da minha req
    const novoFilme = {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo,
        genero,
        emCartaz
    }

    filmesMarcantes.push(novoFilme)
    return res.status(201).send(filmesMarcantes)
})

//rota para buscar um elemento especifico do array filmesMarcantes
filmesRoutes.get("/:id", (req, res) => {
    const { id } = req.params
    //console.log(id)

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id))

    //console.log (filme)

    if (!filme) {
        return res.status(404).send({ message: "Filme não foi encontrado!" })
    }
    return res.status(201).send(filme)

})

//rota para editar um FilmeMarcante
filmesRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id))

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
filmesRoutes.delete("/:id", (req, res) => {
    const { id } = req.params
    
    const filme = filmesMarcantes.find((movie) => movie.id === Number(id))
    if (!filme) {
        return res.status(404).send({ message: "Filme não foi encontrado!" })
    }
    filmesMarcantes = filmesMarcantes.filter((movie) => movie.id !== Number(id))
    
    return res.status(200).send({ message: "Filme deletado", filme})
    })
    
    export default filmesRoutes