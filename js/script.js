function addToList() {
    var todo = document.getElementById('input-todo').value;
    if (todo.toString().length == 0) {
        alert("Enter a task!");
    }
    else {
        document.getElementById('list').innerHTML +=
            `
            <div class="list-item" style="text-decoration:none;" 
            onclick='let x = this;lt(x);'>
                ${todo}
                <button class="delete"><i class="fas fa-trash-alt trash-icon"></i></button>
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

// lt = line-through
function lt(x){
    if(x.style.textDecoration=="none"){
        x.style.textDecoration="line-through";
        x.style.textDecorationColor="#008000";
        x.style.textDecorationStyle="double";
    }
    else{
        x.style.textDecoration="none";
    }
}

document.addEventListener('keydown', function(e){
    if(e.key=="Enter"){
        document.getElementById("add-button").click();
    }
});