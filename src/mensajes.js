console.log("Container File System Mensajes -- Cargado");
const path = require('path');
const fs = require("fs");
//let schema_path = path.join(__dirname,'.', 'util','mensajes.json');
const normalizr = require ("normalizr");

const authorSchema = new normalizr.schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new normalizr.schema.Entity("messages",{
    author:authorSchema
})
const messagesListSchema = new normalizr.schema.Entity("messagesList",{
    messages: [messageSchema]
})

/**
 * Lee un array de objetos dentro de un archivo, retorna un array de objetos json
 * @param {string} fileName
 * @returns Array de objetos contenido en el archivo
 */
const fileToArray = async (fileName) => {
  try {
    //leer archivo y cargarlo en array
    //devolver array
    return JSON.parse(await fs.promises.readFile(fileName));
  } catch (error) {
    console.log("Se produjo un error!");
    throw error;
  }
};

/**
 * Escribe el array completo en un archivo
 * @param {string} fileName
 * @param {obj} array
 */
const arrayToFile = async (fileName, array) => {
  try {
    //leer archivo y cargarlo en array
    await fs.promises.writeFile(fileName, JSON.stringify(array));
  } catch (error) {
    throw error;
  }
};

/**
 * Crea un archivo nuevo con el nombre recibido por parametro
 * @param {string} fileName
 */
const createEmptyFile = async (fileName) => {
  try {
    //leer archivo y cargarlo en array
    await fs.promises.writeFile(fileName, "[]");
  } catch (e) {
    throw error;
  }
};

/**
 * Valida que exista el archivo, si no existe lo crea llamando a createEmptyFile(fileName)
 * @param {string} fileName 
 */
const fileChecker = async (fileName) => {
  //chequeo que el archivo exista si no existe lo creo
  const stats = fs.existsSync(fileName);

  if (!(stats)) {
    console.log(`Creo archivo vacio: ${fileName}`);
    await createEmptyFile(fileName);
  }
};

module.exports = class MensajesFs {
  constructor(fileName) {
    //this.container = [];
    this.fileName = fileName;
  }

  /**
   * Guarda agrega un objeto array
   * @param {string} obj
   * @returns Id del objeto guardado
   */
  async save(obj) {
    try { 
      console.log('save');
        //chequeo que el archivo exista si no existe lo creo
         await fileChecker(this.fileName);
      let array = await fileToArray(this.fileName);
      let longitud = array.length;
      let index = 0;
      //Valido que el array tenga objetos
      if (longitud == 0) {
        index = 1;
      } else {
        //sumar uno al id del ultimo elemento y agregarlo al id del objeto
        index = array[longitud - 1].id + 1;
      }

      obj.id = index;
      array.push(obj);
      //escribir archivo
      await arrayToFile(this.fileName, array);
      //devolver id
      return obj.id;
    } catch (error) {
      throw error;
    }
  }

  
  /**
   *
   * @returns Devuelve todos los objetos del array
   */
  async getAll() {
    try {
      console.log('getAll');
      await fileChecker(this.fileName);
      return  fileToArray(this.fileName);
    } catch (error) {
      throw error;
    }
  }

/**
 * 
 * @returns lista de mensajes normalizados
 */
  async normalize(){
    const messages = await this.getAll();
    const messagesToNormalize = {
      id:1,
      messages:messages
    }
    const normalized = normalizr.normalize(messagesToNormalize, messagesListSchema);
    return normalized
  }

};


//   const  prueba = async () => {

//   let options_path = path.join(__dirname,'..', 'DB','mensajes.json');
//   const mensajes = new MensajesFs(options_path);
//   console.log( await mensajes.normalize());
// };


// prueba();
