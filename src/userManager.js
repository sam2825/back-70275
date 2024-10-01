import fs from 'fs';
import path from 'path';
import config from './config.js';

const usersFilePath = path.join(config.DATA_DIR, 'users.json');


const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        return []; 
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};


const saveUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};


export const createUser = (userData) => {
    const users = readUsersFromFile();
    const maxId = Math.max(...users.map(user => user.id)) || 0;

    const newUser = {
        id: maxId + 1,
        ...userData
    };

    users.push(newUser);
    saveUsersToFile(users);
    return newUser;
};

export const getAllUsers = () => {
    return readUsersFromFile();
};


export const getUserById = (id) => {
    const users = readUsersFromFile();
    return users.find(user => user.id === id);
};

// Actualizar un usuario
export const updateUser = (id, updatedData) => {
    const users = readUsersFromFile();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    users[index] = { ...users[index], ...updatedData };
    saveUsersToFile(users);
    return users[index];
};

export const deleteUser = (id) => {
    const users = readUsersFromFile();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    const deletedUser = users.splice(index, 1);
    saveUsersToFile(users);
    return deletedUser[0]; 
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
