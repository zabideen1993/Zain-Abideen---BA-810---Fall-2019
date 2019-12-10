//Create a module that represents a sales order that has the properties customer, 
//sales tax rate and an array of items.  It should have a function to return the value 
//of the items (sum the item price times quantity) and a function that returns 
//total value (sum of the value of the items plus the sales tax).

function SalesOrder(customer, salesTaxRate, items) {
    salesOrder = {};
    salesOrder.customer = customer;
    salesOrder.salesTaxRate = salesTaxRate;
    salesOrder.items = items;

    salesOrder.getValue = function() {
        totalValue = 0.0;
        salesOrder.items.forEach(item => {
            totalValue = totalValue + item.getPrice();
        });
        return totalValue;
    }


    salesOrder.getTotalValue = function () {
        priceWithoutSalesTax = salesOrder.getValue();
        priceWithSalesTax = salesOrder.getValue() + (priceWithoutSalesTax * salesOrder.salesTaxRate);
        return priceWithSalesTax;
    }

    return salesOrder;
}

module.exports = SalesOrder;