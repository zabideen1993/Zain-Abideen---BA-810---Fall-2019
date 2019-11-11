let salesOrderItem = require ('./salesOrderItem');
let salesOrder = require ('./salesOrder');

let widget = new salesOrderItem("Widget", 10, 2.5);
let gidget = new salesOrderItem("Gidget", 20, 1.0);

let zainsOrders = new salesOrder("Zain", 0.10);


zainsOrders.addItem(widget);
zainsOrders.addItem(gidget);


console.log(zainsOrders.totalPrice());