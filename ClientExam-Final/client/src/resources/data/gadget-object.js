import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Gadget {
constructor(data) {
        this.data = data;
        this.GADGET_SERVICE = 'gadgets';
    }
 newGadget(){
        this.selectedGadget = {};
    this.selectedGadget.Yoo="";
    this.selectedGadget.Hoo="";
    //     this.selectedGadget.gadget= "";
    //     this.selectedGadget.detail = "";
    //     this.selectedGadget.dateDue = new Date();
        //this.selectedGadget.status = "Gadget";
        //this.selectedGadget.userId = id;
    //this.selectedGadget.userObj="";
      }
      async saveGadget() {
        let serverResponse;
        if (this.selectedGadget) {
          if (this.selectedGadget._id) {
            let url = this.GADGET_SERVICE + "/" + this.selectedGadget._id;
            serverResponse = await this.data.put(this.selectedGadget, url);
          } else {
            serverResponse = await this.data.post(this.selectedGadget, this.GADGET_SERVICE);
          }
          return serverResponse;
    
        }
      }
    async getGadgets(userid) {
        this.gadgetsArray = [];
            let url = this.GADGET_SERVICE;// + '/user/' + userid;
            let response = await this.data.get(url);
            if (!response.error) {
              this.gadgetsArray = response;
            } else {
              this.gadgetsArray = [];
            }
          }
        
        async deleteGadget(id){
            let url = this.GADGET_SERVICE + "/" + id;
                await this.data.delete(url);
         
        }
 }



