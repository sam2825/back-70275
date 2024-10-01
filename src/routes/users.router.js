import { Router } from 'express';
import { uploader } from '../uploader.js';

const router = Router();

const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', email: 'juan@example.com', age: 30 },
    { id: 2, firstName: 'Carlos', lastName: 'Perren', email: 'carlos@example.com', age: 25 },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez', email: 'luis@example.com', age: 28 }
];

const auth = (req, res, next) => {
    console.log('Ejecutando middleware de autenticación de usuario');
    next();
};

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: users });
});

router.post('/', auth, uploader.single('thumbnail'), (req, res) => {
    const { firstName, lastName, email, age } = req.body;

    if (!firstName || !lastName || !email || !age) {
        return res.status(400).send({ error: 'Todos los campos son obligatorios', data: [] });
    }

    const maxId = Math.max(...users.map(user => user.id)) || 0;
    const newUser = {
        id: maxId + 1,
        firstName,
        lastName,
        email,
        age: parseInt(age),
        thumbnail: req.file ? req.file.path : null 
        };
    
    users.push(newUser);
    res.status(201).send({ error: null, data: newUser });
});

router.put('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index > -1) {
        const { firstName, lastName, email, age } = req.body;

        if (!firstName || !lastName || !email || !age) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios', data: [] });
        }

        users[index] = {
            ...users[index],
            firstName,
            lastName,
            email,
            age: parseInt(age)
        };
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: 'Usuario no encontrado', data: [] });
    }
});

router.delete('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index > -1) {
        users.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario eliminado' });
    } else {
        res.status(404).send({ error: 'Usuario no encontrado', data: [] });
    }
});

export default router;