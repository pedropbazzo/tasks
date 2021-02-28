import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/shared/service/task.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.css']
})
export class TaskFormDialogComponent implements OnInit {
  public taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    private fb: FormBuilder,
    private rest: TaskService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      taskLink: ['', [Validators.required]],
      taskDate: ['', [Validators.required]],
      taskTime: ['', [Validators.required]]
    });
  }

  createTask(){
    let newDate: moment.Moment = moment.utc(this.taskForm.value.taskDate).local();
    this.taskForm.value.taskDate = newDate.format("YYYY-MM-DD") + 'T' + this.taskForm.value.taskTime;
    console.log(this.taskForm.value);
    this.rest.postTasks(this.taskForm.value).subscribe(result => {});
    this.dialogRef.close(true);
    this.taskForm.reset();
    window.location.reload();
  }

  cancel(){
    this.dialogRef.close(true);
    this.taskForm.reset();
  }

}
