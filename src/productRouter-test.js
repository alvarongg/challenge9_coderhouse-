const express = require("express");
const path = require('path');
const productRouterTest = express.Router();
console.log("Router Productos-Fake -- Cargado");
const { faker } = require('@faker-js/faker');
let options_path = path.join(__dirname,'..', 'DB','options.js');
const { optionsMySQL } = require(options_path);



function createRandomProduct() {
  return {
    id: faker.datatype.number({ min: 10, max: 50 }),
    title: faker.vehicle.vehicle(),
    price: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
    thumbnail: faker.internet.url()
  };
}





productRouterTest.use(express.json());
productRouterTest.use(express.urlencoded({ extended: true }));

// async function getAllProd(){
//   const resultado = await productos.getAll();
//   return resultado;
// }

// async function saveProd(obj){
//   await productos.save(obj);
// }

//devuelve todos los productos
productRouterTest.get("/", async (req, res) => {
  try {

    const array = [];

    Array.from({ length: 5 }).forEach(() => {
        array.push(createRandomProduct());
    });
 
   
    res.render('tabla',{array});
  } catch (error) {
    throw new Error("Hubo un error al listar todos los productos fake");
  }
});


module.exports = productRouterTest;
