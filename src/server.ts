// Importando biblioteca
import express,{ Request, Response, NextFunction } from "express";
import "express-async-errors"
import "reflect-metadata";
import "./database/index";
const cors = require('cors');

// Importando funções de rotas
import { router } from "./routes";

const app = express();


// Declarando a biblioteca
app.use(express.json()); 
app.use(cors())
// Inicializando a função de rotas
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        
        if (err instanceof Error ){
            return response.status(400).json({
                error: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
)
// Inicializando o servidor
console.log("Start Server At:3000");
app.listen(3000);