console.log('main.js cargado');
const socket = io();


const authorSchema = new normalizr.schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new normalizr.schema.Entity("messages",{
    author:authorSchema
})
const messagesListSchema = new normalizr.schema.Entity("messagesList",{
    messages: [messageSchema]
})

const enviarMensaje = () => {
  console.log('enviarMensaje ejecutando');
  const email = document.querySelector("#email").value;
  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const age = parseInt(document.querySelector("#age").value);
  const alias = document.querySelector("#alias").value;
  const avatar = document.querySelector("#avatar").value;
  const date = new Date();
  const timeStamp = `${date.getDate() < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1)}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + (date.getHours()) : (date.getHours())}:${date.getMinutes() < 10 ? '0' + (date.getMinutes()) : (date.getMinutes())}:${date.getSeconds() < 10 ? '0' + (date.getSeconds()) : (date.getSeconds())}`
  const author = {email, name, surname, age, alias, avatar}
  const text = document.querySelector("#message").value;
  const message = {author, text, timeStamp};
  console.log('mensaje_enviado');
  socket.emit('new_message', message);
  return false;
}

const crearEtiquetasMensaje = (mensaje) => {
  const {author, text, timeStamp} = mensaje;
  return `
    <div class="message">
      <strong  class="badge badge-pill badge-primary email">${author.alias}</strong>
      <em class="date">${timeStamp}</em>
      <em class="msj">${text}</em>
    </div>
  `;
}

const createTagCompressionPercentage = (normalizedMessages, denormalizedMessages) => {
  const normalizedMessagesLength = JSON.stringify(normalizedMessages).length
  const denormalizedMessagesLength = JSON.stringify(denormalizedMessages).length
  const percentage = ((normalizedMessagesLength * 100) / denormalizedMessagesLength).toFixed(2)
  const tag = (`
  <>
      (Compresión: ${percentage}%)
  </>
  `)
  const percentageContainer = document.querySelector("#compressionPercentage");
  if (percentageContainer) percentageContainer.innerHTML = tag;
}



const agregarMensajes = (normalizedMessages) => {
  const denormalizedMessages = normalizr.denormalize(normalizedMessages.result, messagesListSchema, normalizedMessages.entities)
  const mensajes = denormalizedMessages.messages;
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
  document.getElementById("messages").innerHTML = mensajesFinal;
  createTagCompressionPercentage(normalizedMessages, denormalizedMessages);
}




// const enviarProducto = () => {
//   const title = document.getElementById("title").value;
//   const price = document.getElementById("price").value;
//   const thumbnail = document.getElementById("thumbnail").value;
//   const producto = { title, price , thumbnail };
//   socket.emit('new_product', producto);
//   return false;
// }

// const crearEtiquetasProductos= (producto) => {
//   const { id, title, price,thumbnail } = producto;
//   return `
//   <tr>
//   <th scope="row">${id}</td>  
//   <td>${title}</td>
//   <td>${price}</td>
//   <td>${thumbnail}</td>
//   </tr>
//   `;
// }

// const agregarProductos = (productos) => {
//   const headtable = `<table class="table">
//   <thead class="thead-dark">
//   <tr>
//     <th scope="col">#</th>
//     <th scope="col">Title</th>
//     <th scope="col">Price</th>
//     <th scope="col">Thumbnail</th>
//   </tr>
// </thead>
//   <tbody>`
//   const foottable = `</tbody>
//   </table>`
//   console.log('pepe')
//   console.log(productos);
//   const productos2 = productos.map(producto => crearEtiquetasProductos(producto)).join(" ");
//   const productosFinal = headtable.concat(productos2,foottable);
//   console.log('html:'+productosFinal);
//   document.getElementById("products").innerHTML = productosFinal;
// }


socket.on('messages', (messages) => agregarMensajes(messages));

socket.on('products', (products) => agregarProductos(products));