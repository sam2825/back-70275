import { Router } from 'express';
import { uploader } from '../uploader.js';

const router = Router();

const products = [
    { id: 1, title: 'Jugo de Naranja', description: 'Jugo fresco de naranjas seleccionadas', price: 150, stock: 100, category: 'Jugos', thumbnails: ['/images/naranja.jpg'], status: true },
    { id: 2, title: 'Jugo de Manzana', description: 'Delicioso jugo de manzanas verdes', price: 120, stock: 150, category: 'Jugos', thumbnails: ['/images/manzana.jpg'], status: true },
    { id: 3, title: 'Jugo de Piña', description: 'Jugo natural de piña tropical', price: 180, stock: 80, category: 'Jugos', thumbnails: ['/images/pina.jpg'], status: true }
];

const auth = (req, res, next) => {
    console.log('Ejecutando middleware de autenticación de usuario');
    next();
};

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: products });
});

router.post('/', auth, uploader.array('thumbnail', 3), (req, res) => {
    const { title, description, price, stock, category } = req.body;

    if (!title || !description || !price || !stock || !category) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios', data: [] });
    }

    const maxId = Math.max(...products.map(product => product.id)) || 0;
    const newProduct = {
        id: maxId + 1,
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock), 
        category,
        thumbnails: req.files ? req.files.map(file => file.path) : [], 
        status: true 
        };

    products.push(newProduct);
    res.status(201).send({ error: null, data: newProduct });
});

router.put('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === id);

    if (index > -1) {
        const { title, description, price, stock, category } = req.body;

        if (!title || !description || !price || !stock || !category) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios', data: [] });
        }

    
        products[index] = {
            ...products[index], 
            title,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category
        };
        res.status(200).send({ error: null, data: products[index] });
    } else {
        res.status(404).send({ error: 'Producto no encontrado', data: [] });
    }
});

router.delete('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === id);

    if (index > -1) {
        products.splice(index, 1);
        res.status(200).send({ error: null, data: 'Producto eliminado' });
    } else {
        res.status(404).send({ error: 'Producto no encontrado', data: [] });
    }
});

export default router;
