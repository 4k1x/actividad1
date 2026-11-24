
FROM nginx:alpine

# Copiamos los archivos de la web al directorio publico de Nginx
COPY . /usr/share/nginx/html

# Indicamos que el contenedor escucha en el puerto 80
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]
