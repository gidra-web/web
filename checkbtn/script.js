$(document).ready(function(){
    var filter = 0;
    var fromTodoId = parseInt($("#fromTodoId").val());
    var toTodoId = parseInt($("#toTodoId").val());
    RetreiveData(filter, fromTodoId, toTodoId);

    $('#showCompleted').click(function(){
        vCheckbox();
    });

    $('#showNotCompleted').click(function(){
        vCheckbox();
    });

    function vCheckbox(){
        var fromTodoId = parseInt($("#fromTodoId").val());
        var toTodoId = parseInt($("#toTodoId").val());
        if($('#showCompleted').is(':checked') && $('#showNotCompleted').is(':checked')){
            filter = 0;
            RetreiveData(filter, fromTodoId, toTodoId);
        }
        else if(!$('#showCompleted').is(':checked') && !$('#showNotCompleted').is(':checked')){
            RetreiveData(filter, 0, 0);
        }
        else if($('#showNotCompleted').is(':checked') && !$('#showCompleted').is(':checked')){
            filter = 3;
            RetreiveData(filter, fromTodoId, toTodoId);
        }
        else if(!$('#showNotCompleted').is(':checked') && $('#showCompleted').is(':checked')){
            filter = 1;
            RetreiveData(filter, fromTodoId, toTodoId);
        }
    }

    $("#showAll").on('change', function(){
        if($('#showCompleted').is(':checked')&& $('#showNotCompleted').is(':checked')){
            filter = 0;
            var fromTodoId = parseInt($("#fromTodoId").val());
            var toTodoId = parseInt($("#toTodoId").val());
            RetreiveData(filter, fromTodoId, toTodoId);
        }
    });

    $("#showTodosInRange").click(function () {
        var fromTodoId = parseInt($("#fromTodoId").val());
        var toTodoId = parseInt($("#toTodoId").val());
        RetreiveData(filter, fromTodoId, toTodoId);
      });
});

function RetreiveData(filter, fromTodoId, toTodoId){
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then((response) => {
            return response.json();
        }).then((myJson) => {
            var tableData = "";
            var todoTable = document.getElementById("todoTable");
            $.each(myJson, function(index, todoItem){
                if((todoItem.id >= fromTodoId) && (todoItem.id <= toTodoId)){
                    if (filter == 0) {
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
                    if ((filter == 1) && (todoItem.completed == true)) {
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
                    if ((filter == 3 && todoItem.completed == false)) {
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
                }
            });
            todoTable.innerHTML = tableData;
        });
}

function todoItemCompleted(completed){
    return completed == true ? 'Completed' : 'Not Completed';
}

function todoColor(completed){
    return completed == true ? 'success' : 'danger';
}









