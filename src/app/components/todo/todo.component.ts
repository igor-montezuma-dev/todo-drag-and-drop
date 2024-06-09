import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  updateItem!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      activity_name: ['', [Validators.required]],
    });
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.activity_name,
      done: false,
    });
    this.todoForm.reset();
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls['activity_name'].setValue(item.description);
    this.updateItem = i;
    this.isEditEnabled = true;

  }

  UpdateTask() {
    this.tasks[this.updateItem].description = this.todoForm.value.activity_name;
    this.isEditEnabled = false;
    this.todoForm.reset();
  }

  setCompleted(i: number) {
    const task: ITask = {
      description: this.inProgress[i].description,
      done: true,
    };
    this.done.push(task);
    this.inProgress.splice(i, 1);
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1);
  }

  deleteCompletedTask(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
