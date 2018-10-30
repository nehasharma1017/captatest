import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

declare var jQuery: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  desc: string;
  data: any;
  titleError: false;
  descError: false;
  isEdit: false;
  constructor(private _dataService: DataService, private _toastr: ToastrService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this._dataService.getData().subscribe(res => {
      console.log("res-----", res);
      this.data = res['documents'];
    }, error => {
      console.log("Error-----", error);
    });
  }

  addItem = function () {
    let error = false;
    if (!this.title) {
      this.titleError = true;
      error = true
    }
    if (!this.desc) {
      this.descError = true;
      error = true
    }
    if (error) {
      return
    }

    console.log(this.title + this.desc);
    let payLoad = {
      "fields":
        {
          "title":
            {
              "stringValue": this.title
            },
          "description":
            {
              "stringValue": this.desc
            }
        }
    }
    let promiseObj = this._dataService.insertData(payLoad);
    promiseObj.then((res: any) => {
      jQuery('#myModal').modal('hide');
      this._toastr.success('Item added successfully');
      this.getData();
      console.log("inserted-----", res);
    });
  }


  updateState(event) {
    this[event.target.name + 'Error'] = false;
  }

  editData = function (item) {
    this.isEdit = true;
    this.title=item.description.stringValue;
    this.desc=item.title.stringValue;
  }
  saveEditedData=function(){
    this.isEdit = false;
    this.addItem();
  }

  deleteData = function (name) {
    let id = name.split('/');
    id = id[id.length - 1]
    let promiseObj = this._dataService.deleteData(id);
    promiseObj.then((res: any) => {
      this._toastr.success('Item deleted successfully');
      this.getData();
      console.log("deleted-----", res);
    });
  }

}
