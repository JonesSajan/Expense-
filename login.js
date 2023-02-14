var form = document.getElementById("addForm");
form.addEventListener("submit", login);

async function login(e) {
  e.preventDefault();
  
  try { 
    var newItem1 = e.target.email.value;
    var newItem2 = e.target.password.value;
    const data = {
      email: newItem1,
      password: newItem2,
    };


    const response = await axios.post(
      "http://localhost:3000/user/loginuser",
      data
    );
    console.log(response.data);

    document.getElementById('message').innerText=response.data;

    location.href = 'home.html';


    document.getElementById("item1").value = "";
    document.getElementById("item2").value = "";


  } catch (error) {
    console.error(error);    
    document.getElementById('message').innerText=error;

  }
}
