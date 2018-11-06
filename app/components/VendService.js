//PRIVATE
import VendingMachine from "../models/VendMachine.js";
import Fredos from "../models/Fritos.js";
import Tab from "../models/Tab.js";
import MtDew from "../models/MtDew.js";

//instatiates an instance of the vending machine class
let vm = new VendingMachine(100, [new Fredos(), new Tab(), new MtDew()])

//PUBLIC
export default class VendService {
  //increases currentTransaction and returns new total
  addQuarter() {
    vm.currentTransaction += .25
    return vm.currentTransaction
  }
  //attempts to get the item requested from its index
  vendItem(productIndex) {
    //check if valid
    let product = vm.products[productIndex]
    // IF Exists    we have some            you have enough money
    if (product && product.quantity > 0 && vm.currentTransaction >= product.price) {
      this.processTransaction(product)
      return JSON.parse(JSON.stringify(product))
    }
    return false
  }
  //updates vending data on successful transaction
  processTransaction(product) {
    product.quantity--
    vm.totalMoney += product.price
    vm.currentTransaction -= product.price
  }
  //returns all products from the vending machine
  getProducts() {
    //breaks refrence in memory to protect code
    return JSON.parse(JSON.stringify(vm.products))
  }
  returnChange() {
    vm.currentTransaction = 0
    return vm.currentTransaction
  }
  getChange() {
    return vm.currentTransaction
  }
}