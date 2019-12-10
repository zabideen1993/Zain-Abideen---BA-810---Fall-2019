//Create a module that represents a sales order item.  It should have the 
//properties, product, quantity, price and a function to return the value of the item (price * quantity).

function SalesOrderItem(product, price, quantity) {
    let item = {};
    item.product = product;
    item.price = price;
    item.quantity = quantity;

    item.getPrice = function() {
        return item.price * item.quantity;
    }
    return item;
}

module.exports = SalesOrderItem;