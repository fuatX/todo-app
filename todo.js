"use strict";

let sonuc;

let gorevListesi = [
  { "id": 1, "gorevAdi": "Görev 1" },
  { "id": 2, "gorevAdi": "Görev 2" },
  { "id": 3, "gorevAdi": "Görev 3" },
  { "id": 4, "gorevAdi": "Görev 4" },
]; // value için quotes olmaz

let ul = document.getElementById("task-list");

for (let gorev of gorevListesi) {
  let li = `
    <li class="task list-group-item">
      <div class="form-check">
       <input type="checkbox" id="${gorev.id}" class="form-check-input" />
       <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
      </div>
     </li>
         `;

  ul.insertAdjacentHTML("beforeend", li); // google da sıralamarı var lazımsa ordan bak. bu şekilde yerleştirebiliriz.
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

function NewTask(event) {
  event.target.classList.add("btn-success");

  event.preventDefault();
}
