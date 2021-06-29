function addToList() {
    var todo = document.getElementById('input-todo').value;
    if (todo.toString().length == 0) {
        alert("Enter a task!");
    }
    else {
        document.getElementById('list').innerHTML +=
            `
            <div class="list-item">
                ${todo}
                <button class="delete">X</button>
            </div>
        `;
        var task_atual = document.querySelectorAll('.delete');
        for (var i = 0; i < task_atual.length; i++) {
            task_atual[i].onclick = function () {
                var a = this.parentNode;
                a.remove();
            }
        }
        document.getElementById('input-todo').value = "";
        document.getElementById('input-todo').focus();
    }
}

