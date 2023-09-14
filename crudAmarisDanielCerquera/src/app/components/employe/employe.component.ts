import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeModel } from 'src/app/model/employe_model';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  userDetails: any;
  listEmploye: EmployeModel[] = [];
  formEmploye: FormGroup = new FormGroup({});
  formEmployeId: FormGroup = new FormGroup({});
  isUpdate: boolean = false;


  constructor(private employeService: EmployeService) {

  }

  ngOnInit(): void {
    this.list();
    this.formEmploye = new FormGroup({
      id: new FormControl(''),
      employee_name: new FormControl(''),
      employee_salary: new FormControl(''),
      employee_age: new FormControl(''),
      profile_image: new FormControl(''),
      status: new FormControl('1')
    });

    this.formEmployeId = new FormGroup({
      idFind: new FormControl('')
    });

  }

  list() {

    this.employeService.getEmployees().subscribe((data: any) => {
      this.listEmploye = Array.isArray(data) ? data : [data];
    });

    /*this.employeService.getEmployeById(this.formEmployeId.value.idFind).subscribe((data: any) => {
      this.listEmploye = data;
    });*/


    /*if (this.formEmployeId.value.idFind) {
      this.employeService.getEmployeById(this.formEmployeId.value.idFind).subscribe((data: any) => {
        this.listEmploye = [data];
      });
    } else {
      this.employeService.getEmployees().subscribe((data: any) => {
        this.listEmploye = data;
      });
    }*/

  }


  listById() {

    if(this.formEmployeId.value.idFind != null && this.formEmployeId.value.idFind != ""){
      this.employeService.getEmployeById(this.formEmployeId.value.idFind).subscribe((data: any) => {
        this.listEmploye = Array.isArray(data) ? data : [data];
      })
    }else{
      this.list();
    }

  }

  save() {
    this.formEmploye.controls['status'].setValue('1');
    this.employeService.createtEmploye(this.formEmploye.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formEmploye.reset();
      }
    });
  }

  updateEmploye() {
    this.employeService.updateUser(this.formEmploye.value.id, this.formEmploye.value).subscribe(resp => {
      if (!resp) {
        this.list();
        this.formEmploye.reset();
      }
    }
    );
  }
  deleteEmploye(employe: EmployeModel): void {
    this.employeService.deleteEmploye(employe.id).subscribe(
      resp => this.employeService.getEmployees().subscribe(
        respose => this.listEmploye = respose
      )
    );
  }

  newEmploye() {
    this.isUpdate = false;
    this.formEmploye.reset();
  }


  selectItem(employe: EmployeModel): void {
    this.isUpdate = true;
    this.formEmploye.controls['id'].setValue(employe.id);
    this.formEmploye.controls['employee_name'].setValue(employe.employee_name);
    this.formEmploye.controls['employee_salary'].setValue(employe.employee_salary);
    this.formEmploye.controls['employee_age'].setValue(employe.employee_age);
    this.formEmploye.controls['profile_image'].setValue(employe.profile_image);
  }
}
