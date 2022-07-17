# TODO

* Implementar archivo de configuracion con dot-env
* Login con formulario con persistencia de sesion en mongo (MongoStore)
* Implementar SIGN-UP con mongo (usr pws) passport
* Implementar chequeo de login  (usr pws) passport
* 



## Consigna clase 24
Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.

Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.

Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.

Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.


La solución entregada deberá persistir las sesiones de usuario en Mongo Atlas.
* Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.
* Mediante el cliente web de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.
* Borrar una sesión de cliente en la base y comprobar que en el próximo request al usuario se le presente la vista de login.
* Fijar un tiempo de expiración de sesión de 10 minutos recargable con cada visita del cliente al sitio y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.

https://docs.google.com/presentation/d/1B2G4mLToIxlNE9_gjV0S4_p3rxfxjmxBvcWDogWtI5g/edit#slide=id.ged77f6d7ec_0_1100 




## Consigna de clase 26 
Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:
Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).
Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.
Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.

Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.
Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.

Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).
El resto de la funciones, deben quedar tal cual estaban el proyecto original.

https://docs.google.com/presentation/d/1jc2JvLefomv1T714rVkKVNsinrQ54Q7tle7Fl43DowQ/edit#slide=id.g1033303fb65_0_14