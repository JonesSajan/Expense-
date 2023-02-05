var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var body = document.getElementsByTagName("body");



form.addEventListener("submit", addItem);

itemList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);
window.addEventListener("load", showI);






async function showI(e) {
  e.preventDefault();
  try{


    const response = await axios.get("https://crudcrud.com/api/1bfb143ff89d403f8c70c79fb39f426f/addUser")
    console.log(response.data);
    showOutput(response.data);
  }catch (error) {
    console.error(error);
  }
}

function showOutput(res) {
  for (i in res) {
    var sp = document.createElement("span");
    sp.style.display = "none";
    sp.innerText = JSON.stringify(res[i]._id);
    var li = document.createElement("li");
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";

    deleteBtn.appendChild(document.createTextNode("Delete"));
    var editBtn = document.createElement("button");

    editBtn.className = "btn btn-danger btn-sm float-right edit";

    editBtn.appendChild(document.createTextNode("Edit"));


    li.className = "list-group-item";

    li.innerHTML = ` ${res[i].expenseAmount} &nbsp &nbsp  ${res[i].description}&nbsp &nbsp  ${res[i].category}`;
    li.appendChild(deleteBtn);
    li.appendChild(sp);
    li.appendChild(editBtn);

    itemList.appendChild(li);
  }
}
function addItem(e) {
  e.preventDefault();

  var newItem1 = e.target.expenseAmount.value;
  var newItem2 = e.target.description.value;
  var newItem3 = e.target.category.value;


  axios
    .post("https://crudcrud.com/api/1bfb143ff89d403f8c70c79fb39f426f/addUser", {
      expenseAmount: newItem1,
      description: newItem2,
      category: newItem3,
    })
    .then((r) => {
      console.log(r);
      location.reload();
    })
    .catch((e) => console.log(e));

}

async function removeItem(e) { 
  try{
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement;
    var sp = e.target.previousSibling;
    let k = JSON.parse(sp.innerHTML);
    var E = "";
    var D = "";
    var C = "";
    axios
      .get(
        `https://crudcrud.com/api/1bfb143ff89d403f8c70c79fb39f426f/addUser/${k}`
      )
      .then((res) => {
        console.log(res.data);
        E = res.data.expenseAmount;
        D = res.data.description;
        C = res.data.category;
        itemList.removeChild(li);
        console.log(1);
        console.log(E);
        console.log(D);
        console.log(C);
        document.getElementById("item1").value = E;
        document.getElementById("item2").value = D;
        document.getElementById("item3").value = C;
        axios
          .delete(
            `https://crudcrud.com/api/1bfb143ff89d403f8c70c79fb39f426f/addUser/${k}`
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

  } if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      var sp = e.target.nextSibling;

      console.log(1)
      console.log(sp.innerHTML)

      let k = JSON.parse(sp.innerHTML);
      console.log(k)

      axios
        .delete(
          `https://crudcrud.com/api/1bfb143ff89d403f8c70c79fb39f426f/addUser/${k}`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      itemList.removeChild(li);
    }
  }
}catch (error) {
  console.error(error);
}
}

function filterItems(e) {
  var text = e.target.value.toLowerCase();
  var items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
