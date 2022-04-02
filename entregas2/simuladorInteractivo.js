class Cookies {
  constructor(flavor, topping, price) {
    this.flavor = flavor;
    this.topping = topping;
    this.price = price;
    this.cooked = false;
    this.soldOut = false;
  }
  cook() {
    this.cooked = true;   
    alert("La galleta esta cocinada");
  }
  sell() {
    if (this.cooked == false) {
      alert("debe estar cocinada la galleta");
    } else {
      this.soldOut = true;
      alert("Galleta vendida")
    }
  }
}

let newCookie = {};

function addCookie() {
  let flavor = "";
  let topping = "";
  let price = 0;
  while (flavor.length == 0) {
    let input = prompt(
      "ingrese uno de estos sabores: 'vainilla','chocolate','naranja'"
    );
    input = input.toLowerCase();

    if (input == "vainilla" || input == "chocolate" || input == "naranja") {
      flavor = input;
    } else {
      alert("ingrese un sabor valido");
    }
  }
  while (topping.length == 0) {
    let input = prompt(
      "ingrese uno de estos topping: 'chocolate','avena','nueces'"
    );
    input = input.toLowerCase();
    if (input == "chocolate" || input == "avena" || input == "nueces") {
      topping = input;
    } else {
      alert("ingrese un topping valido");
    }
  }

  while (price == 0) {
    const input = parseFloat(prompt("ingrese el precio"));
    if (input != 0) {
      price = input;
    } else {
      alert("ingrese un valor valido");
    }
  }
  newCookie = new Cookies(flavor, topping, price);
  alert(`la galleta es de ${flavor}, el topping es ${topping} y el precio es ${price}`)
}

function cookCookie() {
  if ("flavor" in newCookie) {
    newCookie.cook()
  } else {
    alert("debe crear agregar galleta");
  }
}

function sellCookie() {
  if ("flavor" in newCookie) {
    newCookie.sell()
  } else {
    alert("debe agregar galleta");
  }
}
