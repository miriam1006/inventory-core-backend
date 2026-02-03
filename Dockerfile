# 1. IMAGEN BASE: Usamos una versión ligera de Node.js
FROM node:18-alpine

# 2. DIRECTORIO DE TRABAJO: Creamos una carpeta dentro del contenedor
WORKDIR /app

# 3. DEPENDENCIAS: Copiamos solo los archivos de dependencias primero (para aprovechar caché)
COPY package.json package-lock.json ./

# 4. INSTALACIÓN: Instalamos las librerías
RUN npm install

# 5. CÓDIGO FUENTE: Copiamos el resto de tu código
COPY . .

# 6. CONSTRUCCIÓN: Convertimos TypeScript a JavaScript
RUN npm run build

# 7. PUERTO: Avisamos que la app escucha en el 3000
EXPOSE 3000

# 8. ARRANQUE: El comando para iniciar la app en producción
CMD ["npm", "run", "start:prod"]