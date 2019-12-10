export class FilterGadgetsValueConverter {
      toView(gadgets, nofilterGadgets) {
        if (!gadgets) return;
        if (nofilterGadgets) return gadgets;
        let filteredGadgets = [];
        gadgets.forEach(gadget => {
          if (gadget.status !== 'Completed') filteredGadgets.push(gadget);
        });
        return filteredGadgets;
      }
    }
    