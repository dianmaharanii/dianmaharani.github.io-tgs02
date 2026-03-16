const tanggalElem = document.getElementById('tanggal');
const datePicker = document.getElementById('datePicker');

// Set tanggal sekarang sebagai default
const now = new Date();
datePicker.value = now.toISOString().substr(0,10);

// Fungsi tampilkan tanggal sesuai input
function tampilkanTanggal() {
    const tanggal = new Date(datePicker.value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    tanggalElem.textContent = "Tanggal: " + tanggal.toLocaleDateString('id-ID', options);
}

tampilkanTanggal();

datePicker.addEventListener('change', tampilkanTanggal);

// Menambah, hapus, selesai tugas
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-buttons');

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Selesai';
    doneBtn.classList.add('doneBtn');
    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    buttonsDiv.appendChild(doneBtn);
    buttonsDiv.appendChild(deleteBtn);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);

    taskInput.value = '';
});

// Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});
