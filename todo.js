let sonuc;

let gorevListesi = ["Görev 1", "Görev 2", "Görev 3", "Görev 4"];

let ul = document.getElementById("task-list");

// ul.children[0].children[0].children[0].checked = true;

// let count = ul.children.length;

for (let index in gorevListesi) {
  let li = `
     <li class="task list-group-item">
         <div class="form-check">
           <input type="checkbox" id="${index + 1}" class="form-check-input" />
            <label for="${index + 1}" class="form-check-label">${
    gorevListesi[index]
  }</label>
         </div>
     </li>
         `;

  ul.insertAdjacentHTML("beforeend", li); // google da sıralamarı var lazımsa ordan bak. bu şekilde yerleştirebiliriz.
}

/* alternative way with of operator.
for (let element of gorevListesi) {
    let li = `
      <li class="task list-group-item">
        <div class="form-check">
          <input type="checkbox" id="${element}" class="form-check-input" />
          <label for="${element}" class="form-check-label">${element}</label>
        </div>
      </li>
    `;
    ul.insertAdjacentHTML("beforeend", li);
  }
*/
