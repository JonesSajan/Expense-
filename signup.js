var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var body = document.getElementsByTagName("body");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

form.addEventListener("submit", addItem);

async function addItem(e) {
  e.preventDefault();
  
  try { 
    var newItem1 = e.target.name.value;
    var newItem2 = e.target.email.value;
    var newItem3 = e.target.password.value;
    const data = {
      name: newItem1,
      email: newItem2,
      password: newItem3,
    };

    console.log(typeof data);

    const response = await axios.post(
      "http://localhost:3000/user/adduser",
      data
    );
    console.log(response.data);
    if(response.data)
    {document.getElementById('message').innerHTML='<p style="color:green">Account Created Successfully</p>'}

  } catch (error) {
    console.error(error);
  }
}

