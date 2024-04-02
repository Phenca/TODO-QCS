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
        fetch(`http://127.0.0.1:8000/todo/${todo.id}/change-status`,
        {
            method: 'post',
            body: JSON.stringify({
                id: todo.id,
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (todo.innerHTML == "Yes"){ 
                todo.innerHTML = "No"
            } else { todo.innerHTML = "Yes" }
        })
    })
});

const checkbox = document.getElementById('done_todo')
checkbox.addEventListener('change', function(){
    is_todo_done.forEach(todo => {
        if(checkbox.checked == true){
            if (todo.innerHTML == "Yes"){ 
                todo.parentElement.style.display = "none"
            }
        } else {
            if(todo.parentElement.style.display == "none"){
                todo.parentElement.style.display = "table-row"
            }
        }
    })
})

const search_bar = document.getElementById('recherche')
search_bar.addEventListener('input', function(){
    console.log(search_bar.value)
    fetch(`http://127.0.0.1:8000/todo/search`,
    {
        method: 'post',
        body: JSON.stringify({
            terms: search_bar.value,
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
}
)