//Archivo de contexto para manejar el estado de autenticación en toda la aplicación
//Utilizamos React Context para compartir el estado de autenticación 
//entre componentes sin necesidad de pasar props manualmente en cada nivel del árbol de componentes
//Objetivo: Permitir a los componentes acceder al estado de autenticación y a las funciones de inicio de sesión y cierre de sesión
//Verificar el rol del usuario para mostrar u ocultar ciertas partes de la interfaz de usuario según el rol del usuario
"use client";

import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, GoogleUser } from '@/context/types/user';
