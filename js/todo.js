let tasks =JSON.parse(localStorage.getItem("tasks")) || [];
const taskInput =document.getElementById("taskInput");
const taskList =document.getElementById("taskList");
function saveTasks() {localStorage.setItem("tasks",JSON.stringify(tasks));}
function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li =document.createElement("li");li.innerHTML = `<span class="${task.completed ? "completed" : "" }"> ${task.text}
        </span>
            <div>
                <button onclick="toggleTask(${index})"> ✓</button>
                <button onclick="deleteTask(${index})"> ✕</button>
            </div>`;
        taskList.appendChild(li);
    });
}
window.toggleTask =(index) => {tasks[index].completed =!tasks[index].completed;
        saveTasks();
        renderTasks();
    };
window.deleteTask =(index) => {tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };
const addBtn =document.getElementById("addTask");
if (addBtn) {addBtn.addEventListener("click",() => {
            const text =taskInput.value.trim();
            if (!text) return;
            tasks.push({
                text,
                completed: false
            });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        });
}
renderTasks();