# challenge9_coderhouse -- 

##Consigna 1: 
Sobre el desafío entregable de la clase 8 (sql y node: nuestra primera base de datos), crear una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con 5 productos generados al azar utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Elegir apropiadamente los temas para conformar el objeto ‘producto’ (nombre, precio y foto).

##Consigna 2: 
Ahora, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).
El nuevo formato de mensaje será:
```json

{
   "author":{
      "id":"mail del usuario",
      "nombre":"nombre del usuario",
      "apellido":"apellido del usuario",
      "edad":"edad del usuario",
      "alias":"alias del usuario",
      "avatar":"url avatar (foto, logo) del usuario"
   },
   "text":"mensaje del usuario"
}

```

## Nota 1: 
  Hice toda la implementacion con FS 

## Despliegue 📦

* Instalacion de depedencias
```bash
npm i 
```


* Ejecucion del proyecto handlebars (se ejecuta en puerto 8080) :godmode:
```bash
npm run start
```


## Web Endpoits 

* [Consigna 1 /productos-test](http://localhost:8080/api/productos-test)
* [Consigna 2 /chat](http://localhost:8080/api/chat)
## Construido con 🛠️

* [Express🛰️](https://expressjs.com/es/4x/api.html)
* [Handlebars :writing_hand:](https://handlebarsjs.com/)
* [Socket.io :electric_plug:](https://socket.io/)
* [Bootstrap :star_struck:](https://getbootstrap.com/)
* [Moment.js :stopwatch:](https://momentjs.com)
* [Fs](https://nodejs.org/api/fs.html)
* [Normalizr](https://github.com/paularmstrong/normalizr)


## ppt 24 
https://docs.google.com/presentation/d/1B2G4mLToIxlNE9_gjV0S4_p3rxfxjmxBvcWDogWtI5g/edit


## ppt 26 
https://docs.google.com/presentation/d/1jc2JvLefomv1T714rVkKVNsinrQ54Q7tle7Fl43DowQ/edit#slide=id.geefa9019ca_0_894
