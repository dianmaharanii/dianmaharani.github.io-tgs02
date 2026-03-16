const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Tambah tugas baru
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});

// Fungsi menambahkan tugas ke list
function addTask(text) {
    const li = document.createElement("li");

    li.textContent = text;

    // Tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // supaya klik tombol tidak menandai selesai
        taskList.removeChild(li);
    });

    // Tandai selesai saat klik li
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Tambah tugas dengan tekan Enter
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});
