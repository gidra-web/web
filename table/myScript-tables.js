$(document).ready(function () {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            // console.log(myJson);
            var tableData = "";
            var todoTable = document.getElementById("todoTable");
            $.each(myJson, function (index, todoItem) {
                tableData += '<tr><th class="text-bold">' + todoItem.postId + '</th><td>' +
                    todoItem.id + '</td><td>' +
                    todoItem.name + '</td><td>' +
                    todoItem.email + '</td>' +
                    '<td><a href="#" class="btn btn-success" style="width:160px;" onclick="alert(`' + todoItem.body + '`);">Show Message</a></td></tr>';
            });
            todoTable.innerHTML = tableData;
        });
});

function ShowMessage(message) {
    window.alert(message);
}