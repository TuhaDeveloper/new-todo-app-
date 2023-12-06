const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('#todo-button')
const todoList = document.querySelector('#lists')
const msgShow = document.querySelector('.msg-show')


// ========== this is the message showing function after add and delete ===========

const messeageShow = (value, status) => {

    msgShow.textContent = value;
    msgShow.classList.add(`bg-${status}`)

    setTimeout(() => {
        msgShow.textContent = '';
        msgShow.classList.remove(`bg-${status}`)
    }, 1000);

}

// =================== there is todo create function ===========

const createTodo = (todoValue, todoId) => {

    const todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add('todoList')
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button id='delButton' class='btn'>del</button></span>
    `;
    todoList.appendChild(todoElement)

    const delButton = todoElement.querySelector('#delButton');
    delButton.addEventListener('click', deleteTodo)

}

// ============ delete todo form list========================
const deleteTodo = (e) => {
    const selected = e.target.parentElement.parentElement
    todoList.removeChild(selected)
    messeageShow('Todo is deleted', 'danger')

    let todos = getFromLocalStorage()
    todos = todos.filter((todo) => todo.todoId !== selected.id);
    localStorage.setItem('todos', JSON.stringify(todos))


}

// =================== get todo from Local Storage =================

const getFromLocalStorage = () => {
    return localStorage.getItem('todos') ? JSON.parse(
        localStorage.getItem('todos')) : []
}

// =================== Here is Add todo Function ======================

const Addtodo = (e) => {
    e.preventDefault()
    const todoValue = todoInput.value;
    const todoId = Date.now().toString()

    createTodo(todoValue, todoId)
    messeageShow('Added your todo', 'success')

    //------- todo store in local store ----------

    const todos = getFromLocalStorage()
    todos.push({ todoId, todoValue })
    localStorage.setItem('todos', JSON.stringify(todos))

    todoInput.value = '';
}
//================== Load todo from local storage ======================

const loadTodo = (e) => {
    const todos = getFromLocalStorage();
    todos.map((todo) => {
        createTodo(todo.todoValue, todo.todoId)
    })
}

todoForm.addEventListener('submit', Addtodo);
window.addEventListener('DOMContentLoaded', loadTodo);
