function salesOrder(customer, tax)
  {
      let salesOrder=[];
      salesOrder.customer = customer;
      salesOrder.tax = tax;

      
      salesOrder.addItem = function (salesItem) {
        salesOrder.push(salesItem);
      }

      salesOrder.totalValue=function(){
          let sum=0;
          salesOrder.forEach(salesItem=>{
              sum += salesItem.value();
          });
        return sum;
      }

      salesOrder.totalPrice = function(){
          let totalValue = salesOrder.totalValue();
          return totalValue + (totalValue  * tax);
      }
      return salesOrder;
  }
  module.exports=salesOrder;