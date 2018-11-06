import VendService from "./VendService.js";
//PRIVATE

//Instatiates an instance of the VendService to be used for this controller
let vendService = new VendService()

//Updates the total on the page
function drawTotal(val) {
  document.getElementById('change').innerText = val
}

//at the start of the application, draws all products
function drawProducts() {
  //gets products from the vend service
  let products = vendService.getProducts()
  let template = ''
  //builds template from each prodcut into template string
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.quantity > 0) {
      template += `
        <div>
          <p>${product.name} - $${product.price}</p>
          <button onclick="app.controllers.vendController.vendItem(${i})">BUY</button>
        </div>
      `
    }
  }
  //adds template string to table
  document.getElementById('products').innerHTML = template
}

function drawBought(image) {
  console.log(image)
  document.getElementById("productBought").innerHTML = (image) ? `
    <img src="${image}" width = "450" alt="">` :
    `<h1>Not Enough Money</h1>`
}

//PUBLIC
export default class VendController {
  constructor() {
    //calls the draw products at the start of the application
    drawProducts()
  }
  addQuarter() {
    //adds quarter to vending machine and returns the total
    let total = vendService.addQuarter()
    //after adding quarter re-draws total
    drawTotal(total)
  }
  vendItem(productIndex) {
    //attempts to process the vend item
    let item = vendService.vendItem(productIndex)
    //you will want to check that item exists and then draw it to the screen
    drawProducts()
    drawTotal(vendService.getChange())
    drawBought(item.image)
  }
  returnChange() {
    drawTotal(vendService.returnChange())
  }
}