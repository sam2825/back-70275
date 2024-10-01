import express from 'express';

const router = express.Router();

const products = [
    { id: "1", title: "Jugo de Naranja", price: 2.5 },
    { id: "2", title: "Jugo de Manzana", price: 2.0 },
    { id: "3", title: "Jugo de Piña", price: 3.0 },
    { id: "4", title: "Jugo Verde", price: 3.5 }
];

let carts = [
    { id: "1", products: [] }
];

router.post('/', (req, res) => {
    const newCart = {
        id: `${carts.length + 1}`,
        products: []
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});

router.post('/:cid/products/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find(cart => cart.id === cid);
    const product = products.find(product => product.id === pid); 
    
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    cart.products.push({ productId: pid, quantity: 1 });

    res.status(200).json({ message: 'Producto agregado al carrito', cart });
});


export default router;
