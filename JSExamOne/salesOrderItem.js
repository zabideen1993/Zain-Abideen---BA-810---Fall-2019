function salesOrderItem(product, quantity, price) {
    let item={};
    item.product = product;
    item.price=price;
    item.quantity = quantity;
    item.value=function(){
        return item.price * item.quantity;
    }
  return item;
  }
  module.exports=salesOrderItem;