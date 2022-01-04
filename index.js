const express = require('express');
const app = express();
const cors = require('cors');


const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');
const ordersRoutes = require('./routes/orders');

app.use(express());
app.use(cors());
app.use(express.json());


app.use('/user',userRoutes);
app.use('/dashboard',dashboardRoutes);
app.use('/orders',ordersRoutes);

app.listen(3001,()=>{
    console.log("SERVER IS RUNNING ON 3001");
});