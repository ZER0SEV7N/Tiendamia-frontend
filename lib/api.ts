//Libreria para realizar peticiones HTTP
//Mediante axios, que es una libreria de cliente HTTP basada en promesas para el navegador y node.js
import axios from 'axios';
const API_URL = 'http://localhost:8080/api'; // Cambia esto por la URL de tu API

//Creamos una instancia de axios con la URL base de la API
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

//Interceptors para agregar el token a cada solicitud y manejar errores de autenticación
api.interceptors.request.use(
    (config) => {
        if(typeof window !== 'undefined') {
            const token = localStorage.getItem('token');

            if (token) 
                config.headers['Authorization'] = `Bearer ${token}`;

            if(config.data instanceof FormData) 
                delete config.headers['Content-Type'];
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

//Interceptor para manejar respuestas 401 y redirigir al login si el token es inválido o ha expirado
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequestUrl = error.config.url;
            if (typeof window !== 'undefined' && !originalRequestUrl.includes('/login')) {
                localStorage.removeItem('token');
                window.location.href = '/login'; 
            }
        }
        return Promise.reject(error);
    }
);

export default api;


