var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var body = document.getElementsByTagName("body");
var leaderboard = document.getElementById("premium-feature")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

filter.addEventListener("keyup", filterItems);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", showI);
let current_page =1;
let rows =1;
localStorage.getItem('rows')?rows=localStorage.getItem('rows'):rows=1;

async function showI(e) {
  try {
    localStorage.getItem('rows')?rows=localStorage.getItem('rows'):rows=1;

    const response = await axios.get("http://localhost:3000/expense/expenses", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    const pagination_element = document.getElementById('pagination');
    slicedResponse(response.data,rows,current_page)
    SetupPagination(response.data, pagination_element, rows);
    //console.log(response.data);
  } catch (error) {
    //console.error(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function slicedResponse (data,rows,current_page){
  current_page--;
  let start = rows*current_page;
  let end = parseInt(start) + parseInt(rows);

  showOutput(data.slice(start,end));

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";
  wrapper.innerHTML = ` <select id="no_of_rows" style="width: 1rem;" onChange=setRows()>
  <option value=1>select</option>
  <option value=1>1</option>
  <option value=5>5</option>
  <option value=10>10</option>
  <option value=20>20</option>
</select>`;

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		slicedResponse(items, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setRows(){
  r=document.getElementById('no_of_rows').value;
  //console.log(r);
  localStorage.setItem("rows",r)
  current_page=1;
  showI()
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showOutput(res) {
  try {
    itemList.innerHTML=""
    const payload = parseJwt(localStorage.getItem('token'))
    //console.log(payload)



    payload.ispremium===true?document.getElementById('premium').innerHTML='<p style="color:green">You Are A Premium User</p><button id="use-premium" class="btn btn-dark" onClick=showLeaderboard() style="width: 20rem;margin-bottom: 2rem;">Show Leaderboard</button>':document.getElementById('premium').innerHTML='<button id="buy-premium" class="btn btn-dark" onClick=buyPremium() style="width: 20rem;margin-bottom: 2rem;">Buy Premium</button>'
    // payload.ispremium===true?document.getElementById('premium').innerHTML='<p style="color:green">You Are A Premium User</p><button id="use-premium" class="btn btn-dark" onClick=showLeaderboard() style="width: 20rem;margin-bottom: 2rem;">Show Leaderboard</button><button id="download-expense" class="btn btn-dark" onClick=downloadExpense() style="width: 20rem;margin-bottom: 2rem;">Download Expense</button>':document.getElementById('premium').innerHTML='<button id="buy-premium" class="btn btn-dark" onClick=buyPremium() style="width: 20rem;margin-bottom: 2rem;">Buy Premium</button>'
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
      li.innerHTML = ` ${res[i].expense_amount} &nbsp &nbsp  ${res[i].description} &nbsp &nbsp  ${res[i].category}`;
      li.appendChild(deleteBtn);
      li.appendChild(sp);
      li.appendChild(editBtn);

      itemList.appendChild(li);
    }
  } catch (error) {
    //console.error(error);
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
    const data = {
      expense_amount: newItem1,
      description: newItem2,
      category: newItem3,
    };

    //console.log(typeof data);

    const response = await axios.post(
      "http://localhost:3000/expense/addexpense",
      data,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    //console.log(response);
    // location.reload();
    document.getElementById("item1").value = "";
    document.getElementById("item2").value = "";
    document.getElementById("item3").value = "";
    var li = document.createElement("li");
    li.className = "list-group-item";
    // li.appendChild(document.createTextNode(newItem1));
    // li.appendChild(document.createTextNode("     "));
    // li.appendChild(document.createTextNode("     "));
    // li.appendChild(document.createTextNode(newItem2));
    // li.appendChild(document.createTextNode("      "));
    // li.appendChild(document.createTextNode("     "));
    // li.appendChild(document.createTextNode(newItem3));

    li.innerHTML = ` ${newItem1} &nbsp &nbsp  ${newItem2} &nbsp &nbsp  ${newItem3}`;

    var sp = document.createElement("span");
    sp.style.display = "none";
    sp.innerText = JSON.stringify(response.data.id);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    // //console.log(response.data.id);

    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-danger btn-sm float-right edit";
    editBtn.appendChild(document.createTextNode("Edit"));

    li.appendChild(deleteBtn);
    li.appendChild(sp);
    li.appendChild(editBtn);

    itemList.appendChild(li);
  } catch (error) {
    //console.error(error);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
itemList.addEventListener("click", removeItem);

async function removeItem(e) {
  try {
    if (e.target.classList.contains("delete")) {
      var li = e.target.parentElement;
      var sp = e.target.nextSibling;

      //console.log(sp.innerHTML);

      let k = JSON.parse(sp.innerHTML);
      //console.log(k);

      const res = await axios.post(
        `http://localhost:3000/expense/deleteexpense`,
        { id: k },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      //console.log(res,"//////////////////////////////////////");
      //console.log(res.data.deletedCount)

      if (res.data.deletedCount == 1) {
        itemList.removeChild(li);
      }
    }
  } catch (error) {
    //console.error(error);
  }

  try {
    if (e.target.classList.contains("edit")) {
      var li = e.target.parentElement;
      var sp = e.target.previousSibling;

      //console.log("edit called");
      //console.log(sp.innerHTML);

      let k = JSON.parse(sp.innerHTML);
      //console.log(k);
      const resid = await axios.post(
        `http://localhost:3000/expense/expensebyid`,
        { id: k }
      );
      //console.log(resid);

      document.getElementById("item1").value = resid.data.expense_amount;
      document.getElementById("item2").value = resid.data.description;
      document.getElementById("item3").value = resid.data.category;

      const res = await axios.post(
        `http://localhost:3000/expense/deleteexpense`,
        { id: k },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      //console.log(res);

      itemList.removeChild(li);
    }
  } catch (error) {
    //console.error(error);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function filterItems(e) {
  try {
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
    //console.error(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// document.getElementById("buy-premium").onclick = buyPremium;

async function buyPremium(e) {
     //console.log('buy premium')
  try {
    const response = await axios.get("http://localhost:3000/purchase/premium", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    //console.log(response.data);

    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
      const result=  await axios.post(
          "http://localhost:3000/purchase/updatetransaction",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        alert("you are a premium user");
        document.getElementById('premium').innerHTML='<p style="color:green">You Are A Premium User</p><button id="use-premium" class="btn btn-dark" onClick=showLeaderboard() style="width: 20rem;margin-bottom: 2rem;">Show Leaderboard</button><button id="download-expense" class="btn btn-dark" onClick=downloadExpense() style="width: 20rem;margin-bottom: 2rem;">Download Expense</button>'
        //console.log("/////////////////////////////////////",result.data)
        localStorage.setItem("token",result.data.token)

      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',function(response){
      //console.log(45665)
    })
  } catch (error) {
    //console.error(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function showLeaderboard() {
  alert('Leaderboard under process')
  try {

    document.getElementById('leaderboard').style.display="block";

    const response = await axios.get("http://localhost:3000/premium/showleaderboard", {
      headers: { Authorization: localStorage.getItem("token") },
    });
     //console.log("///////////////////////////////////////////////////",response.data);
     //console.log("///////////////////////////////////////////////////",response);
     const res = response.data;
    for(i in res){
      //console.log("///////////////////////////////////////////////////",res[i]);

      var li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = ` Name: ${res[i].name} &nbsp &nbsp Total_amount: ${res[i].total_amount}  `;

      leaderboard.appendChild(li)

    }
  } catch (error) {
    //console.error(error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function downloadExpense(){
  //console.log("Download Expense Called")
  
  const response = await axios.get("http://localhost:3000/expense/download", {
    headers: { Authorization: localStorage.getItem("token") },
  });
  //console.log(response.data.fileUrl);
  var a = document.createElement("a");
  a.href=response.data.fileUrl;
  a.download="myexpense.csv";
  a.click();
  //console.log(response);
}