// Canvas background bergerak
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initImages();
});

// Gambar icon bergerak
const img = new Image();
img.src = "https://cdn-icons-png.flaticon.com/512/833/833472.png"; // icon hati

let imagesArray;

class MovingImage {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 30 + 20;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.angle = Math.random() * 360;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
        this.angle += 0.01;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.size/2, this.y + this.size/2);
        ctx.rotate(this.angle);
        ctx.drawImage(img, -this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

function initImages() {
    imagesArray = [];
    for (let i = 0; i < 25; i++) {
        imagesArray.push(new MovingImage());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    imagesArray.forEach(i => {
        i.update();
        i.draw();
    });
    requestAnimationFrame(animate);
}

img.onload = () => {
    initImages();
    animate();
}

// Tampilkan tanggal, bulan, hari
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("dateDisplay").textContent = now.toLocaleDateString('id-ID', options);
}
updateDate();
setInterval(updateDate, 60000);

// To-Do List
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});

function addTask(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
    });

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
});
