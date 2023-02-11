var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var body = document.getElementsByTagName("body");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

filter.addEventListener("keyup", filterItems);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.addEventListener("load", showI);

async function showI(e) {
    try {   
    e.preventDefault();

    const response = await axios.get(
      "http://localhost:3000/expense/expenses"
    );
    console.log(response.data);
    showOutput(response.data);
  } catch (error) {
    console.error(error);
} 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showOutput(res) {
  try {     
  for (i in res) {
    var sp = document.createElement("span");
    sp.style.display = "none";
    sp.innerText = JSON.stringify(res[i].id);

    var li = document.createElement("li");

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("Delete"));

    li.className = "list-group-item";
    li.innerHTML = ` ${res[i].expense_amount} &nbsp &nbsp  ${res[i].description} &nbsp &nbsp  ${res[i].category}`;
    li.appendChild(deleteBtn);
    li.appendChild(sp);

    itemList.appendChild(li);
  }
} catch (error) {
  console.error(error);
}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

form.addEventListener("submit", addItem);

async function addItem(e) {
    try {   
    e.preventDefault();

    var newItem1 = e.target.expense_amount.value;
    var newItem2 = e.target.description.value;
    var newItem3 = e.target.category.value;
    const data ={
      expense_amount: newItem1,
      description:newItem2,
      category:newItem3
    }

    console.log(typeof(data))

    const response = await axios.post(
      "http://localhost:3000/expense/addexpense",data
    );
    console.log(response);
    // location.reload();
    document.getElementById("item1").value = "";
          document.getElementById("item2").value = "";
          document.getElementById("item3").value = "";
          var li = document.createElement("li");
          li.className = "list-group-item";
          li.appendChild(document.createTextNode(newItem1));
          li.appendChild(document.createTextNode(" "));
          li.appendChild(document.createTextNode(" "));
          li.appendChild(document.createTextNode(newItem2));
          li.appendChild(document.createTextNode(" "));
          li.appendChild(document.createTextNode(" "));
          li.appendChild(document.createTextNode(newItem3));
          
          var sp = document.createElement("span");
          sp.style.display = "none";
          sp.innerText = JSON.stringify(response.data.id);
        
          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger btn-sm float-right delete";
          deleteBtn.appendChild(document.createTextNode("Delete"));
          // console.log(response.data.id);
        
          li.appendChild(deleteBtn);
          li.appendChild(sp);
          itemList.appendChild(li);


         

  }catch (error) {
    console.error(error);
} 
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
itemList.addEventListener("click", removeItem);

async function removeItem(e) {
  try { 
  
    if (e.target.classList.contains("delete")) {
      var li = e.target.parentElement;
      var sp = e.target.nextSibling;

      console.log(1);
      console.log(sp.innerHTML);

      let k = JSON.parse(sp.innerHTML);
      console.log(k);

      const res = await axios
        .post(
          `http://localhost:3000/expense/deleteexpense`,{id:k}
        )
         console.log(res)

      itemList.removeChild(li);
    }
  } catch (error) {
    console.error(error);
  }   
  }




  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function filterItems(e) {
    try{    
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
} catch (error) {
  console.error(error);
}   
}
