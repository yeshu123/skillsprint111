import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css'],
})
export class Popup2Component implements OnInit {
  
[x: string]: any;
  formdata: FormGroup;
  // public listitems: Array<string> = [];
  // programCode: any;
  id: any;
  historyId: any;
  resp: any;
  code: string = '';
  editdata: any;
  datepipe: any;
  // programStatus: "Submitted";


  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private submitSevice: SubmitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {


    this.api
      .GetCompanybycode(this.data.item.historyId)
      .subscribe((response) => {
        this.resp = response;
        this.formdata = this.builder.group({
          historyId: [this.resp.historyId],
          programStatus:"Submitted",
          programCode: [this.resp.programCode],
          smeComments:[this.resp.smeComments]

          // smeStatus: [this.resp.smeStatus, Validators.required],
        });
      });
  }

  closepopup() {
    this.dialog.closeAll();
  }

  onSubmit() {
    // this.isSubmitDisabled = true;
    
    let data =  this.formdata.value;
      this.api
        .UpdateProgramCode(this.data.item.historyId, data)
        .subscribe((response) => {
         
          console.log(data);
          this.formdata.controls['programCode'].disable();
          this.closepopup();
          alertify.success('Updated successfully.');
        });

    }
    }

  