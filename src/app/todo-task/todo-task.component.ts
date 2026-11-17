
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Itodo {
  todoItem: string;
  todoId: number;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.sass']
})
export class TodosComponent implements OnInit {
  @ViewChild('todoItem') todoItem!: ElementRef<HTMLInputElement>;

  todosArr: Itodo[] = [
    { todoItem: 'JS', todoId: 121 },
    { todoItem: 'TS', todoId: 122 },
    { todoItem: 'Angular', todoId: 123 }
  ];

  editTodo!: Itodo;
  isInEditMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onTodoAdd(todo: HTMLInputElement): void {
    let val = todo.value;
    let TODO_OBJ: Itodo = {
      todoItem: val,
      todoId: Date.now()
    }
    todo.value = '';
    this.todosArr.unshift(TODO_OBJ);
    
  }

  onTodoUpdate(): void {
   let UPDATE_ID = this.editTodo.todoId;
   let UPDATED_OBJ: Itodo = {
    todoItem: this.todoItem.nativeElement.value,
    todoId: UPDATE_ID
   };
   this.todoItem.nativeElement.value = '';

   let getIndex = this.todosArr.findIndex(t => t.todoId === UPDATE_ID);
   if (getIndex !== -1) {
     this.todosArr[getIndex] = UPDATED_OBJ;
   }
   this.isInEditMode = false;
  }

  onEdit(todo: Itodo): void {
    this.isInEditMode = true;
    this.editTodo = todo;
    this.todoItem.nativeElement.value = todo.todoItem;
  }

  onRemove(todoId : number){
     let getConfirm = confirm(`Are you sure, you want to remove todo with id ${todoId}`)
    if(getConfirm){
      let getIndex=this.todosArr.findIndex(t => t.todoId === todoId)
      this.todosArr.splice(getIndex,1)
     }
  }

 onSearch(eve: Event): void {
  let val = (eve.target as HTMLInputElement).value;
  console.log(val);
 }
}
