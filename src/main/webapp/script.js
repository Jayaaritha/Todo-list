const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementsByClassName('container')[0];
const signupContainer = document.getElementsByClassName('sign-up-container')[0];
signUpButton.addEventListener('click', () => {
	document.getElementById("userId").value="";
    document.getElementById("pass").value="";
    container.classList.add('right-panel-active');
    signupContainer.classList.add('right');
    signupContainer.classList.remove('left');
});

signInButton.addEventListener('click', () => {
	document.getElementById("userName").value="";
    document.getElementById("passWord").value="";
    document.getElementById("Id").value="";
    document.getElementById("mail").value="";
    container.classList.remove('right-panel-active');
    signupContainer.classList.remove('right');
    signupContainer.classList.add('left');
    
});

function signUp() {
	
    document.getElementById("signupP").innerHTML =" ";
    let user = document.getElementById("userName").value;
    let pass = document.getElementById("passWord").value;
    let Id = document.getElementById("Id").value;
    let mail = document.getElementById("mail").value;

    let jsonresponse={
		"name":user,
		"passWord":pass,
		"userName":Id,
		"email":mail
	};

    if (pass.length === 8 && user.trim() !=="" && Id.trim()!=="" && mail.trim()!== "") {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    try {
						let result = this.responseText.substring(this.responseText.indexOf("{"), this.responseText.indexOf("}")+1);
							var resp = JSON.parse(result);
							console.log(resp);
							if(resp.StatusCode==200)
							{
								window.location.href="TodoWeb.html";
							 }
							else{
								document.getElementById("signupP").innerHTML += resp.message;
							}
							
                    } catch (error) {
                        console.log(" Error parsing JSON response:", error);
                    }
                }
            }
        };
        xhr.open("POST", "SignUp");
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        console.log(jsonresponse);
        xhr.send("signup="+JSON.stringify(jsonresponse));
    } 
    else if(pass.length !== 8) {
        document.getElementById("signupP").innerHTML += " Invalid password length is not 8";
    }
    else if(pass.length === 8 && user.trim() ==="" && Id.trim()!=="" && mail.trim()!== "")
    {
		 document.getElementById("signupP").innerHTML += " Invalid Name";
	}
	else if(pass.length === 8 && Id.trim() ===""&& user.trim() !=="" && mail.trim()!== "")
    {
		 document.getElementById("signupP").innerHTML += " Invalid Id";
	}
    else if(pass.length === 8 && mail.trim() ==="" && Id.trim()!=="" && user.trim() !=="")
    {
		 document.getElementById("signupP").innerHTML += " Invalid mail";
	}
	else
	{
		 document.getElementById("signupP").innerHTML += "Invalid inputs";
	}
}

function logIn()
{
	document.getElementById("signinP").innerHTML =" ";
    let userId = document.getElementById("userId").value;
    let pass = document.getElementById("pass").value;
    
    if (pass.length === 8 && userId.trim() !=="") {
    let xht = new XMLHttpRequest();
    
    xht.onreadystatechange = function()
    {
		if(this.readyState==4 && this.status == 200)
		{
			let result = this.responseText.substring(this.responseText.indexOf("{"), this.responseText.indexOf("}")+1);
			var resp = JSON.parse(result);
			if(resp.StatusCode==200)
			{
				window.location.href="TodoWeb.html";
			}
			else{
			document.getElementById("signinP").innerHTML += resp.Message;
			}
		}
	}
        xht.open("POST", "SignIn");
        xht.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xht.send("userId="+userId+"&password="+pass);
 	}
 		else if(userId.trim() === "")
	{
		document.getElementById("signinP").innerHTML += " Invalid Id";
	}
 	else if(pass.trim()==="")
 	{
		 document.getElementById("signinP").innerHTML += " Invalid password";
	 }
 	else if(pass.length !== 8)
 	{
		  document.getElementById("signinP").innerHTML += " Invalid password length is not 8";
	}

	else{
		document.getElementById("signinP").innerHTML += " Invalid inputs";	
	}
}
