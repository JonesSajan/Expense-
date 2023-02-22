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
    console.log(response.data.premium);

    document.getElementById('message').innerText=response.data.msg;

     localStorage.setItem('token',response.data.token)
     await localStorage.setItem('premium',response.data.premium)

     if(response){location.href = 'home.html';}


    document.getElementById("item1").value = "";
    document.getElementById("item2").value = "";


  } catch (error) {
    console.error("catch block called");    
    console.log(error.message);    
    error.message=="Request failed with status code 404"?document.getElementById('message').innerText="User Not Found":document.getElementById('message').innerText="Incorrect password";


    // document.getElementById('message').innerText=error;
    // document.getElementById('message').innerText=error.message;


  }
}
