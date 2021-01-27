const todos = [];

const get = (elements) => 
    elements.map((element) => document.getElementById(element));

const [pendingList, completedList, addForm, newTodo, deleteButton] = get
    (["pendingList", "completedList", "addForm", "newTodo",
        "deleteButton"]);

const newList = [
    {
        element: pendingList,
        status: "pending",
    },
    {
        element: completedList,
        status: "done",
    }
];

/*const modifyDeleteButton = get("deleteButton");
const pendingList = get('pendingList');
const completedList = get('completedList');
const addForm = get("addForm");
const newTodo = get("newTodo");
const completedItemsHeader = get("completedItemsHeader");
const pendingItemsHeader = get("pendingItemsHeader");
const nothingHere = get("nothingHere");*/

const cssClasses = {
    pending: "my-4 bg-gray-800 w-full text-center text-indigo-500 rounded py-4 border-2 border-indigo-500 transition transform ease-in-out duration-900 hover:bg-indigo-500 hover:text-white hover:scale-110 cursor-pointer",
    done: "my-4 bg-gray-800 w-full text-center text-yellow-500 rounded py-4 border-2 border-yellow-500 transition transform ease-in-out duration-900 hover:bg-yellow-500 hover:text-white hover:scale-110 cursor-pointer",
    deleteButtonClass: "visible cursor-pointer inline bg-red-500 text-white mx-4 py-0 px-4 rounded hover:bg-red-700",
    nothingHereVisibleClasses: "visible my-4 text-white animate-bounce",
    nothingHereInvisibleClasses: "invisible my-4 text-white",
    deleteButtonDisabledClass: "invisible",
    completedItemsHeaderVisibleClasses: "visible text-2xl text-yellow-800 inline",
    completedItemsHeaderInvisibleClasses: "invisible",
    pendingItemsHeaderVisibleClasses: "visible text-2xl text-indigo-800 inline",
    pendingItemsHeaderInvisibleClasses: "invisible",
}

function deleteButtonCheck() {
    var clCount = todos.filter((todo) => todo.status === "done").length;
        if (clCount == 1){
            deleteButton.className = cssClasses.deleteButtonClass;
            deleteButton.textContent = "Delete";
        }
        else if (clCount >= 2){
            deleteButton.className = cssClasses.deleteButtonClass;
            deleteButton.textContent = "Delete All";
        }
        else{
            deleteButton.className = cssClasses.deleteButtonDisabledClass;
        }; 
};

const updateTodos = () => {
    newList.forEach((list) => {
    const filteredTodos = todos.filter((todo) => todo.status === list.status);

    list.element.innerHTML = ""; 
    filteredTodos.forEach((todo) => {
        const item = document.createElement("li");
        item.className = cssClasses[list.status];
        item.innerText = todo.text;
        item.id = todo.id;
        list.element.appendChild(item);

    });
});
};

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
    nothingHere.className = cssClasses.nothingHereInvisibleClasses;
    completedItemsHeader.className = cssClasses.completedItemsHeaderVisibleClasses;
    pendingItemsHeader.className = cssClasses.pendingItemsHeaderVisibleClasses;

    updateTodos();
});

pendingList.addEventListener('click', (event) => {
    if (event.target.id === "pendingList"){
        return;
    }
    todos.find((todo) => todo.id === event.target.id).status = "done";
        deleteButtonCheck();
    updateTodos();
});

deleteButton.addEventListener('click', () => {
    for (var i = todos.length; i > 0; i--){
        if (todos[i - 1].status === "done"){
            todos.splice(i - 1, 1);
        }
    }
    deleteButton.className = cssClasses.deleteButtonDisabledClass;
    if (todos.length === 0){
        console.log(todos.length);
        completedItemsHeader.className = cssClasses.completedItemsHeaderInvisibleClasses;
        pendingItemsHeader.className = cssClasses.pendingItemsHeaderInvisibleClasses;
        nothingHere.className = cssClasses.nothingHereVisibleClasses;
    }
    else{
        completedItemsHeader.className = cssClasses.completedItemsHeaderVisibleClasses;
        pendingItemsHeader.classname = cssClasses.pendingItemsHeaderVisibleClasses;
    };
    updateTodos();
});

completedList.addEventListener('click', (event) => {
    todos.find((todo) => todo.id === event.target.id).status = "pending";
    deleteButtonCheck();
    updateTodos();
});