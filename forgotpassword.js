var form = document.getElementById("addForm");
form.addEventListener("submit", forgotPassword);

async function forgotPassword(e) {
  e.preventDefault();
  
  try { 
    var newItem1 = e.target.email.value;
    const data = {
      email: newItem1,
    };


    const response = await axios.post(
      "http://localhost:3000/password/forgotpassword",
      data
    );
    console.log(response);
    if(response.data){
      document.getElementById('message').innerHTML='<p style="color:green">Please Check Your Mail</p>'
      form.style.display="none";
    
  }



 



  } catch (error) {
    console.error("catch block called");    
    console.log(error.message);    


    


  }
}
