import { Router } from "express";
import planetasRoutes from "./planetas.routes.js";

const routes = Router()

routes.get("/",(req, res) => {
    return res.status(200).send({ message: "vai curintia"})
   })

routes.use("/planetas", planetasRoutes)
export default routes