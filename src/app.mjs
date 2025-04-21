import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import router from './routes/superHeroRoutes.mjs';

//superHeroRoutes(app)
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware para parsear JSON
app.use(express.json());

//Conexión a MongoDB
connectDB();

//Motores de Plantilla EJS
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

//Configuración de rutas
app.use('/', router);
app.get('/', (req, res) =>{
    res.render('dashboard')
});

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({mensaje: "Ruta no encontrada" });
});

//Iniciar el Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})