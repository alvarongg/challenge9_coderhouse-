const express = require("express");
const path = require("path");
const moment = require("moment");
const { productRouter, getAllProd, saveProd } = require("./productRouter.js");
const productRouterTest = require("./productRouter-test.js");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
//const MensajesSqlite = require("./mensajes.js");
const MensajesFs = require("./mensajes.js");

// let options_path = path.join(__dirname,'..', 'DB','options.js');
// const { optionsSqlite } = require(options_path);
const app = express();

const tabla_chat = "mensajes";
let options_path = path.join(__dirname, "..", "DB", "mensajes.json");
//let chat = new MensajesSqlite(optionsSqlite,tabla_chat);
let chat = new MensajesFs(options_path);

//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOATLAS,
      mongoOptions: adavancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

let views_path = path.join(__dirname, "..", "views");
app.use(express.static("public"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("views", views_path);
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use("/api/productos", productRouter);
app.use("/api/productos-test", productRouterTest);

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/chat", (req, res) => {
  res.render("new_chat");
});

// app.listen(8080, () => {
//   console.log("Estoy escuchando 8080 --engine handlebars");
// });

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on("connection", async (socket) => {
  //emite los mensajes y productos actuales
  socket.emit("messages", await chat.normalize());
  socket.emit("products", await getAllProd());

  // socket.on('new_product', async  (producto) => {
  //   //inserta el producto que le llego
  //   console.log(`saved prod: ${producto}`);
  //    saveProd(producto);
  //   socketServer.sockets.emit('products', await getAllProd());

  // });

  socket.on("new_message", async (mensaje) => {
    console.log("ejecutando  guardado de mensaje");
    await chat.save(mensaje);
    console.log("nuevo mensaje guardado");
    socketServer.sockets.emit("messages", await chat.normalize());
  });
});

//Manejador de errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});

httpServer.listen(process.env.PORT || 8080, () => {
  console.log("Estoy escuchando en el puerto 8080");
});
