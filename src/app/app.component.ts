import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    public mode: String = 'list';
    public todos: Todo[] = [];
    public title: String = 'Minhas tarefas';
    public form: FormGroup;
  /**
   *
   */
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            title: ['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(60),
                Validators.required
            ])]
        });

        this.load();
    }

    remove(todo: Todo){
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
        this.save();
    }

    clear(){
        this.form.reset();
    }

    add() {
        const title = this.form.controls['title'].value;
        const id = this.todos.length + 1;
        this.todos.push(new Todo(title, false, id));
        this.save();
        this.clear();
    }

    save() {
        const data = JSON.stringify(this.todos);
        localStorage.setItem('todos', data);
        this.mode = 'list';
    }

    load() {
        const data = localStorage.getItem('todos');
        this.todos = data ? JSON.parse(data) : [];
    }


}
