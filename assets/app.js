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
        const table = document.querySelector('table')
        const tbody = document.querySelector('tbody')
        tbody.remove()
        const new_tbody = document.createElement('tbody')
        response.forEach(todo => {
            const tr = document.createElement('tr')
            const tdId = document.createElement('td') 
            const tdName = document.createElement('td')
            const tdDescription = document.createElement('td')
            const tdDone  = document.createElement('td')

            const td_links = document.createElement('td')
            const a_show = document.createElement('a')
            const a_edit = document.createElement('a')

            todo.forEach(t => {
                tr.appendChild(tdId)
                tdId.innerHTML = t.id

                tr.appendChild(tdName)
                tdName.innerHTML = t.name

                
                tr.appendChild(tdDescription)
                tdDescription.innerHTML = t.description

                tr.appendChild(tdDone)
                tdDone.innerHTML = t.done

                td_links.appendChild(a_show)
                a_show.href = `/todo/${t.id}`
                a_show.innerHTML = 'show'

                td_links.appendChild(a_edit)
                a_edit.href = `/todo/${t.id}/edit`
                a_edit.innerHTML = 'edit'
                tr.appendChild(td_links)
            })
            new_tbody.appendChild(tr)
            table.appendChild(new_tbody)
        })
    })
}
)