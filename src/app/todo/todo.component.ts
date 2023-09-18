import { Component, TemplateRef, OnInit } from '@angular/core';
import { Todo } from '../class/Todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todovalue: string = '';
  todoList: Todo[] = [];
  finishedList: Todo[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // Load todo lists from local storage when the component is initialized
    this.loadTodoListsFromLocalStorage();
  }

  addTodo() {
    this.todoList.push({ content: this.todovalue, value: false });
    this.todovalue = '';
    // Save todo lists to local storage after adding a todo item
    this.saveTodoListsToLocalStorage();
  }

  changetodo(i: number) {
    const item = this.todoList.splice(i, 1);
    this.finishedList.push(item[0]);
    // Save todo lists to local storage after changing a todo item
    this.saveTodoListsToLocalStorage();
  }

  changefinish(i: number) {
    const item = this.finishedList.splice(i, 1);
    this.todoList.push(item[0]);
    // Save todo lists to local storage after changing a finished item
    this.saveTodoListsToLocalStorage();
  }

  openModal(content: TemplateRef<Element>, i: number, type: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (type == 'todoList') {
          this.todoList.splice(i, 1);
        } else {
          this.finishedList.splice(i, 1);
        }
        // Save todo lists to local storage after deleting an item
        this.saveTodoListsToLocalStorage();
      },
      (reason) => {}
    );
  }

  private saveTodoListsToLocalStorage() {
    // Save both todo lists to local storage as JSON strings
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    localStorage.setItem('finishedList', JSON.stringify(this.finishedList));
  }

  private loadTodoListsFromLocalStorage() {
    // Load both todo lists from local storage and parse them as JSON
    const storedTodoList = localStorage.getItem('todoList');
    const storedFinishedList = localStorage.getItem('finishedList');
    if (storedTodoList) {
      this.todoList = JSON.parse(storedTodoList);
    }
    if (storedFinishedList) {
      this.finishedList = JSON.parse(storedFinishedList);
    }
  }
}
// import { Component, TemplateRef,OnInit } from '@angular/core';
// import{Todo} from '../class/Todo'
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// @Component({
//   selector: 'app-todo',
//   templateUrl: './todo.component.html',
//   styleUrls: ['./todo.component.css']
// })
// export class TodoComponent {
//   todovalue:String='';
//   todoList: Todo[] = [
//     {
//       content:"Todo 1",
//       value:false
//     },
//     {
//       content:"Todo 2",
//       value:false
//     },
//     {
//       content:"Todo 3",
//       value:false
//     }
//   ];
//   finishedList:Todo[]=[

//   ]
//   constructor(private modalService:NgbModal){}
//   addTodo(){
//     this.todoList.push({content:this.todovalue,value:false})
//     this.todovalue='';
//   }
//   changetodo(i:number){
//     const item=this.todoList.splice(i,1);
//     console.log(item);
//     this.finishedList.push(item[0]);
//   }
//   changefinish(i:number){
//     const item=this.finishedList.splice(i,1);
//     this.todoList.push(item[0]);
//   }
//   openModal(content:TemplateRef<Element>,i:number,type:String){
//     this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then(
//     (result)=>{
//       if(type=='todoList'){
//         this.todoList.splice(i,1);
//       }else{
//         this.finishedList.splice(i,1);
//       }
//     },
//     (reason)=>{

//     }
//     )
//   }
// }