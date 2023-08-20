/*
title
price
taxes
ads
discount
total
=====================
counts
category
create
search
search-by-title
search-by-category
delete all
======================
Save to local storage
clear inputs
read
count
update
delete
search 
clean data
*/

//////////////////////////////////////////////////////////////////////////////
//                             ## Getting Elements ##

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let counts = document.getElementById("counts");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("search-by-title");
let searchByCategory = document.getElementById("search-by-category");
let deleteAll = document.getElementById("delete-all");
let mood = "create";

//////////////////////////////////////////////////////////////////////////////
//                               ## Getting total price ##
price.addEventListener("keyup", () => getTotal());
taxes.addEventListener("keyup", () => getTotal());
ads.addEventListener("keyup", () => getTotal());
discount.addEventListener("keyup", () => getTotal());

function getTotal() {
  let result;
  if (price.value !== "") {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.textContent = result;
    total.style.backgroundColor = "green";
  } else {
    total.textContent = "";
    total.style.backgroundColor = "rgb(146, 17, 17)";
  }
  if (result <= 0) {
    total.textContent = "free";
    total.style.backgroundColor = "blue";
  }
}
//////////////////////////////////////////////////////////////////////////////
//                         $$ Creating first product $$
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

create.onclick = function () {
  let objPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    ads: ads.value,
    counts: counts.value,
    category: category.value.toLowerCase(),
    total: total.textContent,
  };
  //-------------------------------------------
  //                 $$ Creating counts input $$
  if (
    title.value != "" &&
    price.value != "" &&
    counts.value <= 100 &&
    category.value != ""
  ) {
    if (mood === "create") {
      if (objPro.counts.value !== "") {
        for (let i = 1; i < counts.value; i++) {
          dataPro.push(objPro);
        }
      }
      dataPro.push(objPro);
    } else {
      dataPro[upd] = objPro;
      mood = "create";
      create.textContent = `create`;
      counts.classList.remove("hide");
    }
    clearInputs();
  }

  //-------------------------------------------
  localStorage.product = JSON.stringify(dataPro);
  showData();
};
//////////////////////////////////////////////////////////////////////
//                         $$ Clearing Inputs $$
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  counts.value = "";
  category.value = "";
  total.textContent = ``;
  total.style.backgroundColor = "rgb(146, 17, 17)";
}
//////////////////////////////////////////////////////////////////////
//                         $$ Displaying Data $$
let upd;
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    upd = i;
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>
    <button onclick="updateData(${i})" id="update" >Update</button>
    </td>
    <td>
    <button onclick="del(${i})" id="delete" >Delete</button>
    </td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  countPro();
}
showData();
//////////////////////////////////////////////////////////////////////
//                    $$ Deleting a product $$

function del(i) {
  let confDellOne = confirm("Are you sure that you want to delete this item?");
  if (confDellOne === true) {
    dataPro.splice(i, 1);
  }
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//////////////////////////////////////////////////////////////////////
//                    $$ Deleting all products $$
deleteAll.onclick = function delAll() {
  let confDellAll = confirm("You are going to delete all items, Are you sure?");
  if (confDellAll === true) {
    dataPro.splice(0);
  }
  localStorage.product = JSON.stringify(dataPro);
  showData();
};
// //////////////////////////////////////////////////////////////////////
//                    $$  Hide delete all  $$
function countPro() {
  if (dataPro.length === 0) {
    deleteAll.classList.add("hide");
  } else {
    deleteAll.textContent = `Delete All (${dataPro.length})`;
    deleteAll.classList.remove("hide");
  }
}
//////////////////////////////////////////////////////////////////////
//                    $$ Update Product $$

function updateData(h) {
  mood = "update";
  title.value = dataPro[h].title;
  price.value = dataPro[h].price;
  taxes.value = dataPro[h].taxes;
  ads.value = dataPro[h].ads;
  discount.value = dataPro[h].discount;
  category.value = dataPro[h].category;
  counts.classList.add("hide");
  create.textContent = `update`;
  upd = h;
  getTotal();
  title.focus();
  scroll({
    behavior: smooth,
  });
  search.value = "";
}
//////////////////////////////////////////////////////////////////////
//                    $$ Searching $$
let searchMood = "title";

searchByTitle.addEventListener("click", () => getSearchMood(searchByTitle.id));
searchByCategory.addEventListener("click", () =>
  getSearchMood(searchByCategory.id)
);

function getSearchMood(id) {
  if (id == "search-by-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}

search.addEventListener("keyup", () => searchData(search.value));

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>
    <button onclick="updateData(${i})" id="update" >Update</button>
    </td>
    <td>
    <button onclick="del(${i})" id="delete" >Delete</button>
    </td>
    </tr>
    `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>
    <button onclick="updateData(${i})" id="update" >Update</button>
    </td>
    <td>
    <button onclick="del(${i})" id="delete" >Delete</button>
    </td>
    </tr>
    `;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
//#########################################################################
//#########################################################################
// Uploading this project on github by command line(git)

