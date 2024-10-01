import express from 'express';

const router = express.Router();

let products = [
    {
        id: "1",
        title: "Jugo de Naranja",
        description: "Jugo fresco de naranjas 100% natural.",
        status: true,
        stock: 50,
        category: "Jugos",
        thumbnails: [
            
        ],
        code: "JU-001",
        price: 2.00
    },
    {
        id: "2",
        title: "Jugo de Manzana",
        description: "Delicioso jugo de manzana con un toque de canela.",
        status: true,
        stock: 30,
        category: "Jugos",
        thumbnails: [
        
        ],
        code: "JU-002",
        price: 1.80
    },
    {
        id: "3",
        title: "Jugo de Piña",
        description: "Jugo refrescante de piña tropical.",
        status: true,
        stock: 40,
        category: "Jugos",
        thumbnails: [
        ],
        code: "JU-003",
        price: 2.50
    },
    {
        id: "4",
        title: "Jugo de Fresa",
        description: "Rico jugo de fresas frescas, ideal para el verano.",
        status: true,
        stock: 20,
        category: "Jugos",
        thumbnails: [
        ],
        code: "JU-004",
        price: 2.30
    },
    {
        id: "5",
        title: "Jugo Verde",
        description: "Una mezcla saludable de espinacas, manzana y pepino.",
        status: true,
        stock: 15,
        category: "Jugos",
        thumbnails: [
        ],
        code: "JU-005",
        price: 3.00
    },
    {
        id: "6",
        title: "Jugo de Sandía",
        description: "Refrescante jugo de sandía, perfecto para el calor.",
        status: true,
        stock: 25,
        category: "Jugos",
        thumbnails: [
        ],
        code: "JU-006",
        price: 1.90
    }
];

export default router;
