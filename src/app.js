import express from 'express';
import handlebars from 'express-handlebars';

import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'; 
import config from './config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/views', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); 
app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});