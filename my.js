var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var body = document.getElementsByTagName("body");
//localStorage.setItem('key',0)

// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);
window.addEventListener("load", showI);
// Add item
function showI(e) {
  e.preventDefault();

  for (i in localStorage) {
    if (localStorage.getItem(i) != null) {
      //console.log(localStorage.getItem(i));
      var li = document.createElement("li");
      var deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger btn-sm float-right delete";

      // Append text node
      deleteBtn.appendChild(document.createTextNode("Delete"));
      var editBtn = document.createElement("button");

      // Add classes to del button
      editBtn.className = "btn btn-danger btn-sm float-right edit";

      // Append text node
      editBtn.appendChild(document.createTextNode("Edit"));

      // Append button to li

      li.className = "list-group-item";

      li.innerText = localStorage.getItem(i);
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      itemList.appendChild(li);
    }
  }
}

// Add item
function addItem(e) {
  e.preventDefault();

  // Get input value
  var newItemr = document.getElementById("itemr").value;
  var newItem = document.getElementById("item").value;
  var newItem2 = document.getElementById("item2").value;

  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  // Add text node with input value
  li.appendChild(document.createTextNode(newItemr));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem2));

  // Create del button element
  var deleteBtn = document.createElement("button");

  // Add classes to del button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";

  // Append text node
  deleteBtn.appendChild(document.createTextNode("Delete"));

  // Append button to li
  li.appendChild(deleteBtn);
  // Append li to list
  var editBtn = document.createElement("button");

  // Add classes to del button
  editBtn.className = "btn btn-danger btn-sm float-right edit";

  // Append text node
  editBtn.appendChild(document.createTextNode("Edit"));

  // Append button to li

  li.appendChild(editBtn);

  axios
    .post("https://crudcrud.com/api/e37d4d83ad6942c9bb2167bdaa96093e/addUser", {
      user: li.innerText,
    })
    .then((r) => {
      console.log(r);
    }).catch(e=>console.log(e));
    

  localStorage.setItem(newItemr, li.innerText);
  itemList.appendChild(li);
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement;
    let arr = li.innerText;
    let k = "";
    let f = "";
    let s = "";
    let count = 0;
    for (i = 0; i < li.innerText.length; i++) {
      // console.log(arr[i])
      if (arr[i] == " ") count++;
      if (count < 1) k = k + arr[i];
      else if (count == 1) f = f + arr[i];
      else s = s + arr[i];
    }
    itemList.removeChild(li);
    localStorage.removeItem(k);
    document.getElementById("itemr").value = k;
    document.getElementById("item").value = f;
    document.getElementById("item2").value = s;

    //   console.log(k)
  }
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      console.log(li.innerText.length);
      let arr = li.innerText;
      let k = "";
      for (i = 0; i < li.innerText.length; i++) {
        // console.log(arr[i])
        if (arr[i] == " ") break;
        k = k + arr[i];
      }
      //   console.log(k)
      itemList.removeChild(li);
      localStorage.removeItem(k);
    }
  }
}

// Filter Items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName("li");
  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
