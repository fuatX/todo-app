"use strict";

let gorevListesi = []; // value için quotes olmaz

if (localStorage.getItem("gorevListesi") !== null) {
  gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}

let editId;
let isEditTask = false;
const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

displayTask("all");

function displayTask(filter) {
  let ul = document.getElementById("task-list");
  ul.innerHTML = ""; //

  if (gorevListesi.length == 0) {
    ul.innerHTML = "<p class='p-3 m-0'>Görev listeniz boş.</p>";
  } else {
    for (let gorev of gorevListesi) {
      let completed = gorev.durum == "completed" ? "checked" : "";

      if (filter == gorev.durum || filter == "all") {
        let li = `
    <li class="task list-group-item">
      <div class="form-check">
       <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed} />
       <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
      </div>
      <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
              <li><a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-pen-to-square"></i> Düzenle</a></li>
              
            </ul>
       </div>
     </li>
         `;
        ul.insertAdjacentHTML("beforeend", li); // google da sıralamarı var lazımsa ordan bak. bu şekilde yerleştirebiliriz.
      }
    }
  }
}
/*
let btnEkle = document.querySelector("#btnAddNewTask")

btnEkle.addEventListener("click",function(event){
  console.log("click event")

  event.preventDefault();
})
*/

/*
document.querySelector("#btnClear").addEventListener("click",function(event){
  console.log("click temizle")

  event.preventDefault();
})
*/

document.querySelector("#btnAddNewTask").addEventListener("click", NewTask);
document
  .querySelector("#btnAddNewTask")
  .addEventListener("onkeypress", function () {
    if (event.key == "Enter") {
      document.getElementById("btnAddNewTask").click();
    }
  }); //keyboard event w3school

for (let span of filters) {
  span.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    span.classList.add("active");
    displayTask(span.id);
  });
}

function NewTask(event) {
  // event.target.classList.add("btn-success");

  if (taskInput.value == "") {
    alert("Görev girmediniz!");
  } else {
    if (!isEditTask) {
      //ekleme
      gorevListesi.push({
        "id": gorevListesi.length + 1,
        "gorevAdi": taskInput.value,
        "durum": "pending",
      });
    } else {
      //güncelleme
      for (let gorev of gorevListesi) {
        if (gorev.id == editId) {
          gorev.gorevAdi = taskInput.value;
        }
        isEditTask = false;
      }
    }

    taskInput.value = "";
    displayTask(document.querySelector("span.active").id);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
  }

  event.preventDefault();
}

// function deleteTask(id) {
//   let deletedId;
//   for (let gorev of gorevListesi) {
//     if (gorev.id == id) {
//       deletedId = gorev;
//     }
//     console.log("gorev.id" , gorev.id);
//     console.log("gorev",gorev)
//     console.log("deletedId", deletedId);
//     console.log("id",id)

//   }

//   gorevListesi.splice(deletedId, 1);
//   displayTask();
// }

function deleteTask(id) {
  let deletedId;

  /*   way 1
  for (let gorev of gorevListesi) {
    
    if (gorev.id == id) {
      deletedId = gorevListesi.indexOf(gorev);
    

    // console.log("gorevListesi",gorevListesi)
    // console.log("gorev",gorev)
    // console.log("gorevListesi.indexOf(gorev)",deletedId)
      
    }
  }
*/
  /*
deletedId = gorevListesi.findIndex(function(gorev){
return gorev.id == id;
})
*/
  //arrow function ile
  deletedId = gorevListesi.findIndex((gorev) => gorev.id == id);

  gorevListesi.splice(deletedId, 1);
  displayTask(document.querySelector("span.active").id);
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;
  taskInput.focus();
  taskInput.classList.add("active");

  console.log("edit id:", editId);
  console.log("edit mode:", isEditTask);
}

btnClear.addEventListener("click", function () {
  gorevListesi.splice(0, gorevListesi.length);
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
  displayTask();
});

function updateStatus(selectedTask) {
  // console.log(selectedTask.parentElement.lastElementChild);
  let label = selectedTask.nextElementSibling;
  let durum;

  if (selectedTask.checked) {
    label.classList.add("checked");
    durum = "completed";
  } else {
    label.classList.remove("checked");
    durum = "pending";
  }

  for (let gorev of gorevListesi) {
    if (gorev.id == selectedTask.id) {
      gorev.durum = durum;
    }
  }
  displayTask(document.querySelector("span.active").id);
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}
