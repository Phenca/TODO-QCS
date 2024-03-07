import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css'


const is_todo_done = document.querySelectorAll(".isDone")
is_todo_done.forEach(todo => {
    todo.addEventListener('click', function(){
        console.log(todo.innerHTML)  
        if (todo.innerHTML == "Yes"){ 
            todo.innerHTML = "No"
        } else { todo.innerHTML = "Yes" }
    })
});

