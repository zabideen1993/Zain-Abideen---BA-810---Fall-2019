import { inject } from 'aurelia-framework';
import { Gadget } from "../resources/data/gadget-object";

@inject(Gadget)
export class Gadgets {
    constructor(gadget) {
        this.gadget = gadget;
        //this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
        this.statuses = ['Gadget', 'In Process', 'Completed'];
        this.isCheckedCompleted = true;
        this.showForm = false;
    }
    async attached() {
        await this.getGadgets();
    }

    async getGadgets() {
        await this.gadget.getGadgets();
        this.showForm = false;
    }

    updateGadget(gadget) {
        this.gadget.selectedGadget = gadget;
        this.saveGadget();
    }
    newGadget() {
        this.gadget.newGadget();
        this.showForm = true;
    }
    editGadget(gadget) {
        this.gadget.selectedGadget = gadget;
        this.showForm = true;
    }
    async saveGadget() {
        await this.gadget.saveGadget()
        this.getGadgets();
    }
    async deleteGadget(gadget) {
        await this.gadget.deleteGadget(gadget._id);
        this.getGadgets();
    }

    Cancel() {
        this.showForm = false;
    }

}