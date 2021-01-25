const todos = [];

const pendingClasses = 
"my-4 bg-gray-800 w-full text-center text-indigo-500 rounded py-4 border-2 border-indigo-500 transition transform ease-in-out duration-900 hover:bg-indigo-500 hover:text-white hover:scale-110 cursor-pointer";

const completedClasses = 
"my-4 bg-gray-800 w-full text-center text-yellow-500 rounded py-4 border-2 border-yellow-500 transition transform ease-in-out duration-900 hover:bg-yellow-500 hover:text-white hover:scale-110 cursor-pointer";

const deleteButtonClass = "visible cursor-pointer inline bg-red-500 text-white mx-4 py-0 px-4 rounded hover:bg-red-700";

const deleteButtonDisabledClass = "invisible"

function deleteButtonCheck() {
    const modifyDeleteButton = document.getElementById("deleteButton");
    var clCount = todos.filter((todo) => todo.status === "done").length;
        if (clCount == 1){
            modifyDeleteButton.className = deleteButtonClass;
            modifyDeleteButton.textContent = "Delete";
        }
        else if (clCount >= 2){
            modifyDeleteButton.className = deleteButtonClass;
            modifyDeleteButton.textContent = "Delete All";
        }
        else{
            modifyDeleteButton.className = deleteButtonDisabledClass;
        }; 
}


const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const deleteButton = document.getElementById('deleteButton');

const showTodos = () => {

    const pendingTodos = todos.filter((todo => todo.status === 'pending'));

    pendingList.innerHTML = ''; 
    pendingTodos.forEach((todo)=> {
        const pendingItem = document.createElement('li');
        pendingItem.className = pendingClasses;
        pendingItem.id = todo.id;
        pendingItem.innerText = todo.text;
        pendingList.appendChild(pendingItem);
    });

    completedList.innerHTML = '';
    const completedTodos = todos.filter((todo) => todo.status === "done");
    completedTodos.forEach((todo) => {
        const completedItem = document.createElement("li");
        
        completedItem.className = completedClasses;
        completedItem.id = todo.id;
        completedItem.innerText = todo.text;
        completedList.appendChild(completedItem);
})
}

const addForm = document.getElementById("addForm");
const newTodo = document.getElementById("newTodo");
addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(newTodo.value === ""){
        alert("Need to enter a task to add it to pending list.");
        return;
    }
    todos.push({
        id: Math.floor(Math.random() * 100000).toString(),
        text: newTodo.value,
        status: "pending",
    });
    newTodo.value = '';
    showTodos();
});

pendingList.addEventListener('click', (event) => {
    if (event.target.id === "pendingList"){
        return;
    }
    todos.find((todo) => todo.id === event.target.id).status = "done";
        deleteButtonCheck();
    showTodos();
});

deleteButton.addEventListener('click', () => {
    for (var i = todos.length; i > 0; i--){
        if (todos[i - 1].status === "done"){
            todos.splice(i - 1, 1);
        }
    }
    deleteButton.className = deleteButtonDisabledClass;
    showTodos();
});

completedList.addEventListener('click', (event) => {
    todos.find((todo) => todo.id === event.target.id).status = "pending";
    deleteButtonCheck();
    showTodos();
});