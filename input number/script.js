$(document).ready(function () {
    var currentUser = 1;
    var fromTodoId = parseInt($("#fromTodoId").val());
    var toTodoId = parseInt($("#toTodoId").val());
    RetreiveData(currentUser, fromTodoId, toTodoId);

    $("#showUserTodos").click(function () {
        var currentUser = parseInt($("#userId").val());
        var fromTodoId = parseInt($("#fromTodoId").val()) + (currentUser-1) * 20;
        var toTodoId = parseInt($("#toTodoId").val()) + (currentUser-1) * 20;
        RetreiveData(currentUser, fromTodoId, toTodoId);
    });

    $("#showTodosInRange").click(function () {
        var currentUser = parseInt($("#userId").val());
        var fromTodoId = parseInt($("#fromTodoId").val()) + (currentUser-1) * 20;
        var toTodoId = parseInt($("#toTodoId").val()) + (currentUser-1) * 20;
        RetreiveData(currentUser, fromTodoId, toTodoId);
    });
});



function RetreiveData(currentUser, fromTodoId, toTodoId) {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            var tableData = "";
            var todoTable = document.getElementById("todoTable");
            $.each(myJson, function (index, todoItem) {
                if ((todoItem.userId == currentUser) && (todoItem.id >= fromTodoId) && (todoItem.id <= toTodoId)) {
                    console.log(todoItem);
                    tableData += 
                    `<div class="col col-sm-6 col-md-4 col-lg-4 py-2">
                        <div class="card border-${todoColor(todoItem.completed)}">
                            <div class="card-header">
                                <h3>UserId: ${todoItem.userId}</h3>
                            </div>
                        <div class="card-body text-${todoColor(todoItem.completed)}">
                            <h5 class="card-title">Id: ${todoItem.id}</h5>
                            <p class="card-text"> ${todoItem.title}</p>
                        </div>
                        <div class="card-footer text-center">
                           <button class = "btn btn-${todoColor(todoItem.completed)}">${todoItemCompleted(todoItem.completed)}</button> 
                        </div>
                    </div>
                </div>`
                }
            });
            todoTable.innerHTML = tableData;
        });
}

function todoItemCompleted(completed) {
    return completed == true ? 'Completed' : 'Not Completed';
}
function todoColor(completed) {
    return completed == true ? 'success' : 'danger';
}