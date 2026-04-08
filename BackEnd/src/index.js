
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './routes/usuario.route.js'
import empleadoRoute from './routes/empleado.route.js';
import connectDB from './database.js';
connectDB();

const app = express();
app.set('Port',4000);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({origen:'*'}));
app.use('/api',userRoute);
app.use('/api/empleado',empleadoRoute);
app.listen(app.get('Port'),()=>{
    console.log(`Servidor escuchando por el puerto: ${app.get('Port')}`);
})
/*
app.use('/',(req,res)=>{
    res.status(200).json({
        ok:true,
        message: "Mi primer programa en Node.js!!!"
    });
});
*/
