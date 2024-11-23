import express from "express"; // Importa o framework Express para criar a aplicação web.
import multer from "multer"; // Importa o módulo multer para lidar com uploads de arquivos.
import cors from "cors";

const corsOptions ={
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Importa as funções controladoras para posts vindas de postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
  // Configura o armazenamento de arquivos em disco
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo durante o upload
    cb(null, file.originalname);
  }
})

// Cria uma instância do middleware multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // Habilita o middleware para analisar corpos de requisições em formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") 
  // e é tratada pela função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
}
export default routes; // Exporta a função routes para uso em outros arquivos.