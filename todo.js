"use strict";

let gorevListesi = [
  { "id": 1, "gorevAdi": "Görev 1" },
  { "id": 2, "gorevAdi": "Görev 2" },
  { "id": 3, "gorevAdi": "Görev 3" },
  { "id": 4, "gorevAdi": "Görev 4" },
]; // value için quotes olmaz

displayTask();

function displayTask() {
  let ul = document.getElementById("task-list");
  ul.innerHTML = ""; //

  for (let gorev of gorevListesi) {
    let li = `
    <li class="task list-group-item">
      <div class="form-check">
       <input type="checkbox" id="${gorev.id}" class="form-check-input" />
       <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
      </div>
      <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
              <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-pen-to-square"></i> Düzenle</a></li>
              
            </ul>
       </div>
     </li>
         `;

    ul.insertAdjacentHTML("beforeend", li); // google da sıralamarı var lazımsa ordan bak. bu şekilde yerleştirebiliriz.
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

function NewTask(event) {
  // event.target.classList.add("btn-success");
  let taskInput = document.querySelector("#txtTaskName");

  if (taskInput.value == "") {
    alert("Görev girmediniz!");
  } else {
    gorevListesi.push({
      "id": gorevListesi.length + 1,
      "gorevAdi": taskInput.value,
    });
    taskInput.value = "";
    displayTask();
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
  displayTask();
}
