let emptyOrNot;

/*function animation(){
	$('#id').slideDown("slow");
}*/
function checkTheExpiryDate()
{
	let todo="MyTodo";
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				for(let i=0; i<res.Message.length; i++)
				{
				var momentStartDate = moment(new Date(), "DD/MM/YYYY");
				var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
                var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
                if(res.Message[i].Status != "Completed"&&res.Message[i].Status != "Rejected"&&Difference_In_Time<0)
    				{
						let notify="Task overdue by "+(-1*Difference_In_Time)+" day";
						let Notification={
							"Notification":notify,
							"userId":res.Message[i].UserId,
							"assigneeId":res.Message[i].AssignedBy,
							"Position":"My Todo/Expiry Todo",
							"Status":"unread",
							"Todoid":res.Message[i].TodoId
						}
						
						AddNotification(Notification);
					   	
					}	
				}
			}
		}
	}
			
			xhr.open("POST", "FetchTheTodoList");
	        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr.send("Todo=" + todo);
}
function checkTheTodoExpiryDate()
{
	let todo="MyTodo";
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				for(let i=0; i<res.Message.length; i++)
				{
				var momentStartDate = moment(new Date(), "DD/MM/YYYY");
				var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
                var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
                if(res.Message[i].Status != "Completed"&&res.Message[i].Status != "Rejected"&&0<=Difference_In_Time && Difference_In_Time<=3)
    				{
						let notify="";
						if(Difference_In_Time ==0)
						{
						 notify ="Reminder: Today is the final day";
						}
						else{
						 notify ="Reminder: todo deadline near "+Difference_In_Time+" day"
						}
						let Notification={
							"Notification":notify,
							"userId":res.Message[i].UserId,
							"assigneeId":res.Message[i].AssignedBy,
							"Position":"My Todo/DeadLine todo",
							"Status":"unread",
							"Todoid":res.Message[i].TodoId
						}
						
						AddNotification(Notification);
					   	checkTheExpiryDate();
					}	
				}
			}
		}
	}
			
			xhr.open("POST", "FetchTheTodoList");
	        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr.send("Todo=" + todo);
}

function AddNotification(Notification)
{
	let xht = new XMLHttpRequest();
	                    xht.onreadystatechange = function() {
						if (this.readyState == 4) {
						if (this.status == 200) {
						let res = JSON.parse(this.responseText);
              			 if (res.StatusCode == 200) {
							   console.log("successfully! 34");
						   }
						 }
					   }
					 }
					 xht.open("POST", "AddNotificationServlet");
	       			 xht.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        		 xht.send("NotificationDetails=" + JSON.stringify(Notification));
}

function notify()
{
	console.log(document.getElementById("notification2").childNodes.length);
	 let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let res = JSON.parse(this.responseText);
               if (res.StatusCode == 200) {
				   console.log(res.Message.length);
                   if(res.Message.length==1)
                   {
					 document.getElementById("notify").style="display:none;";   
				   }
				   else
	               {
		             document.getElementById("notify").style="display:block;";
	               }
				}
			}
		}
     }
	xhr.open("POST", "fetchNotifications");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
	
}
function notification()
{
	 $(".r2").css({"display":"flex"});
	 $("#notificationdiv").css({"margin-left": "77%"});
	 let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let res = JSON.parse(this.responseText);
               if (res.StatusCode == 200) {
				   let root =document.getElementById("notification2");
				if (res.Message.length === 0) {
					console.log("empty");
				}
				else
				{
					root.innerHTML="";
				   for(i=res.Message.length-1; i>0; i--)
				   {
					   console.log(res.Message[i]);
					   let parentDiv = document.createElement("div");
					   parentDiv.setAttribute("class","notifyy");
					   parentDiv.setAttribute("id","n");
					   root.appendChild(parentDiv);
					   
					   let headsa = document.createElement("div");
					   headsa.setAttribute("class","headsa");
					   parentDiv.appendChild(headsa);
					    
					   let head1= document.createElement("h5");
					   head1.setAttribute("id","who");
					   headsa.appendChild(head1);
                       head1.textContent = res.Message[i].Position;

					   
					   let head2= document.createElement("h5");
					   head2.setAttribute("class","date2");
					   headsa.appendChild(head2);
					   head2.textContent =res.Message[i].notifyDate;
					   
					   let message= document.createElement("h3");
					   message.setAttribute("class","message");
					   parentDiv.appendChild(message);
					   message.textContent=res.Message[i].Notification;
					   
					   let todoid= document.createElement("h4");
					   todoid.setAttribute("class","todoid");
					   parentDiv.appendChild(todoid);
					   todoid.textContent="TodoID : "+res.Message[i].todoid;
					   
					   let assigneeName= document.createElement("h4");
					   assigneeName.setAttribute("class","assigneename");
					   parentDiv.appendChild(assigneeName);
					   assigneeName.textContent ="Assignee name : "+res.Message[i].AssigneeName;
					   
					   let assigneeid= document.createElement("h4");
					   assigneeid.setAttribute("class","assigneeid");
					   parentDiv.appendChild(assigneeid);
					   assigneeid.textContent ="Assignee Id : "+res.Message[i].AssigneeId;
					   
					   let markasread= document.createElement("h4");
					   markasread.setAttribute("class","markasRead");
					   markasread.setAttribute("onclick","markasRead("+JSON.stringify(res.Message[i].notifyId)+",'read')");
					   parentDiv.appendChild(markasread);
					   markasread.textContent = "Mark as read";
				   }	
				} 
				}
			}
		}
     }
	xhr.open("POST", "fetchNotifications");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
}


function cookieCheck() {
	let coo = document.cookie;
	if (coo == "") {
		window.location.href = "index.html";
	} else {
		 notify();
		OptionData();
		checkTheTodoExpiryDate();
		
	}
}

$(document).ready(function(){
  $("#cross").click(function(){
	  $(".r2").css({"display":"none"});
    $("#notificationdiv").css({"margin-left":'101%'});
  });
});

function markasRead(notificationid, read)
{      document.getElementById("n").style="display:none";
	console.log(notificationid+","+read);
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let res = JSON.parse(this.responseText);
               if (res.StatusCode == 200) {
				   console.log("successfully 107!")
				   notification()
				   notify()
			   }
			   }
			  }
			}
	
	xhr.open("POST", "updateNotification");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("id="+notificationid);
}
function logOut()
{
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				  
				  cookieCheck() ;
				
				}
			}
		}
		
	xhr.open("POST", "LogOut");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
}
function OptionData() {

	let xhr = new XMLHttpRequest();
	let assigneeId = document.getElementById("AssigneeId");
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let res = JSON.parse(this.responseText);

				for (let i = 0; i < res.length; i++) {
					let selection = document.createElement("option");
					assigneeId.appendChild(selection);
					selection.setAttribute("class", "selector");
					selection.setAttribute("value", JSON.stringify(res[i]).replace(/["]/g, ''));
					selection.innerText = JSON.stringify(res[i]).replace(/["]/g, '');
				}

				new MultiSelectTag('AssigneeId');
				fetchMyData();
				FetchAssigneeData();
				FetchAssignedToData();
				//getNameFirstLetter();
				
			}
		}

	}

	xhr.open("POST", "OptionIdServlet");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
	
	FetchAssigneeData();
	FetchAssignedToData();
}
function fetchDataStatusVise()
{
	let status=document.getElementById("status").value;
	fetchMyData();
}
function getNameFirstLetter()
{
	let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let res = JSON.parse(this.responseText);
				let fl = res.Message;
			
                document.getElementById("profileLetter").innerHTML=fl.charAt(0).toUpperCase();
			}
		}

	}

	xhr.open("POST", "getNameServlet1");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();

}
function yourTodo() {
	//document.getElementById("notificationdiv").style="margin-top:-26%;"
	document.getElementById("yourTodo").style = "color: #00a7f6; border-radius: 11px;";
	document.getElementById("AssignedByMe").style = "color:white;";
	document.getElementById("AssignedToMe").style = "color:white;";
	document.getElementById("TodoHead").innerHTML = "My Todo";
	document.getElementById("highPriority").style="display:none;";
	document.getElementById("Todo").style = "display:flex;";
	document.getElementById("change").style.display="none";
	document.getElementById("qqqqqq").style = "display:none";
	document.getElementById("DeadLineTodo").style = "display:none";
	document.getElementById("changes").style = "display:none";
	document.getElementById("TodoDiv").style = "display:flex;"
	document.getElementById("highpr").style="color:white;";
    document.getElementById("close").style = "color:white; font-size: 18px;";
	document.getElementById("expiry").style = "color:white;";
	document.getElementById("change1").innerHTML = "<select onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option> </select>";
	document.getElementById("Assigneessss").style = "display:none";
	document.getElementById("expiryTodo").style="display:none;";
	fetchMyData();
}

function AddTodoBu() {
	document.getElementById("YourDiv").style = "display:flex;"
	document.getElementById("AssigneeDiv").style = "display:none;"
}

function AssignedTodoBu() {
	document.getElementById("AssigneeDiv").style = "display:flex;"
	document.getElementById("YourDiv").style = "display:none;"

}

function Cancel() {
	document.getElementById("taskName").value = "";
	document.getElementById("taskDesc").value = "";
	document.getElementById("dueDate").value = "";
	document.getElementById("priority").value = "";

	document.getElementById("YourDiv").style = "display:none;"
}

function Cancel1() {
	document.getElementById("AssigneeDiv").style = "display:none;"
}

function AddYourTodo() {
	let todoName = document.getElementById("taskName").value;
	let todoDesc = document.getElementById("taskDesc").value;
	let dueDate = document.getElementById("dueDate").value;
	let priority = document.getElementById("priority").value;
	const parts = dueDate.split('/');
	const day = parts[0];
	const month = parts[1];
	const year = parts[2];

	const dDate = `${year}-${month}-${day}`;
	const currentDate = new Date();
	let due = new Date(dDate);

	if (due > currentDate) {
		let jsonresponse = {
			"todoName": todoName,
			"todoDesc": todoDesc,
			"dueDate": dueDate,
			"priority": priority,
			"assignedBy": null,
			"assignedTo": null
		};
		jsonresponse.add
		if (todoName.trim() !== "" && todoDesc.trim() !== "" && dueDate.trim() !== "" && priority.trim() !== "") {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						let res = JSON.parse(this.responseText);
						if (res.StatusCode == 200) {
							alert(res.Message);
							document.getElementsByClassName("addTodoDiv")[0].style = "display:none;";
							document.getElementById("taskName").value = "";
							document.getElementById("taskDesc").value = "";
							document.getElementById("dueDate").value = "";
							document.getElementById("priority").value = "";
							fetchMyData();
						} else {
							console.log(res.Message +"164");
						}
					}
				}
			}
			xhr.open("POST", "TodoAddForDatabase");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("Todo=" + JSON.stringify(jsonresponse));
		} else {
			alert("Enter valid input");
		}
	} else {
		alert("Enter valid Due Date");
	}

}

function AssignedByMe() {
	FetchAssigneeData();
	document.getElementById("DeadLineTodo").style = "display:none";
	//document.getElementById("notificationdiv").style="    margin-top: -52%;"
	//document.getElementById("change1").innerHTML = "<select onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option> </select>";
	document.getElementById("highpr").style="color:white;";
	document.getElementById("highPriority").style="display:none;";
	document.getElementById("Assigneessss").style = "display:none;";
	document.getElementById("AssignedByMe").style = "color:#00a7f6;";
	document.getElementById("yourTodo").style = "color:white;";
	document.getElementById("AssignedToMe").style = "color:white;";
	document.getElementById("TodoHead").innerHTML = "Assigned By Me";
	//document.getElementById("change").style.display="none";
	document.getElementById("Todo").style = "display:none;";
	document.getElementById("change").style.display="none";
	document.getElementById("TodoDiv").style = "display:none;"
	document.getElementById("qqqqqq").style = "display:grid;"
	document.getElementById("changes").style = "display:none";
	document.getElementById("close").style = "color:white; font-size: 18px;";
	document.getElementById("expiry").style = "color:white;";
	document.getElementById("expiryTodo").style="display:none;";
    document.getElementById("qqqqqq").innerHTML = "<div class='addTodo' id='Assignee' onclick='AssignedTodoBu()'> <h5 id='head5'>+</h5></div>";

}

function AssignedToMe() {
	FetchAssignedToData();
	//document.getElementById("notificationdiv").style="    margin-top: -52%;"
	document.getElementById("change1").innerHTML = "<select onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option> </select>";
	document.getElementById("highpr").style="color:white;";
	document.getElementById("AssignedByMe").style = "color:white;";
	document.getElementById("yourTodo").style = "color:white;";
	document.getElementById("AssignedToMe").style = "color:#00a7f6;";
	document.getElementById("TodoHead").innerHTML = "Assigned To Me";
	document.getElementById("Todo").style = "display:none;";
	document.getElementById("Assigneessss").style = "display:grid;";
	document.getElementById("highPriority").style="display:none;";
	document.getElementById("TodoDiv").style = "display:none;"
	document.getElementById("qqqqqq").style = "display:none;"
    document.getElementById("changes").style = "display:none";
	document.getElementById("change").style.display="none";
	document.getElementById("close").style = "color:white; font-size: 18px;";
	document.getElementById("expiry").style = "color:white;";
	document.getElementById("expiryTodo").style="display:none;";
}

function AssigneeTodoAdd() {
	let check = AssigneeTodoAdd1();
	if (check) {
		fetchMyData();
		FetchAssigneeData();
		FetchAssignedToData();
	}

}

function AssigneeTodoAdd1() {

	var inputContainer = document.getElementsByClassName("input-container");
	childNodes = inputContainer[0].childNodes;

	let s = "";
	var assineeMember = "";
	   if(childNodes.length !==0)
    {
	console.log("hii "+childNodes);
	for (var i = 0; i < childNodes.length - 1; i++) {
		assineeMember += childNodes[i].childNodes[0].textContent + ",";
		
	}
	
 
			assineeMember += childNodes[childNodes.length - 1].childNodes[0].textContent;

	let array = assineeMember.split(",");

	for (let i = 0; i < array.length; i++) {
		console.log("hii "+assineeMember+", "+i);
		let todoName = document.getElementById("AssingeetodoName").value;
		let todoDesc = document.getElementById("AssingeetaskDesc").value;
		let dueDate = document.getElementById("AssingeedueDate").value;
		let priority = document.getElementById("Assigneepriority").value;
		let assigneeId = array[i];

		let jsonresponse = {
			"todoName": todoName,
			"todoDesc": todoDesc,
			"dueDate": dueDate,
			"priority": priority,
			"assignedBy": null,
			"assignedTo": assigneeId
		};
		let xhr = new XMLHttpRequest();
		if (todoName.trim() !== "" && todoDesc.trim() !== "" && dueDate.trim() !== "") {
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let res = JSON.parse(this.responseText);
					if (res.StatusCode == 200) {
						s = "Assigned successfully!";
						console.log(s);
						document.getElementById("AssigneeDiv").style = "display:none;"
						document.getElementById("AssingeetodoName").value = "";
						document.getElementById("AssingeetaskDesc").value = "";
						document.getElementById("AssingeedueDate").value = "";
						document.getElementById("Assigneepriority").value = "";
						document.getElementById("AssigneeId").value = "";
						FetchAssigneeData();
						return true;
					} else {
						s = "Assigned successfully!";
						document.getElementById("AssigneeDiv").style = "display:none;"
						document.getElementById("AssigneeId").value = "";
					}
				}
			}
			xhr.open("POST", "TodoAddForDatabase");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("Todo=" + JSON.stringify(jsonresponse));
		}
		else {
			s = "Invalid input";
			return false;
		}
	}
}
else
{
	s = "Enter valid AssigneeId";
}
	alert(s);
}

function myTodoSearchBar()
{
   if(document.getElementById("searchbar").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".dd");
	   let arrayOfD = document.querySelectorAll(".d");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {

		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar").value))		   { 
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
			   //arr[a].style="display:flex;";
		   }
		   
		  
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".d");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}
 function sortTodo()
 {
	 who=document.getElementById("sort").value;
	 console.log(who);
	 if(who == "date")
	 {
		 fetchMyData();
	 }
	 else if(who == "status")
	 {
		 fetchMyData1()
	 }
	 else if(who == "priority")
	 {
		 fetchMyData2()
	 }
 }

function fetchMyData() {
	/*let status="";
	if(what != "All")
	{
		status;
	}*/
	 notify();
	var todo = "MyTodo"
	let xhr = new XMLHttpRequest();
	let array = [];
	let string1;
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("myTododiv");
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
					let first = document.createElement("div");
					first.setAttribute("class","firstfirst");
					first.setAttribute("id","first1st");
					mainDiv.appendChild(first);
					
					first.innerHTML="<select onchange='sortTodo()' style='background-color: black;height: 4%;color: #00a7f6;width: 8%;'class='sortList addTodo' name=sort id='sort'><option value='date'>Date</option><option value='status'>Status</option><option value='priority'>Priority</option>"
					
					/*if(status == "New")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'><option value='New'>New</option> <option value='All'>All</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option></select>"
					}
					else if(status =="Accepted")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else if(status == "Completed")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else if(status== "Rejected")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}*/
					let roots = document.createElement("div");
					roots.setAttribute("class", "firstTodoDiv");
					roots.setAttribute("id", "mytodoshowdiv");
					mainDiv.appendChild(roots);

					let head = document.createElement("h3");
					head.setAttribute("class", "heads");
					a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].StartDate)) {
					
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%);');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("d");
							d.setAttribute("id", "d" + i);
							document.getElementById("d" + i).style = "overflow-y:scroll";

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "div2");
							div2.classList.add("dd");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("down2");
							down2.setAttribute("id", "do" + i);
							document.getElementById("do" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("do" + i).appendChild(subDivs);
							subDivs.classList.add("subdives");
							subDivs.setAttribute("id", "d1" + i);
							subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i]) +",'MyTodo','date')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.setAttribute("class","truncate1")
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							        let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-bottom: -17%;margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";

                                    let todoid = document.createElement("h3");
							        subDivs.appendChild(todoid);
							        todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							        todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;
							
							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

					        var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:green; margin-left: 92%; margin-bottom: 55%;margin-top: -83%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;     margin-top: -82%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:red; margin-left: 92%; margin-bottom: 55%;     margin-top: -80%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:white; margin-left: 93%; margin-bottom: 54%; margin-top: -82%;"
   							}
						} else {
                            let headList = document.querySelectorAll(".dd");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)) {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("subdives");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "d1" + i);
									
							       subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i]) +",'MyTodo','date')")

                                     console.log(subDivs);
									
							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.setAttribute("class","truncate1")
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							        let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-bottom: -17%;margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";

                                    let todoid = document.createElement("h3");
							        subDivs.appendChild(todoid);
							        todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							        todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;
							
							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="margin-top:5%; text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

					        var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:green; margin-left: 92%; margin-bottom: 55%;margin-top: -83%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;     margin-top: -82%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:red; margin-left: 92%; margin-bottom: 55%;     margin-top: -80%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:white; margin-left: 93%;margin-bottom: 54%; margin-top: -82%;"
   							}

								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + todo);
	FetchAssigneeData();
}
function fetchMyData1() {
	/*let status="";
	if(what != "All")
	{
		status;
	}*/
	 notify();
	var todo = "MyTodo"
	let xhr = new XMLHttpRequest();
	let array = [];
	let string1;
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("myTododiv");
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
					let first = document.createElement("div");
					first.setAttribute("class","firstfirst");
					first.setAttribute("id","first1st");
					mainDiv.appendChild(first);
					
					first.innerHTML="<select onchange='sortTodo()' style='background-color: black;height: 4%;color: #00a7f6;width: 8%;'class='sortList addTodo' name=sort id='sort'><option value='status'>Status</option><option value='date'>Date</option><option value='priority'>Priority</option>"
					
					/*if(status == "New")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'><option value='New'>New</option> <option value='All'>All</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option></select>"
					}
					else if(status =="Accepted")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else if(status == "Completed")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else if(status== "Rejected")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}*/
					let roots = document.createElement("div");
					roots.setAttribute("class", "firstTodoDiv");
					roots.setAttribute("id", "mytodoshowdiv");
					mainDiv.appendChild(roots);

					let head = document.createElement("h3");
					head.setAttribute("class", "heads");
					a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].Status)) {
					
							a1 = 16;
							array.push(res.Message[i].Status);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].Status;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%);');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("d");
							d.setAttribute("id", "d" + i);
							document.getElementById("d" + i).style = "overflow-y:scroll";

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "div2");
							div2.classList.add("dd");
							div2.textContent = res.Message[i].Status;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("down2");
							down2.setAttribute("id", "do" + i);
							document.getElementById("do" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("do" + i).appendChild(subDivs);
							subDivs.classList.add("subdives");
							subDivs.setAttribute("id", "d1" + i);
							subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i]) +",'MyTodo','status')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.setAttribute("class","truncate1")
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							        let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-bottom: -17%;margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";

                                    let todoid = document.createElement("h3");
							        subDivs.appendChild(todoid);
							        todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							        todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;
							
							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							/*if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:green;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}*/
							head4.textContent = "Start date : " + res.Message[i].StartDate;

					        var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:green; margin-left: 92%; margin-bottom: 55%;margin-top: -83%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;     margin-top: -82%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:red; margin-left: 92%; margin-bottom: 55%;     margin-top: -80%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:white; margin-left: 93%; margin-bottom: 54%; margin-top: -82%;"
   							}
						} else {
                            let headList = document.querySelectorAll(".dd");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].Status)) {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("subdives");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "d1" + i);
									
							       subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i]) +",'MyTodo','status')")

                                     console.log(subDivs);
									
							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.setAttribute("class","truncate1")
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							        let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-bottom: -17%;margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";

                                    let todoid = document.createElement("h3");
							        subDivs.appendChild(todoid);
							        todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							        todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;
							
							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							/*if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="margin-top:5%; text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}*/
							head4.textContent = "Startdate : " + res.Message[i].StartDate;

					        var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:green; margin-left: 92%; margin-bottom: 55%;margin-top: -83%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;     margin-top: -82%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:red; margin-left: 92%; margin-bottom: 55%;     margin-top: -80%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:white; margin-left: 93%;margin-bottom: 54%; margin-top: -82%;"
   							}

								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + todo);
	FetchAssigneeData();
}

function fetchMyData2() {
	/*let status="";
	if(what != "All")
	{
		status;
	}*/
	 notify();
	var todo = "MyTodo"
	let xhr = new XMLHttpRequest();
	let array = [];
	let string1;
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("myTododiv");
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
					let first = document.createElement("div");
					first.setAttribute("class","firstfirst");
					first.setAttribute("id","first1st");
					mainDiv.appendChild(first);
					
					first.innerHTML="<select onchange='sortTodo()' style='background-color: black;height: 4%;color: #00a7f6;width: 8%;'class='sortList addTodo' name=sort id='sort'><option value='priority'>Priority</option><option value='status'>Status</option><option value='date'>Date</option>"
					
					/*if(status == "New")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'><option value='New'>New</option> <option value='All'>All</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option></select>"
					}
					else if(status =="Accepted")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else if(status == "Completed")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else if(status== "Rejected")
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}
					else
					{
					first.innerHTML="<input type='text' onkeyup='myTodoSearchBar()' placeholder='Search' id='searchbar' class='searchBar'/><select onchange='fetchDataStatusVise()' class='addTodo' name='status' id='status'> <option value='All'>All</option><option value='New'>New</option> <option value='Accepted'>Accepted</option>  <option value='Completed'>Completed</option><option value='Rejected'>Rejected</option><option value='None'>None</option></select>"	
					}*/
					let roots = document.createElement("div");
					roots.setAttribute("class", "firstTodoDiv");
					roots.setAttribute("id", "mytodoshowdiv");
					mainDiv.appendChild(roots);

					let head = document.createElement("h3");
					head.setAttribute("class", "heads");
					a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].Priority)) {
					
							a1 = 16;
							array.push(res.Message[i].Priority);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].Priority;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%);');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("d");
							d.setAttribute("id", "d" + i);
							document.getElementById("d" + i).style = "overflow-y:scroll";

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "div2");
							div2.classList.add("dd");
							div2.textContent = res.Message[i].Priority;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("down2");
							down2.setAttribute("id", "do" + i);
							document.getElementById("do" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("do" + i).appendChild(subDivs);
							subDivs.classList.add("subdives");
							subDivs.setAttribute("id", "d1" + i);
							subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i]) +",'MyTodo','priority')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.setAttribute("class","truncate1")
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							        let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-bottom: -17%;margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";

                                    let todoid = document.createElement("h3");
							        subDivs.appendChild(todoid);
							        todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							        todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									/*if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}*/
							head3.textContent = "Start date : " + res.Message[i].StartDate;
							
							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

					        var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:green; margin-left: 92%; margin-bottom: 55%;margin-top: -83%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;     margin-top: -82%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:red; margin-left: 92%; margin-bottom: 55%;     margin-top: -80%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:white; margin-left: 93%; margin-bottom: 54%; margin-top: -82%;"
   							}
						} else {
                            let headList = document.querySelectorAll(".dd");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].Priority)) {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("subdives");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "d1" + i);
									
							       subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i]) +",'MyTodo','priority')")

                                     console.log(subDivs);
									
							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.setAttribute("class","truncate1")
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							        let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-bottom: -17%;margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";

                                    let todoid = document.createElement("h3");
							        subDivs.appendChild(todoid);
							        todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							        todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									/*if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}*/
							head3.textContent = "start date : " + res.Message[i].StartDate;
							
							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="margin-top:5%; text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

					        var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:green; margin-left: 92%; margin-bottom: 55%;margin-top: -83%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;     margin-top: -82%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:red; margin-left: 92%; margin-bottom: 55%;     margin-top: -80%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="    height: 5%;background-color:white; margin-left: 93%;margin-bottom: 54%; margin-top: -82%;"
   							}

								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + todo);
	FetchAssigneeData();
}
function fetchAssignedbymeSearchBar()
{
   if(document.getElementById("searchbar1").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".a");
	  // let arrayOfD = document.querySelectorAll(".a");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar1").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".a");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function FetchAssigneeData() {
	var todo = "Assignedbyme";
	let array = [];
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("qqqqqq");
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				console.log("enter 541");
				mainDiv.innerHTML = "";
				mainDiv.innerHTML = "<div class='addTodo' id='Assignee' onclick='AssignedTodoBu()'> <h5 id='head5'>+</h5></div>";
				if (res.Message.length == 0) {
					console.log("empty");
					//mainDiv.style.backgroundImage="image/high.png";
				} else {
					let first = document.createElement("div");
					first.setAttribute("class","firstfirst1");
					first.setAttribute("id","first2st");
					mainDiv.appendChild(first);
					
					first.innerHTML="<input type='text' onkeyup='fetchAssignedbymeSearchBar()' placeholder='Search' id='searchbar1' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydiv");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].AssigneeName)) {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("a");
							name2.setAttribute("id", "h" + i);
							name2.setAttribute("onclick", "AssignedByMe2(" + JSON.stringify(res.Message[i].AssignedTo) + "," + JSON.stringify(res.Message[i].AssigneeName) + ")")
							let az=4;
							if (num > az) {
								c = c + 3;
								az+=az;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							document.getElementById("h" + i).appendChild(head1);
							head1.textContent = "Assigned To : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							document.getElementById("h" + i).appendChild(head2);
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedTo;
							head2.style = "font-weight: 300; margin-top: 4%;";

						}
					}
				}

			} else {
				console.log("hiiiii");

			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + todo);


}
function myAssignedByMeSearchBar()
{
   if(document.getElementById("searchbar2").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".ee");
	   let arrayOfD = document.querySelectorAll(".e");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar2").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".e");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}
function AssignedByMe2(id, name) {

	let array = [];
    let xhr = new XMLHttpRequest();
	let string1;
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("qqqqqq");
			let res = JSON.parse(this.responseText);

			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
                    let first = document.createElement("div");
					first.setAttribute("class","firstfirst1");
					first.setAttribute("id","first3st");
					mainDiv.appendChild(first);
					
					//let se = document.createElement("div")
					//first.innerHTML = "<input type='text' onkeyup='myAssignedByMeSearchBar()' placeholder='Search' id='searchbar2' class='searchBar1'/> <select onchange=\"sortTodo1('" + id + "','" + name + "')\" style='background-color: black;height: 4%;color: #00a7f6;width: 8%;'class='sortList1 addTodo' name=sort1 id='sort1'><option value='date'>Date</option><option value='status'>Status</option><option value='priority'>Priority</option>";

					let cancelDiv = document.createElement("div");
					first.appendChild(cancelDiv);
					cancelDiv.innerText = "X";
					cancelDiv.setAttribute("id", "x");
					cancelDiv.setAttribute("onclick", "cancelDisplay()");

					let roots = document.createElement("div");
					roots.setAttribute("class", "secondTodoDiv1");
					roots.setAttribute("id", "assignedByshowdiv1");
					mainDiv.appendChild(roots);
					document.getElementById("assignedByshowdiv1").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "heads");
					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						if (!array.includes(res.Message[i].StartDate)) {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("e");
							d.setAttribute("id", "es" + i);
							document.getElementById("es" + i).style = "overflow-y:scroll;"
                            
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "e1");
							div2.classList.add("ee");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("e3");
							down2.setAttribute("id", "ee1" + i);
							document.getElementById("ee1" + i).style = "overflow-y: scroll;";
							
							let subDivs = document.createElement("div");
							document.getElementById("ee1" + i).appendChild(subDivs);
							subDivs.classList.add("subdives2");
							subDivs.setAttribute("id", "ee2" + i);
							subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i])+",'Assignedbyme')")
						
							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = " margin-top: 0%;  font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							head2.setAttribute("class","truncate")
							head2.setAttribute("title",res.Message[i].TodoDesc)
							head2.style = "    margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";
                            
                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: 7%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = "    margin-top: -1%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = "margin-top: -13%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;
                                   
                                     var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
                            if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:green; margin-left: 92%; margin-bottom: 55%;  margin-top: -74%;    height: 7%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:#8d1fea; margin-left: 92%; margin-bottom: 55%; margin-top: -74%;    height: 7%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:red; margin-left: 92%; margin-bottom: 55%;       margin-top: -74%;    height: 7%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:white; margin-left: 92%; margin-bottom: 54%; margin-top: -74%;    height: 6%;"
   							}
						} else {
							let headList = document.querySelectorAll(".ee");

							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)) {

									let subDivs = document.createElement("div");

									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("subdives2");
							subDivs.setAttribute("id", "ee2" + i);
							subDivs.setAttribute("style","margin-top:8%;")
							subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i])+",'Assignedbyme')")


   									
							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = " margin-top: 0%;  font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							head2.setAttribute("class","truncate")
							head2.setAttribute("title",res.Message[i].TodoDesc)
							head2.style = "    margin-top: -2%;color: #797575;font-family: cursive;font-size: 18px;";
                            
                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: 7%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = "    margin-top: -1%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = "    margin-top: -13%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="margin-top:10%;text-decoration-line: line-through; color:#3a94a7";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
									head4.textContent = "Status : " + res.Message[i].Status;
									

                                     var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    
  							    hi.style="background-color:green; margin-left: 92%; margin-bottom: 55%; margin-top: -74%;    height: 7%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:#8d1fea; margin-left: 92%; margin-bottom: 55%; margin-top: -74%;    height: 7%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:red; margin-left: 92%; margin-bottom: 55%;    margin-top: -74%;   height: 7%;"
   							}
                            else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:white; margin-left: 92%; margin-bottom: 54%; margin-top: -74%; height: 6%;"
   							}
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheAssigneeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);

}


function AssignedToMeSearchBar()
{
   if(document.getElementById("searchbar4").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".i3");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar4").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".i3");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function FetchAssignedToData() {

	var todo2 = "AssigneeTodo";
	let array = [];
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const mainDiv1 = document.querySelector("#Assigneessss");

			let res = JSON.parse(this.responseText);



			console.log(" emter correctly 871");

			if (res.StatusCode == 200) {
				mainDiv1.innerHTML = "";

				const childDivs = mainDiv1.querySelectorAll("div");

				if (childDivs.length === 0) {
					var small = document.createElement("div");
					mainDiv1.appendChild(small);
					small.setAttribute("id", "firstSmallDiv");
				}

				if (res.Message.length == 0) {
					
					console.log("empty");
				} else {
					console.log(" emter correctly 882");
					
					document.getElementById("firstSmallDiv").innerHTML="<input type='text' onkeyup='AssignedToMeSearchBar()' placeholder='Search'style='    height: 59%;' id='searchbar4' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi1");
					roots.setAttribute("id", "assignedBydiv1");
					mainDiv1.appendChild(roots);


					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].AssigneeName)) {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("i3");
							name2.setAttribute("id", "h3" + i);
							name2.setAttribute("onclick", "AssignedByMe3(" + JSON.stringify(res.Message[i].AssignedBy) + "," + JSON.stringify(res.Message[i].AssigneeName) + ")")
							let num1=4;
							if (num > num1) {
								c = c + 3;
								num1+=4
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 34%)');
							}
							let head1 = document.createElement("h3");
							document.getElementById("h3" + i).appendChild(head1);
							head1.textContent = "Assigned by : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							document.getElementById("h3" + i).appendChild(head2);
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedBy;
							head2.style = "font-weight: 300;";
						}
					}
				}

			}

		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + todo2);


}

function showTodoList(TodoDetails,who,sort) {
	console.log(who);
	console.log(TodoDetails);
	let root = document.getElementById("r");
	root.style.display = "flex";
    root.innerHTML = "";
	
	root.innerHTML = "<i id='editTodo' class='fa-solid fa-pen-to-square edit1'></i>";

    
	let todoDiv = document.createElement("div");
	root.appendChild(todoDiv);
	todoDiv.setAttribute("id", "TodoListShow");

	let todoName = document.createElement("h1");
	todoDiv.appendChild(todoName);
	todoName.classList.add("tododesc");
	todoName.textContent = TodoDetails.TodoName;
    
    let todoid = document.createElement("h1");
	todoDiv.appendChild(todoid);
	todoid.classList.add("todoIdes");
	todoid.textContent = TodoDetails.TodoId;
	
	let todoDesc = document.createElement("h4");
	todoDiv.appendChild(todoDesc);
	todoDesc.classList.add("tododesc");
	todoDesc.textContent = TodoDetails.TodoDesc;
	todoDesc.classList.add("todoDescdeatilsDiv");

	let lableS = document.createElement("lable");
	todoDiv.appendChild(lableS)
	lableS.classList.add("sdl");
	lableS.setAttribute("for", "vs");
	lableS.textContent = "StartDate : ";

	let sd = document.createElement("h4");
	todoDiv.appendChild(sd)
	sd.classList.add("sd");
	sd.setAttribute("id", "vs");
	sd.textContent = TodoDetails.StartDate;

	let lableD = document.createElement("lable");
	todoDiv.appendChild(lableD)
	lableD.classList.add("ddl");
	lableD.setAttribute("for", "vd");
	lableD.textContent = "DueDate : ";

	let dd = document.createElement("h4");
	todoDiv.appendChild(dd)
	dd.classList.add("dd2");
	dd.setAttribute("id", "vd");
	dd.textContent = TodoDetails.DueDate;

	var momentStartDate = moment(new Date(), "DD/MM/YYYY");
	var momentDueDate = moment(TodoDetails.DueDate, "DD/MM/YYYY");

	var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');

	let dayd = document.createElement("lable");
	todoDiv.appendChild(dayd)
	dayd.classList.add("du");
	dayd.setAttribute("for", "dul");
	dayd.textContent = "Day Duration : ";

	let dayDu = document.createElement("h4");
	todoDiv.appendChild(dayDu)
	dayDu.classList.add("vdu");
	dayDu.setAttribute("id", "dul");

	 
    if(Difference_In_Time>=0)
    {
	dayDu.textContent = Difference_In_Time;
   }
   else{
	   dayDu.textContent = "Extended deadline";
   }

	let pri = document.createElement("lable");
	todoDiv.appendChild(pri)
	pri.classList.add("prl");
	pri.setAttribute("for", "pr");
	pri.textContent = "Priority : ";

	let sel = document.createElement("select");
	todoDiv.appendChild(sel);
	sel.classList.add("p2");
	sel.setAttribute("id", "pr");
	sel.setAttribute("name", "priority");

	let op1 = document.createElement("option");
	sel.appendChild(op1);
	op1.setAttribute("value", TodoDetails.Priority);
	op1.textContent = TodoDetails.Priority;

	let op2 = document.createElement("option");
	sel.appendChild(op2);

    let op3 = document.createElement("option");
	sel.appendChild(op3);

	let op4 = document.createElement("option");
	sel.appendChild(op4);

	if (TodoDetails.Priority == "High") {
		op2.setAttribute("value", "Medium");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "Medium";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "Medium") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "None") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "Low");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "Low";
	} else if (TodoDetails.Priority == "Low") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "None";
	} 
	
	let stu = document.createElement("lable");
	todoDiv.appendChild(stu)
	stu.classList.add("stl");
	stu.setAttribute("for", "st");
	stu.textContent = "Status : ";

	let sel2 = document.createElement("select");
	todoDiv.appendChild(sel2);
	sel2.classList.add("st2");
	sel2.setAttribute("id", "st");
	sel2.setAttribute("name", "Status");

	let stu1 = document.createElement("option");
	sel2.appendChild(stu1);
	stu1.setAttribute("value", TodoDetails.Status);
	stu1.textContent = TodoDetails.Status;

	let stu2 = document.createElement("option");
	sel2.appendChild(stu2);

	let stu3 = document.createElement("option");
	sel2.appendChild(stu3);

	let stu4 = document.createElement("option");
	sel2.appendChild(stu4);

	if (TodoDetails.Status == "New") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Rejected");
		stu4.setAttribute("value", "Completed");

		stu2.textContent = "Accepted";
		stu3.textContent = "Rejected";
		stu4.textContent = "Completed";
	} else if (TodoDetails.Status == "Accepted") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Rejected") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Accepted";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Completed") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Accepted");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Accepted";
		stu4.textContent = "New";
	}

	let cancel = document.createElement("div");
	todoDiv.appendChild(cancel);
	cancel.setAttribute("id", "cu");
	cancel.classList.add("cancelUpdate");
	cancel.textContent = "Cancel";
	
	if(who == "MyTodo")
	{
    cancel.setAttribute("onclick", "cancelUpdate('"+sort+"','MyTodo')");
	}
	else if(who == "HighPriority")
	{
     cancel.setAttribute("onclick", "cancelUpdate('date','HighPriority')");
	}
   else if(who == "DeadLineTodo")
	{
	 cancel.setAttribute("onclick", "cancelUpdate('date','DeadLineTodo')");
	 }
  else if(who == "ExpiryTodo")
  {
	  cancel.setAttribute("onclick", "cancelUpdate('date','ExpiryTodo')");
	  }

	let update = document.createElement("div");
	todoDiv.appendChild(update);
	update.setAttribute("id", "u");
	update.classList.add("Update");
	update.textContent = "Update";
	if(who == "MyTodo")
	{
	update.setAttribute("onclick", "Update(" + TodoDetails.TodoId +",'"+sort+"')");
	document.getElementById("editTodo").setAttribute("onclick","Edit("+JSON.stringify(TodoDetails)+",'"+sort+"','MyTodo')");
	}
	else if(who == "HighPriority")
	{
	  update.setAttribute("onclick", "UpdateGetMyTodo(" + TodoDetails.TodoId+")");
	  document.getElementById("editTodo").setAttribute("onclick","Edit("+JSON.stringify(TodoDetails)+",'date','HighPriority')");
	}
   else if(who == "DeadLineTodo")
	{
	  update.setAttribute("onclick", "UpdateGetDeadLineTodo(" + TodoDetails.TodoId + ")");
	  document.getElementById("editTodo").setAttribute("onclick","Edit("+JSON.stringify(TodoDetails)+",'date','DeadLineTodo')");
	}
  else if(who == "ExpiryTodo")
  {
	  update.setAttribute("onclick", "UpdateGetExpiryTodo(" + TodoDetails.TodoId + ")");
      document.getElementById("editTodo").setAttribute("onclick","Edit("+JSON.stringify(TodoDetails)+",'date','ExpiryTodo')");
   }
}

function Edit(TodoDetails,sort,who)
{   if(sort ==null)
    {
		sort=date;
	}
	
	
    let root = document.getElementById("r");
	root.style.display = "flex";
	
    root.innerHTML = "";
    
	let todoDiv = document.createElement("div");
	root.appendChild(todoDiv);
	todoDiv.setAttribute("id", "TodoListShow");
	//todoDiv.style="    margin-left: -86%;";
	todoDiv.innerHTML ="<i class='fa-solid fa-xmark crossmark' id='cross1'></i>";
    if(who == "MyTodo")
	{ 
		if(sort == "date")
	 {
		  document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'MyTodo','date')")
		
	 }
	 else if(sort == "status")
	 {
		 document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'MyTodo','status')")
		
	 }
	 else if(sort == "priority")
	 {
		document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'MyTodo','priority')")
		
	 }
	 
	}
	else if(who == "HighPriority")
	{
	 //document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'HighPriority')")
	 if(sort == "date")
	 {
		  document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'HighPriority','date')")
		
	 }
	 else if(sort == "status")
	 {
		 document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'HighPriority','status')")
		
	 }
	 else if(sort == "priority")
	 {
		document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'HighPriority','priority')")
		
	 }
	}
   else if(who == "DeadLineTodo")
	{
	 //document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'DeadLineTodo')")
	 if(sort == "date")
	 {
		  document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'DeadLineTodo','date')")
		
	 }
	 else if(sort == "status")
	 {
		 document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'DeadLineTodo','status')")
		
	 }
	 else if(sort == "priority")
	 {
		document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'DeadLineTodo','priority')")
		
	 }
	}
  else if(who == "ExpiryTodo")
  {
	 //document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'ExpiryTodo')")
	 if(sort == "date")
	 {
		  document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'ExpiryTodo','date')")
		
	 }
	 else if(sort == "status")
	 {
		 document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'ExpiryTodo','status')")
		
	 }
	 else if(sort == "priority")
	 {
		document.getElementById("cross1").setAttribute("onclick","showTodoList("+JSON.stringify(TodoDetails)+",'ExpiryTodo','priority')")
		
	 }
	}
     
	let todoName = document.createElement("input");
	todoDiv.appendChild(todoName);
	todoName.classList.add("edithead");
	todoName.setAttribute("id","todoname1");
	todoName.setAttribute("type","text");
	todoName.setAttribute("value", TodoDetails.TodoName);
    
    let todoid = document.createElement("h1");
	todoDiv.appendChild(todoid);
	todoid.classList.add("todoIdes");
	todoid.textContent = TodoDetails.TodoId;
	
	let todoDesc = document.createElement("input");
	todoDiv.appendChild(todoDesc);
	todoDesc.classList.add("editdesc");
	todoDesc.setAttribute("type","text");
	todoDesc.setAttribute("id","tododesc1");
	todoDesc.setAttribute("value", TodoDetails.TodoDesc);
	todoDesc.classList.add("todoDescdeatilsDiv");

	let lableS = document.createElement("lable");
	todoDiv.appendChild(lableS)
	lableS.classList.add("sdl");
	lableS.setAttribute("for", "vs");
	lableS.textContent = "StartDate : ";

	let sd = document.createElement("h4");
	todoDiv.appendChild(sd)
	sd.classList.add("sd");
	sd.setAttribute("id", "vs");
	sd.textContent = TodoDetails.StartDate;

	let lableD = document.createElement("lable");
	todoDiv.appendChild(lableD)
	lableD.classList.add("ddl");
	lableD.setAttribute("for", "vd");
	lableD.textContent = "DueDate : ";

	let dd = document.createElement("h4");
	todoDiv.appendChild(dd)
	dd.classList.add("dd2");
	dd.setAttribute("id", "vd");
	dd.textContent = TodoDetails.DueDate;
	
	
	//dd.textContent = TodoDetails.DueDate;

	var momentStartDate = moment(new Date(), "DD/MM/YYYY");
	var momentDueDate = moment(TodoDetails.DueDate, "DD/MM/YYYY");

	var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');

	let dayd = document.createElement("lable");
	todoDiv.appendChild(dayd)
	dayd.classList.add("du");
	dayd.setAttribute("for", "dul");
	dayd.textContent = "Day Duration : ";

	let dayDu = document.createElement("h4");
	todoDiv.appendChild(dayDu)
	dayDu.classList.add("vdu");
	dayDu.setAttribute("id", "dul");

	 
    if(Difference_In_Time>=0)
    {
	dayDu.textContent = Difference_In_Time;
   }
   else{
	   dayDu.textContent = "Extended deadline";
   }

	let pri = document.createElement("lable");
	todoDiv.appendChild(pri)
	pri.classList.add("prl");
	pri.setAttribute("for", "pr");
	pri.textContent = "Priority : ";

	let sel = document.createElement("select");
	todoDiv.appendChild(sel);
	sel.classList.add("p2");
	sel.setAttribute("id", "pr");
	sel.setAttribute("name", "priority");

	let op1 = document.createElement("option");
	sel.appendChild(op1);
	op1.setAttribute("value", TodoDetails.Priority);
	op1.textContent = TodoDetails.Priority;

	let op2 = document.createElement("option");
	sel.appendChild(op2);

    let op3 = document.createElement("option");
	sel.appendChild(op3);

	let op4 = document.createElement("option");
	sel.appendChild(op4);

	if (TodoDetails.Priority == "High") {
		op2.setAttribute("value", "Medium");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "Medium";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "Medium") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "None") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "Low");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "Low";
	} else if (TodoDetails.Priority == "Low") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "None";
	} 
	
	let stu = document.createElement("lable");
	todoDiv.appendChild(stu)
	stu.classList.add("stl");
	stu.setAttribute("for", "st");
	stu.textContent = "Status : ";

	let sel2 = document.createElement("select");
	todoDiv.appendChild(sel2);
	sel2.classList.add("st2");
	sel2.setAttribute("id", "st");
	sel2.setAttribute("name", "Status");

	let stu1 = document.createElement("option");
	sel2.appendChild(stu1);
	stu1.setAttribute("value", TodoDetails.Status);
	stu1.textContent = TodoDetails.Status;

	let stu2 = document.createElement("option");
	sel2.appendChild(stu2);

	let stu3 = document.createElement("option");
	sel2.appendChild(stu3);

	let stu4 = document.createElement("option");
	sel2.appendChild(stu4);

	if (TodoDetails.Status == "New") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Rejected");
		stu4.setAttribute("value", "Completed");

		stu2.textContent = "Accepted";
		stu3.textContent = "Rejected";
		stu4.textContent = "Completed";
	} else if (TodoDetails.Status == "Accepted") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Rejected") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Accepted";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Completed") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Accepted");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Accepted";
		stu4.textContent = "New";
	}

	let update = document.createElement("div");
	todoDiv.appendChild(update);
	update.setAttribute("id", "u");
	update.classList.add("update1");
	update.textContent = "Update";
	//update.setAttribute("onclick", "updateWhole("+JSON.stringify(TodoDetails)+")");
	
	if(who == "MyTodo")
	{ 
	  update.setAttribute("onclick","updateWhole("+TodoDetails.TodoId+",'"+sort+"','MyTodo')")
	}
	else if(who == "HighPriority")
	{
	 update.setAttribute("onclick","updateWhole("+TodoDetails.TodoId+",'date','HighPriority')")
	}
   else if(who == "DeadLineTodo")
	{
	 update.setAttribute("onclick","updateWhole("+TodoDetails.TodoId+",'date','DeadLineTodo')")
	}
  else if(who == "ExpiryTodo")
  {
	 update.setAttribute("onclick","updateWhole("+TodoDetails.TodoId+",'date','ExpiryTodo')")
	}
     

}


function Edit1(TodoDetails,who)
{
	console.log("------------------------------------------------------------2496");
	console.log(TodoDetails);
    let root = document.getElementById("r");
	root.style.display = "flex";
	
    root.innerHTML = "";
    
	let todoDiv = document.createElement("div");
	root.appendChild(todoDiv);
	todoDiv.setAttribute("id", "TodoListShows");
	//todoDiv.style="    margin-left: -86%;";
	todoDiv.innerHTML ="<i class='fa-solid fa-xmark crossmark' id='cross3'></i>";
    if(who == "Assignedbyme")
	{ 
	  document.getElementById("cross3").setAttribute("onclick","showTodoList2("+JSON.stringify(TodoDetails)+",'Assignedbyme')")
	}
	else if(who == "HighPriority")
	{
	 document.getElementById("cross3").setAttribute("onclick","showTodoList2("+JSON.stringify(TodoDetails)+",'HighPriority')")
	}
   else if(who == "DeadLineTodo")
	{
	 document.getElementById("cross3").setAttribute("onclick","showTodoList2("+JSON.stringify(TodoDetails)+",'DeadLineTodo')")
	}
  else if(who == "ExpiryTodo")
  {
	 document.getElementById("cross3").setAttribute("onclick","showTodoList2("+JSON.stringify(TodoDetails)+",'ExpiryTodo')")
	}
     
	let todoName = document.createElement("input");
	todoDiv.appendChild(todoName);
	todoName.classList.add("edithead");
	todoName.setAttribute("id","todoname1");
	todoName.setAttribute("type","text");
	//todoName.setAttribute("style","    margin-top: 9%;");
	todoName.setAttribute("value", TodoDetails.TodoName);
    
    let todoid = document.createElement("h1");
	todoDiv.appendChild(todoid);
	todoid.classList.add("todoIdes");
	todoid.setAttribute("style","    top: 27%;");
	todoid.textContent = TodoDetails.TodoId;
	
	let todoDesc = document.createElement("input");
	todoDiv.appendChild(todoDesc);
	todoDesc.classList.add("editdesc");
	todoDesc.setAttribute("type","text");
	todoDesc.setAttribute("id","tododesc1");
	todoDesc.setAttribute("style","margin-top: 8%;margin-bottom: 14%;")
	todoDesc.setAttribute("value", TodoDetails.TodoDesc);
	todoDesc.classList.add("todoDescdeatilsDiv");

	let lableS = document.createElement("lable");
	todoDiv.appendChild(lableS)
	lableS.classList.add("sdl");
	lableS.setAttribute("for", "vs");
	lableS.textContent = "StartDate : ";

	let sd = document.createElement("h4");
	todoDiv.appendChild(sd)
	sd.classList.add("sd");
	sd.setAttribute("id", "vs");
	sd.textContent = TodoDetails.StartDate;

	let lableD = document.createElement("lable");
	todoDiv.appendChild(lableD)
	lableD.classList.add("ddl");
	lableD.setAttribute("for", "vd");
	lableD.textContent = "DueDate : ";

	let dd = document.createElement("h4");
	todoDiv.appendChild(dd)
	dd.classList.add("dd2");
	dd.setAttribute("id", "vd");
	dd.textContent = TodoDetails.DueDate;
	
	
	//dd.textContent = TodoDetails.DueDate;

	var momentStartDate = moment(new Date(), "DD/MM/YYYY");
	var momentDueDate = moment(TodoDetails.DueDate, "DD/MM/YYYY");

	var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');

	let dayd = document.createElement("lable");
	todoDiv.appendChild(dayd)
	dayd.classList.add("du");
	dayd.setAttribute("for", "dul");
	dayd.textContent = "Day Duration : ";

	let dayDu = document.createElement("h4");
	todoDiv.appendChild(dayDu)
	dayDu.classList.add("vdu");
	dayDu.setAttribute("id", "dul");

	 
    if(Difference_In_Time>=0)
    {
	dayDu.textContent = Difference_In_Time;
   }
   else{
	   dayDu.textContent = "Extended deadline";
   }

	let pri = document.createElement("lable");
	todoDiv.appendChild(pri)
	pri.classList.add("prl");
	pri.setAttribute("for", "pr");
	pri.textContent = "Priority : ";

	let sel = document.createElement("select");
	todoDiv.appendChild(sel);
	sel.classList.add("p2");
	sel.setAttribute("id", "pr");
	sel.setAttribute("name", "priority");

	let op1 = document.createElement("option");
	sel.appendChild(op1);
	op1.setAttribute("value", TodoDetails.Priority);
	op1.textContent = TodoDetails.Priority;

	let op2 = document.createElement("option");
	sel.appendChild(op2);

    let op3 = document.createElement("option");
	sel.appendChild(op3);

	let op4 = document.createElement("option");
	sel.appendChild(op4);

	if (TodoDetails.Priority == "High") {
		op2.setAttribute("value", "Medium");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "Medium";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "Medium") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "None") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "Low");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "Low";
	} else if (TodoDetails.Priority == "Low") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "None";
	} 
	
	/*let stu = document.createElement("lable");
	todoDiv.appendChild(stu)
	stu.classList.add("stl");
	stu.setAttribute("for", "st");
	stu.textContent = "Status : ";

	let sel2 = document.createElement("select");
	todoDiv.appendChild(sel2);
	sel2.classList.add("st2");
	sel2.setAttribute("id", "st");
	sel2.setAttribute("name", "Status");

	let stu1 = document.createElement("option");
	sel2.appendChild(stu1);
	stu1.setAttribute("value", TodoDetails.Status);
	stu1.textContent = TodoDetails.Status;

	let stu2 = document.createElement("option");
	sel2.appendChild(stu2);

	let stu3 = document.createElement("option");
	sel2.appendChild(stu3);

	let stu4 = document.createElement("option");
	sel2.appendChild(stu4);

	if (TodoDetails.Status == "New") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Rejected");
		stu4.setAttribute("value", "Completed");

		stu2.textContent = "Accepted";
		stu3.textContent = "Rejected";
		stu4.textContent = "Completed";
	} else if (TodoDetails.Status == "Accepted") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Rejected") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Accepted";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Completed") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Accepted");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Accepted";
		stu4.textContent = "New";
	}*/

	let update = document.createElement("div");
	todoDiv.appendChild(update);
	update.setAttribute("id", "u");
	update.classList.add("update1");
	update.setAttribute("style","    margin-top: 0%;height: 7%;")
	update.textContent = "Update";
	//update.setAttribute("onclick", "updateWhole("+JSON.stringify(TodoDetails)+")");
	console.log(who);
	
	if(who == "Assignedbyme")
	{ 
	  document.getElementById("u").setAttribute("onclick","updateWhole1("+TodoDetails.TodoId+",'"+TodoDetails.Status+"','Assignedbyme')")
	}
	else if(who == "HighPriority")
	{
	 document.getElementById("u").setAttribute("onclick","updateWhole1("+TodoDetails.TodoId+",'"+TodoDetails.Status+"','HighPriority')")
	}
   else if(who == "DeadLineTodo")
	{
	 document.getElementById("u").setAttribute("onclick","updateWhole1("+TodoDetails.TodoId+",'"+TodoDetails.Status+"','DeadLineTodo')")
	}
  else if(who == "ExpiryTodo")
  {
	 document.getElementById("u").setAttribute("onclick","updateWhole1("+TodoDetails.TodoId+",'"+TodoDetails.Status+"','ExpiryTodo')")
	}
     

}

function Edit2(TodoDetails,who)
{
    let root = document.getElementById("r");
	root.style.display = "flex";
	
    root.innerHTML = "";
    
	let todoDiv = document.createElement("div");
	root.appendChild(todoDiv);
	todoDiv.setAttribute("id", "TodoListShows");
	//todoDiv.style="    margin-left: -86%;";
	todoDiv.innerHTML ="<i style='top: 18%;' class='fa-solid fa-xmark crossmark' id='cross1'></i>";
    if(who == "Assignedtome")
	{ 
	  document.getElementById("cross1").setAttribute("onclick","showTodoList3("+JSON.stringify(TodoDetails)+",'Assignedtome')")
	}
	else if(who == "HighPriority")
	{
	 document.getElementById("cross1").setAttribute("onclick","showTodoList3("+JSON.stringify(TodoDetails)+",'HighPriority')")
	}
   else if(who == "DeadLineTodo")
	{
	 document.getElementById("cross1").setAttribute("onclick","showTodoList3("+JSON.stringify(TodoDetails)+",'DeadLineTodo')")
	}
  else if(who == "ExpiryTodo")
  {
	 document.getElementById("cross1").setAttribute("onclick","showTodoList3("+JSON.stringify(TodoDetails)+",'ExpiryTodo')")
	}
     
	let todoName = document.createElement("input");
	todoDiv.appendChild(todoName);
	todoName.classList.add("edithead");
	todoName.setAttribute("id","todoname1");
	todoName.setAttribute("type","text");
	todoName.setAttribute("value", TodoDetails.TodoName);
    
    let todoid = document.createElement("h1");
	todoDiv.appendChild(todoid);
	todoid.classList.add("todoIdes");
	todoid.setAttribute("style","    top: 26%;");
	todoid.textContent = TodoDetails.TodoId;
	
	let todoDesc = document.createElement("input");
	todoDiv.appendChild(todoDesc);
	todoDesc.classList.add("editdesc");
	todoDesc.setAttribute("type","text");
	todoDesc.setAttribute("id","tododesc1");
	todoDesc.setAttribute("value", TodoDetails.TodoDesc);
	todoDesc.classList.add("todoDescdeatilsDiv");

	let lableS = document.createElement("lable");
	todoDiv.appendChild(lableS)
	lableS.classList.add("sdl");
	lableS.setAttribute("for", "vs");
	lableS.textContent = "StartDate : ";

	let sd = document.createElement("h4");
	todoDiv.appendChild(sd)
	sd.classList.add("sd");
	sd.setAttribute("id", "vs");
	sd.textContent = TodoDetails.StartDate;

	let lableD = document.createElement("lable");
	todoDiv.appendChild(lableD)
	lableD.classList.add("ddl");
	lableD.setAttribute("for", "vd");
	lableD.textContent = "DueDate : ";

	let dd = document.createElement("h4");
	todoDiv.appendChild(dd)
	dd.classList.add("dd2");
	dd.setAttribute("id", "vd");
	dd.textContent = TodoDetails.DueDate;
	
	
	//dd.textContent = TodoDetails.DueDate;

	var momentStartDate = moment(new Date(), "DD/MM/YYYY");
	var momentDueDate = moment(TodoDetails.DueDate, "DD/MM/YYYY");

	var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');

	let dayd = document.createElement("lable");
	todoDiv.appendChild(dayd)
	dayd.classList.add("du");
	dayd.setAttribute("for", "dul");
	dayd.textContent = "Day Duration : ";

	let dayDu = document.createElement("h4");
	todoDiv.appendChild(dayDu)
	dayDu.classList.add("vdu");
	dayDu.setAttribute("id", "dul");

	 
    if(Difference_In_Time>=0)
    {
	dayDu.textContent = Difference_In_Time;
   }
   else{
	   dayDu.textContent = "Extended deadline";
   }

	/*let pri = document.createElement("lable");
	todoDiv.appendChild(pri)
	pri.classList.add("prl");
	pri.setAttribute("for", "pr");
	pri.textContent = "Priority : ";

	let sel = document.createElement("select");
	todoDiv.appendChild(sel);
	sel.classList.add("p2");
	sel.setAttribute("id", "pr");
	sel.setAttribute("name", "priority");

	let op1 = document.createElement("option");
	sel.appendChild(op1);
	op1.setAttribute("value", TodoDetails.Priority);
	op1.textContent = TodoDetails.Priority;

	let op2 = document.createElement("option");
	sel.appendChild(op2);

    let op3 = document.createElement("option");
	sel.appendChild(op3);

	let op4 = document.createElement("option");
	sel.appendChild(op4);

	if (TodoDetails.Priority == "High") {
		op2.setAttribute("value", "Medium");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "Medium";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "Medium") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "None") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "Low");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "Low";
	} else if (TodoDetails.Priority == "Low") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "None";
	} */
	
	let stu = document.createElement("lable");
	todoDiv.appendChild(stu)
	stu.classList.add("stl");
	stu.setAttribute("for", "st");
	stu.textContent = "Status : ";

	let sel2 = document.createElement("select");
	todoDiv.appendChild(sel2);
	sel2.classList.add("st2");
	sel2.setAttribute("id", "st");
	sel2.setAttribute("name", "Status");

	let stu1 = document.createElement("option");
	sel2.appendChild(stu1);
	stu1.setAttribute("value", TodoDetails.Status);
	stu1.textContent = TodoDetails.Status;

	let stu2 = document.createElement("option");
	sel2.appendChild(stu2);

	let stu3 = document.createElement("option");
	sel2.appendChild(stu3);

	let stu4 = document.createElement("option");
	sel2.appendChild(stu4);

	if (TodoDetails.Status == "New") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Rejected");
		stu4.setAttribute("value", "Completed");

		stu2.textContent = "Accepted";
		stu3.textContent = "Rejected";
		stu4.textContent = "Completed";
	} else if (TodoDetails.Status == "Accepted") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Rejected") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Accepted";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Completed") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Accepted");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Accepted";
		stu4.textContent = "New";
	}

	let update = document.createElement("div");
	todoDiv.appendChild(update);
	update.setAttribute("id", "u");
	update.classList.add("update1");
	update.textContent = "Update";
	//update.setAttribute("onclick", "updateWhole("+JSON.stringify(TodoDetails)+")");
	
	if(who == "Assignedtome")
	{ 
	  update.setAttribute("onclick","updateWhole2("+TodoDetails.TodoId+",'"+TodoDetails.Priority+"','Assignedtome')")
	}
	else if(who == "HighPriority")
	{
	 update.setAttribute("onclick","updateWhole2("+TodoDetails.TodoId+",'"+TodoDetails.Priority+"','HighPriority')")
	}
   else if(who == "DeadLineTodo")
	{
	 update.setAttribute("onclick","updateWhole2("+TodoDetails.TodoId+",'"+TodoDetails.Priority+"','DeadLineTodo')")
	}
  else if(who == "ExpiryTodo")
  {
	 update.setAttribute("onclick","updateWhole2("+TodoDetails.TodoId+",'"+TodoDetails.Priority+"','ExpiryTodo')")
	}
     

}
function updateWhole(id,sort,who)
{
	if(sort == null)
	{
		sort="date";
	}
		let obje={
		"todoname": document.getElementById("todoname1").value,
		"tododesc" : document.getElementById("tododesc1").value,
		"todoid":id,
		"priority" : document.getElementById("pr").value,
		"status" : document.getElementById("st").value
	}
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
			alert(res.Message);

	let xht = new XMLHttpRequest();
	xht.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
				for(let i=0; i<res.Message.length; i++)
				{
                   if(res.Message[i].TodoId == id)
                   {
					   
					   console.log(res.Message[i]);
				if(who == "MyTodo")
				{ 
					if(sort=="date")
					{
						showTodoList(res.Message[i],'MyTodo','date')
					}
					else if(sort=="status")
					{
						showTodoList(res.Message[i],'MyTodo','status')
					}
					else if(sort == "priority")
					{
						showTodoList(res.Message[i],'MyTodo','priority')
					}
		  			 
				}
				else if(who == "HighPriority")
				{
	             showTodoList(res.Message[i],'HighPriority')
	  			}
   				else if(who == "DeadLineTodo")
				{
				  showTodoList(res.Message[i],'DeadLineTodo')
				}
  				else if(who == "ExpiryTodo")
  				{
				  showTodoList(res.Message[i],'ExpiryTodo')
				}
				   }
					
				}
			}
		}
	}
			
			xht.open("POST", "FetchTheWholeList");
	        xht.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xht.send();

			}
		}
	}
	xhr.open("POST", "updateWholeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("TodoDetails=" +JSON.stringify(obje));

}


function updateWhole1(id,st,who)
{
		let obje={
		"todoname": document.getElementById("todoname1").value,
		"tododesc" : document.getElementById("tododesc1").value,
		"todoid":id,
		"priority" : document.getElementById("pr").value,
		"status" : st
	}
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
			alert(res.Message);

	let xht = new XMLHttpRequest();
	xht.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
				for(let i=0; i<res.Message.length; i++)
				{
                   if(res.Message[i].TodoId == id)
                   {
					   console.log(who);
					   console.log(res.Message[i]);
				if(who == "Assignedbyme")
				{ 
					 console.log(res.Message[i]);
					 console.log("hiiiiiewewewweiewoiweoiweiuoweqouiqweoiuqwe");
	  			  showTodoList2(res.Message[i],'Assignedbyme')
				}
				else if(who == "HighPriority")
				{
	             showTodoList2(res.Message[i],'HighPriority')
	  			}
   				else if(who == "DeadLineTodo")
				{
				  showTodoList2(res.Message[i],'DeadLineTodo')
				}
  				else if(who == "ExpiryTodo")
  				{
				  showTodoList2(res.Message[i],'ExpiryTodo')
				}
				   }
					
				}
			}
		}
	}
			
			xht.open("POST", "FetchTheWholeList");
	        xht.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xht.send();

			}
		}
	}
	xhr.open("POST", "updateWholeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("TodoDetails=" +JSON.stringify(obje));

}

function updateWhole2(id,pr,who)
{
	console.log(id);
		let obje={
		"todoname": document.getElementById("todoname1").value,
		"tododesc" : document.getElementById("tododesc1").value,
		"todoid":id,
		"priority" : pr,
		"status" : document.getElementById("st").value
	}
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
			alert(res.Message);

	let xht = new XMLHttpRequest();
	xht.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				
				console.log(res.Message.length);
				for(let i=0; i<res.Message.length; i++)
				{
					console.log(res.Message[i].TodoId)
                   if(res.Message[i].TodoId == id)
                   {
					   console.log(who);
					   console.log(res.Message[i]);
				if(who == 'Assignedtome')
				{ 
					 
	  			  showTodoList3(res.Message[i],'Assignedtome')
				}
				else if(who == 'HighPriority')
				{
	             showTodoList3(res.Message[i],'Highpriority')
	  			}
   				else if(who == "DeadLineTodo")
				{
				  showTodoList3(res.Message[i],'Deadlinetodo')
				}
  				else if(who == "ExpiryTodo")
  				{
				  showTodoList3(res.Message[i],'Expirytodo')
				}
				   }
					
				}
			}
		}
	}
			
			xht.open("POST", "FetchTheWholeList");
	        xht.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xht.send();

			}
		}
	}
	xhr.open("POST", "updateWholeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("TodoDetails=" +JSON.stringify(obje));

}


function cancelUpdate(sort,who) {
	console.log("hiiiiiiiiiiii1907");
	document.getElementById("r").style.display = "none";
	if(who =="MyTodo")
	{
		 if(sort == "date")
	 {
		 fetchMyData();
	 }
	 else if(sort == "status")
	 {
		 fetchMyData1()
	 }
	 else if(sort == "priority")
	 {
		 fetchMyData2()
	 }
	 }
	 else if(who =="HighPriority")
	 {
		 getMyTodo("MyTodo");
	 }
	 else if(who == "DeadLineTodo")
	 {
		 showDeadLineTodo("MyTodo");
	 }
	 else if(who =="ExpiryTodo")
	 {
		 showExpiryTodo1("MyTodo");
	 }
}

function cancelUpdate2(id,name,who) {
	document.getElementById("r").style.display = "none";
	if(who =="Assignedbyme")
	{
		AssignedByMe2(id,name);
	 }
	 else if(who =="HighPriority")
	 {
		 AssignedByMe4(id,name,'Assignedbyme');
	 }
	 else if(who == "DeadLineTodo")
	 {
		 AssignedByMe5(id,name,'Assignedbyme');
	 }
	 else if(who =="ExpiryTodo")
	 {
		ExpiryTodo5(id,name,'Assignedbyme');
	 }
	
}

function Update(Id,who) {
    let who1 ="me";
    let AssigneeId = "me";
	let status = document.getElementById('st').value;
	let priority = document.getElementById('pr').value
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				if(who == "date")
	 {
		 fetchMyData();
	 }
	 else if(who == "status")
	 {
		 fetchMyData1()
	 }
	 else if(who == "priority")
	 {
		 fetchMyData2()
	 }

			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId + "&who=" + who1+"&AssigneeId="+AssigneeId);


}

function UpdateGetMyTodo(Id) {
    let who = "me";
	let status = document.getElementById('st').value;
	let priority = document.getElementById('pr').value
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				getMyTodo("MyTodo");
				//FetchAssignedToData()
				//AssignedByMe3(id,name);

			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId + "&who=" + who);


}

function UpdateGetDeadLineTodo(Id) {
    let who = "me";
	let status = document.getElementById('st').value;
	let priority = document.getElementById('pr').value
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				showDeadLineTodo("MyTodo");
				//FetchAssignedToData()
				//AssignedByMe3(id,name);

			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId + "&who="+ who);


}
function UpdateGetExpiryTodo(Id) {
    let who ="me";
	let status = document.getElementById('st').value;
	let priority = document.getElementById('pr').value
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				showExpiryTodo1("MyTodo");
				//FetchAssignedToData()
				//AssignedByMe3(id,name);

			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId+ "&who="+ who+"&AssigneeId="+who);


}
function Update1(Id,status1,id,name) {
	let who ="Assignedbyme";
    let priority1 = document.getElementById("pr").value;
    console.log(Id+','+status1+','+priority1+","+id+","+name);
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";

				AssignedByMe2(id,name);

			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status1 + "&priority=" + priority1 + "&todoId=" + todoId + "&who="+who+"&AssigneeId="+id);


}

function Update2(Id,status1,id,name,sort,who) {
    let priority1 = document.getElementById("pr").value;
    console.log(Id+','+status1+','+priority1+","+id+","+name);
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				if(who =="Assignedbyme")
				{
				AssignedByMe4(id,name,"Assignedbyme");
 	 	 	 	}
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status1 + "&priority=" + priority1 + "&todoId=" + todoId + "&who=" +who+"&AssigneeId="+id);


}
function Update3(Id,status1,id,name,sort,who) {
    let priority1 = document.getElementById("pr").value;
    console.log(Id+','+status1+','+priority1+","+id+","+name);
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				if(who == "Assignedbyme")
				{
				AssignedByMe5(id,name,"Assignedbyme");
				}
				else if(who == "Assignedtome")
				{
				 AssignedByMe5(id,name,"AssigneeTodo");
				}
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status1 + "&priority=" + priority1 + "&todoId=" + todoId+ "&who="+ who+"&AssigneeId="+id);


}
function Update4(Id,status1,id,name,who) {
    let priority1 = document.getElementById("pr").value;
    console.log(Id+','+status1+','+priority1+","+id+","+name);
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
				document.getElementById("r").style.display = "none";
				if(who == "Assignedbyme")
				{
				ExpiryTodo5(id,name,"Assignedbyme");
				}
				else if(who == "Assignedtome")
				{
				ExpiryTodo5(id,name,"AssigneeTodo");
				}
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status1 + "&priority=" + priority1 + "&todoId=" + todoId+ "&who="+ who+"&AssigneeId="+id);


}
function cancelDisplay() {
	document.getElementById("qqqqqq").innerHTML = "";

	FetchAssigneeData();
}

function cancelDisplay1() {
	
	document.getElementById("Assigneessss").innerHTML = "";

	FetchAssignedToData()
}
function cancelDisplay2()
{
    document.getElementById("show").innerHTML = "";
   
    document.getElementById("x123").style.display="none";
	getMyTodo("AssigneeTodo");
}
function cancelDisplay21()
{
    document.getElementById("show").innerHTML = "";
   
    document.getElementById("x123").style.display="none";
	getMyTodo("Assignedbyme");
}

function cancelDisplay3(who)
{
	document.getElementById("show1").innerHTML = "";
   
    document.getElementById("x1x").style.display="none";
    console.log("---------"+who);
    if(who == "Assignedbyme")
    {
		document.getElementById("change2").innerHTML = "<select onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> </select>";
		showDeadLineTodo(who);
	}
	else if(who == "AssigneeTodo")
	{
		document.getElementById("change2").innerHTML = "<select onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> </select>";
		showDeadLineTodo(who);
	}
	
}
function cancelDisplay4(who)
{
	document.getElementById("show3").innerHTML = "";
   
    document.getElementById("x2x").style.display="none";
    //console.log("---------"+who);
    if(who == "Assignedbyme")
    {
		document.getElementById("change3").innerHTML = "<select onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> </select>";
		showExpiryTodo1(who);
	}
	else if(who == "AssigneeTodo")
	{
		document.getElementById("change3").innerHTML = "<select onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> </select>";
		showExpiryTodo1(who);
	}
	
}
function showTodoList2(TodoDetails,who) {
	console.log("------------------------------");
	console.log(TodoDetails);
	console.log(TodoDetails.AssigneeName);


	let root = document.getElementById("r");
	root.style.display = "flex";
	root.innerHTML = "";
	
    root.innerHTML = "<i id='editTodo1' class='fa-solid fa-pen-to-square edit'></i>";

	
	let todoDiv = document.createElement("div");
	root.appendChild(todoDiv);
	todoDiv.setAttribute("id", "TodoListShow1");
	todoDiv.style = "height: 61%;";

	let todoName = document.createElement("h1");
	todoDiv.appendChild(todoName);
	todoName.classList.add("tododesc");
	todoName.textContent = TodoDetails.TodoName;
    
    let todoid = document.createElement("h1");
	todoDiv.appendChild(todoid);
	todoid.classList.add("todoIdes1");
	todoid.textContent = TodoDetails.TodoId;
	
	let todoDesc = document.createElement("h4");
	todoDiv.appendChild(todoDesc);
	todoDesc.classList.add("tododesc");
	todoDesc.textContent = TodoDetails.TodoDesc;
	todoDesc.classList.add("todoDescdeatilsDiv1");

	let lableS = document.createElement("lable");
	todoDiv.appendChild(lableS)
	lableS.classList.add("sdls");
	lableS.setAttribute("for", "vs");
	lableS.textContent = "StartDate : ";

	let sd = document.createElement("h4");
	todoDiv.appendChild(sd)
	sd.classList.add("sd");
	sd.setAttribute("id", "vs");
	sd.textContent = TodoDetails.StartDate;

	let lableD = document.createElement("lable");
	todoDiv.appendChild(lableD)
	lableD.classList.add("ddl");
	lableD.setAttribute("for", "vd");
	lableD.textContent = "DueDate : ";

	let dd = document.createElement("h4");
	todoDiv.appendChild(dd)
	dd.classList.add("dd2");
	dd.setAttribute("id", "vd");
	dd.textContent = TodoDetails.DueDate;

	var momentStartDate = moment(new Date(), "DD/MM/YYYY");
	var momentDueDate = moment(TodoDetails.DueDate, "DD/MM/YYYY");

	var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
	let dayd = document.createElement("lable");
	todoDiv.appendChild(dayd)
	dayd.classList.add("du");
	dayd.setAttribute("for", "dul");
	dayd.textContent = "Day Duration : ";

	let dayDu = document.createElement("h4");
	todoDiv.appendChild(dayDu)
	dayDu.classList.add("vdu");
	dayDu.setAttribute("id", "dul");
   
    if(Difference_In_Time>=0)
    {
	dayDu.textContent = Difference_In_Time;
   }
   else{
	   dayDu.textContent = "Extended deadline";
   }

	let pri = document.createElement("lable");
	todoDiv.appendChild(pri)
	pri.classList.add("prl");
	pri.setAttribute("for", "pr");
	pri.textContent = "Priority : ";

	let sel = document.createElement("select");
	todoDiv.appendChild(sel);
	sel.classList.add("p2");
	sel.setAttribute("id", "pr");
	sel.setAttribute("name", "priority");

	let op1 = document.createElement("option");
	sel.appendChild(op1);
	op1.setAttribute("value", TodoDetails.Priority);
	op1.textContent = TodoDetails.Priority;

	let op2 = document.createElement("option");
	sel.appendChild(op2);

	let op3 = document.createElement("option");
	sel.appendChild(op3);

	let op4 = document.createElement("option");
	sel.appendChild(op4);

	if (TodoDetails.Priority == "High") {
		op2.setAttribute("value", "Medium");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "Medium";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "Medium") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Low");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Low";
		op4.textContent = "None";
	} else if (TodoDetails.Priority == "None") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "Low");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "Low";
	} else if (TodoDetails.Priority == "Low") {
		op2.setAttribute("value", "High");
		op3.setAttribute("value", "Medium");
		op4.setAttribute("value", "None");

		op2.textContent = "High";
		op3.textContent = "Medium";
		op4.textContent = "None";
	} 
	/*
	let stu =document.createElement("lable");
    todoDiv.appendChild(stu)
    stu.classList.add("stl");
    stu.setAttribute("for","st");
    stu.textContent="Status : ";
    
    let sel2 = document.createElement("select");
    todoDiv.appendChild(sel2);
    sel2.classList.add("st2");
    sel2.setAttribute("id","st");
    sel2.setAttribute("name","Status");
    
    let stu1 = document.createElement("option");
    sel2.appendChild(stu1);
    stu1.setAttribute("value",TodoDetails.Status);
    stu1.textContent=TodoDetails.Status;

    let stu2 = document.createElement("option");
    sel2.appendChild(stu2);
    
    let stu3 = document.createElement("option");
    sel2.appendChild(stu3);
    
    let stu4 = document.createElement("option");
    sel2.appendChild(stu4);
    
    if(TodoDetails.Status == "New")
    {
      stu2.setAttribute("value","Accepted");
      stu3.setAttribute("value","Rejected");	
      stu4.setAttribute("value","Completed");
      
      stu2.textContent="Accepted";
      stu3.textContent="Rejected";
      stu4.textContent="Completed";
	}
	else if(TodoDetails.Status == "Accepted")
    {
      stu2.setAttribute("value","Rejected");
      stu3.setAttribute("value","Completed");	
      stu4.setAttribute("value","New");
      
      stu2.textContent="Rejected";
      stu3.textContent="Completed";
      stu4.textContent="New";
	}
   else if(TodoDetails.Status == "Rejected")
    {
      stu2.setAttribute("value","Accepted");
      stu3.setAttribute("value","Completed");	
      stu4.setAttribute("value","New");

      stu2.textContent="Accepted";
      stu3.textContent="Completed";
      stu4.textContent="New";
	}
	else if(TodoDetails.Status == "Completed")
    {
      stu2.setAttribute("value","Rejected");
      stu3.setAttribute("value","Accepted");	
      stu4.setAttribute("value","New");

      stu2.textContent="Rejected";
      stu3.textContent="Accepted";
      stu4.textContent="New";
	}
	*/
	let cancel = document.createElement("div");
	todoDiv.appendChild(cancel);
	cancel.setAttribute("id", "cu");
	cancel.classList.add("cancelUpdate");
	cancel.textContent = "Cancel";
	cancel.setAttribute("onclick", "cancelUpdate2('"+TodoDetails.AssignedTo+"','"+TodoDetails.AssigneeName+"','"+who+"')");

	let update = document.createElement("div");
	todoDiv.appendChild(update);
	update.setAttribute("id", "u");
	update.classList.add("Update");
	update.textContent = "Update";
    //console.log("he "+TodoDetails.TodoId + "," + JSON.stringify(TodoDetails.Status) + "," + JSON.stringify(TodoDetails.Priority) +","+ JSON.stringify(TodoDetails.AssignedTo)+","+ JSON.stringify(TodoDetails.AssigneeName));
    if(who == "Assignedbyme")
    {
	update.setAttribute("onclick", "Update1(" + TodoDetails.TodoId + "," + JSON.stringify(TodoDetails.Status)+","+ JSON.stringify(TodoDetails.AssignedTo)+","+ JSON.stringify(TodoDetails.AssigneeName)+")");
    document.getElementById("editTodo1").setAttribute("onclick","Edit1("+JSON.stringify(TodoDetails)+",'Assignedbyme')");
    }
    else if(who =="Highpriority")
    {
	update.setAttribute("onclick", "Update2(" + TodoDetails.TodoId + "," + JSON.stringify(TodoDetails.Status)+","+ JSON.stringify(TodoDetails.AssignedTo)+","+ JSON.stringify(TodoDetails.AssigneeName)+",'Assignedbyme')");		
	document.getElementById("editTodo1").setAttribute("onclick","Edit1("+JSON.stringify(TodoDetails)+",'HighPriority')");
	}
	else if(who=="Deadlinetodo")
	{
	update.setAttribute("onclick", "Update3(" + TodoDetails.TodoId + "," + JSON.stringify(TodoDetails.Status)+","+ JSON.stringify(TodoDetails.AssignedTo)+","+ JSON.stringify(TodoDetails.AssigneeName)+",'Assignedbyme')");			
	document.getElementById("editTodo1").setAttribute("onclick","Edit1("+JSON.stringify(TodoDetails)+",'DeadLineTodo')");
	}
    else if(who == "Expirytodo")
    {
	update.setAttribute("onclick", "Update4(" + TodoDetails.TodoId + "," + JSON.stringify(TodoDetails.Status)+","+ JSON.stringify(TodoDetails.AssignedTo)+","+ JSON.stringify(TodoDetails.AssigneeName)+",'Assignedbyme')");				
	 document.getElementById("editTodo1").setAttribute("onclick","Edit1("+JSON.stringify(TodoDetails)+",'ExpiryTodo')");
   }
}


function cancelUpdate3(id,name,who) {
	console.log(id+","+name);
	document.getElementById("r").style.display = "none";
	if(who =="Assignedtome")
	{
		AssignedByMe3(id,name);
	 }
	  else if(who =="HighPriority")
	 {
		 AssignedByMe4(id,name,'AssigneeTodo');
	 }
	 else if(who == "DeadLineTodo")
	 {
		 AssignedByMe5(id,name,'AssigneeTodo');
	 }
	 else if(who =="ExpiryTodo")
	 {
		ExpiryTodo5(id,name,'AssigneeTodo');
	 }
}

function Update11(Id,pr,id,name) {
    let who ="AssigneeTodo"
	let status = document.getElementById('st').value;
	console.log(st);
	let priority =pr;
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
                document.getElementById("r").style.display = "none";
	            AssignedByMe3(id,name);
			}
			else
			{
				console.log(error);
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId + "&who="+ who+"&AssigneeId="+id);
}
function Update12(Id,pr,id,name) {
    let who ="AssigneeTodo"
	let status = document.getElementById('st').value;
	console.log(st);
	let priority = pr;
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
                document.getElementById("r").style.display = "none";
	            AssignedByMe4(id,name,"AssigneeTodo");
			}
			else
			{
				console.log(error);
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId+ "&who="+ who+"&AssigneeId="+id);
}
function Update13(Id,pr,id,name) {
    let who ="AssigneeTodo"
	let status = document.getElementById('st').value;
	console.log(st);
	let priority =pr;
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
                document.getElementById("r").style.display = "none";
	            AssignedByMe5(id,name,"AssigneeTodo");
			}
			else
			{
				console.log(error);
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId+ "&who="+ who+"&AssigneeId="+id);
}
function Update14(Id,pr,id,name) {
    let who ="AssigneeTodo"
	let status = document.getElementById('st').value;
	console.log(st);
	let priority = pr;
	let todoId = Id;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {

				alert(res.Message);
                document.getElementById("r").style.display = "none";
	            ExpiryTodo5(id,name,"AssigneeTodo");
			}
			else
			{
				console.log(error);
			}
		}
	}
	xhr.open("POST", "update");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("status=" + status + "&priority=" + priority + "&todoId=" + todoId+ "&who="+ who+"&AssigneeId="+id);
}


function myAssignedByMe3SearchBar()
{
   if(document.getElementById("searchbar5").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".ff");
	   let arrayOfD = document.querySelectorAll(".f");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar5").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".f");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}



function AssignedByMe3(id, name) {
	let array = [];
	let xhr = new XMLHttpRequest();
	let string1;
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
		{
			//document.getElementById("assignedBydiv1").style = "display:none;";
			var mainDiv = document.getElementById("Assigneessss");
			let res = JSON.parse(this.responseText);

			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
					let first = document.createElement("div");
					first.setAttribute("class","firstfirst1");
					first.setAttribute("id","first3st");
					mainDiv.appendChild(first);
					
					//let se = document.createElement("div")
					//first.innerHTML="<input type='text' onkeyup='myAssignedByMe3SearchBar()' placeholder='Search' id='searchbar5' class='searchBar1'/>"
					
					let cancelDiv = document.createElement("div");
					first.appendChild(cancelDiv);
					cancelDiv.innerText = "X";
					cancelDiv.setAttribute("id", "x12");
					cancelDiv.setAttribute("onclick", "cancelDisplay1()");

					let roots = document.createElement("div");
					roots.setAttribute("class", "secondTodoDiv2");
					roots.setAttribute("id", "assignedByshowdiv244");
					mainDiv.appendChild(roots);
					document.getElementById("assignedByshowdiv244").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "heads1");
					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						console.log(res.Message[i]);
						if (!array.includes(res.Message[i].StartDate)) {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 24%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("f");
							d.setAttribute("id", "fs" + i);
							d.setAttribute("style","overflow-y: scroll");

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "f1");
							div2.classList.add("ff");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("f3");
							down2.setAttribute("id", "ff1" + i);
                            document.getElementById("ff1" + i).style = "overflow-y:scroll;"
							
							let subDivs = document.createElement("div");
							document.getElementById("ff1" + i).appendChild(subDivs);
							subDivs.classList.add("subdives3");
							subDivs.setAttribute("id", "ff2" + i);
							subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Assignedtome')")

							let head1 = document.createElement("h3");
							document.getElementById("ff2" + i).appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							let head2 = document.createElement("h3");
							document.getElementById("ff2" + i).appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							head2.setAttribute("class","truncate")
							head2.setAttribute("title",res.Message[i].TodoDesc)
							head2.style = "margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";
							
                            let todoid = document.createElement("h3");
						    document.getElementById("ff2" + i).appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "    margin-top: 4%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							document.getElementById("ff2" + i).appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							document.getElementById("ff2" + i).appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;
							
							
							var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
                             console.log(1611);
							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:green; "
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
   								hi.classList.add("expiry1");
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:#8d1fea;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:red;";
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:white;";
   							}

						} else {
							let headList = document.querySelectorAll(".ff");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)) {			
									
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("subdives3");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "ff2" + i);
									subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Assignedtome')")

									let head1 = document.createElement("h3");
									document.getElementById("ff2" + i).appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "    font-size: 25px;";

									let head2 = document.createElement("h3");
									document.getElementById("ff2" + i).appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
									head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";
									
                            let todoid = document.createElement("h3");
						    document.getElementById("ff2" + i).appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "    margin-top: 4%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									document.getElementById("ff2" + i).appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									document.getElementById("ff2" + i).appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									head4.textContent = "Status : " + res.Message[i].Status;

							 var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:green; "
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
   								hi.classList.add("expiry1");
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:#8d1fea;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:red;";
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.classList.add("subDives3expiry");
  							    hi.style="background-color:white;";
   							}
							
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheAssigneeToMeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);

}

function showTodoList3(TodoDetails,who) {
	console.log(TodoDetails);
	let root = document.getElementById("r");
	root.style.display = "flex";
	root.innerHTML = "";

    root.innerHTML = "<i id='editTodo3' class='fa-solid fa-pen-to-square edit'></i>";
    
	let todoDiv = document.createElement("div");
	root.appendChild(todoDiv);
	todoDiv.setAttribute("id", "TodoListShow");
	todoDiv.style = "height: 60%;";

	let todoName = document.createElement("h1");
	todoDiv.appendChild(todoName);
	todoName.classList.add("tododesc");
	todoName.textContent = TodoDetails.TodoName;
    
    let todoid = document.createElement("h1");
	todoDiv.appendChild(todoid);
	todoid.classList.add("todoIdes1");
	todoid.textContent = TodoDetails.TodoId;
	
	let todoDesc = document.createElement("h4");
	todoDiv.appendChild(todoDesc);
	todoDesc.classList.add("tododesc");
	todoDesc.textContent = TodoDetails.TodoDesc;
	todoDesc.classList.add("todoDescdeatilsDiv");

	let lableS = document.createElement("lable");
	todoDiv.appendChild(lableS)
	lableS.classList.add("sdl");
	lableS.setAttribute("for", "vs");
	lableS.textContent = "StartDate : ";

	let sd = document.createElement("h4");
	todoDiv.appendChild(sd)
	sd.classList.add("sd");
	sd.setAttribute("id", "vs");
	sd.textContent = TodoDetails.StartDate;

	let lableD = document.createElement("lable");
	todoDiv.appendChild(lableD)
	lableD.classList.add("ddl");
	lableD.setAttribute("for", "vd");
	lableD.textContent = "DueDate : ";

	let dd = document.createElement("h4");
	todoDiv.appendChild(dd)
	dd.classList.add("dd2");
	dd.setAttribute("id", "vd");
	dd.textContent = TodoDetails.DueDate;

	var momentStartDate = moment(new Date(), "DD/MM/YYYY");
	var momentDueDate = moment(TodoDetails.DueDate, "DD/MM/YYYY");

	var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');

	let dayd = document.createElement("lable");
	todoDiv.appendChild(dayd)
	dayd.classList.add("du");
	dayd.setAttribute("for", "dul");
	dayd.textContent = "Day Duration : ";

	let dayDu = document.createElement("h4");
	todoDiv.appendChild(dayDu)
	dayDu.classList.add("vdu");
	dayDu.setAttribute("id", "dul");
 
    if(Difference_In_Time>=0)
    {
	dayDu.textContent = Difference_In_Time;
   }
   else{
	   dayDu.textContent = "Extended deadline";
   }
	/* let pri =document.createElement("lable");
    todoDiv.appendChild(pri)
    pri.classList.add("prl");
    pri.setAttribute("for","pr");
    pri.textContent="Priority : ";
    
    let sel = document.createElement("select");
    todoDiv.appendChild(sel);
    sel.classList.add("p2");
    sel.setAttribute("id","pr");
    sel.setAttribute("name","priority");
    
    let op1 = document.createElement("option");
    sel.appendChild(op1);
    op1.setAttribute("value",TodoDetails.Priority);
    op1.textContent=TodoDetails.Priority;
    
    let op2 = document.createElement("option");
    sel.appendChild(op2);
    
    let op3 = document.createElement("option");
    sel.appendChild(op3);
    
    let op4 = document.createElement("option");
    sel.appendChild(op4);*/

    
    /*if(TodoDetails.Priority == "High")
    {
      op2.setAttribute("value","Medium");
      op3.setAttribute("value","Low");	
      op4.setAttribute("value","None");
      
      op2.textContent="Medium";  
      op3.textContent="Low";
      op4.textContent="None";
	}
	else if(TodoDetails.Priority == "Medium")
    {
      op2.setAttribute("value","High");
      op3.setAttribute("value","Low");	
      op4.setAttribute("value","None");
      
       op2.textContent="High";  
       op3.textContent="Low";
       op4.textContent="None";
	}
	else if(TodoDetails.Priority == "None")
    {
      op2.setAttribute("value","High");
      op3.setAttribute("value","Medium");	
      op4.setAttribute("value","Low");
      
       op2.textContent="High";  
       op3.textContent="Medium";
       op4.textContent="Low";
	}
	else if(TodoDetails.Priority == "Low")
    {
      op2.setAttribute("value","High");
      op3.setAttribute("value","Medium");	
      op4.setAttribute("value","None");
      
       op2.textContent="High";  
       op3.textContent="Medium";
       op4.textContent="None";
	}	*/

	let stu = document.createElement("lable");
	todoDiv.appendChild(stu)
	stu.classList.add("stl");
	stu.setAttribute("for", "st");
	stu.textContent = "Status : ";

	let sel2 = document.createElement("select");
	todoDiv.appendChild(sel2);
	sel2.classList.add("st2");
	sel2.setAttribute("id", "st");
	sel2.setAttribute("name", "Status");

	let stu1 = document.createElement("option");
	sel2.appendChild(stu1);
	stu1.setAttribute("value", TodoDetails.Status);
	stu1.textContent = TodoDetails.Status;

	let stu2 = document.createElement("option");
	sel2.appendChild(stu2);

	let stu3 = document.createElement("option");
	sel2.appendChild(stu3);

	let stu4 = document.createElement("option");
	sel2.appendChild(stu4);

	if (TodoDetails.Status == "New") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Rejected");
		stu4.setAttribute("value", "Completed");

		stu2.textContent = "Accepted";
		stu3.textContent = "Rejected";
		stu4.textContent = "Completed";
	} else if (TodoDetails.Status == "Accepted") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Rejected") {
		stu2.setAttribute("value", "Accepted");
		stu3.setAttribute("value", "Completed");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Accepted";
		stu3.textContent = "Completed";
		stu4.textContent = "New";
	} else if (TodoDetails.Status == "Completed") {
		stu2.setAttribute("value", "Rejected");
		stu3.setAttribute("value", "Accepted");
		stu4.setAttribute("value", "New");

		stu2.textContent = "Rejected";
		stu3.textContent = "Accepted";
		stu4.textContent = "New";
	} 

	let cancel = document.createElement("div");
	todoDiv.appendChild(cancel);
	cancel.setAttribute("id", "cu");
	cancel.classList.add("cancelUpdate");
	cancel.textContent = "Cancel";
	//cancel.setAttribute("onclick", "cancelUpdate3()");

	let update = document.createElement("div");
	todoDiv.appendChild(update);
	update.setAttribute("id", "u");
	update.classList.add("Update");
	update.textContent = "Update";
	console.log(who);
    console.log(who == "Assignedtome");
    console.log(TodoDetails.Assignedby+","+TodoDetails.AssigneeName);
    
	if(who == 'Assignedtome')
	
	{
		cancel.setAttribute("onclick","cancelUpdate3('"+TodoDetails.Assignedby+"','"+TodoDetails.AssigneeName+"','Assignedtome')");
	update.setAttribute("onclick", "Update11("+TodoDetails.TodoId+","+JSON.stringify(TodoDetails.Priority)+","+JSON.stringify(TodoDetails.Assignedby)+","+JSON.stringify(TodoDetails.AssigneeName)+")");
    document.getElementById("editTodo3").setAttribute("onclick","Edit2("+JSON.stringify(TodoDetails)+",'Assignedtome')");
    }
    else if(who == "Highpriority")
    {
		cancel.setAttribute("onclick","cancelUpdate3('"+TodoDetails.Assignedby+"','"+TodoDetails.AssigneeName+"','HighPriority')");
	update.setAttribute("onclick", "Update12("+TodoDetails.TodoId+","+JSON.stringify(TodoDetails.Priority)+","+JSON.stringify(TodoDetails.Assignedby)+","+JSON.stringify(TodoDetails.AssigneeName)+")");
    document.getElementById("editTodo3").setAttribute("onclick","Edit2("+JSON.stringify(TodoDetails)+",'HighPriority')");
	}
    else if(who == "Deadlinetodo")
    {
		cancel.setAttribute("onclick","cancelUpdate3('"+TodoDetails.Assignedby+"','"+TodoDetails.AssigneeName+"','DeadLineTodo')");
	update.setAttribute("onclick", "Update13("+TodoDetails.TodoId+","+JSON.stringify(TodoDetails.Priority)+","+JSON.stringify(TodoDetails.Assignedby)+","+JSON.stringify(TodoDetails.AssigneeName)+")");
    document.getElementById("editTodo3").setAttribute("onclick","Edit2("+JSON.stringify(TodoDetails)+",'DeadLineTodo')");
	}
    else if(who == "Expirytodo")
    {
		cancel.setAttribute("onclick","cancelUpdate3('"+TodoDetails.Assignedby+"','"+TodoDetails.AssigneeName+"','ExpiryTodo')");
	update.setAttribute("onclick", "Update14("+TodoDetails.TodoId+","+JSON.stringify(TodoDetails.Priority)+","+JSON.stringify(TodoDetails.Assignedby)+","+JSON.stringify(TodoDetails.AssigneeName)+")");
    document.getElementById("editTodo3").setAttribute("onclick","Edit2("+JSON.stringify(TodoDetails)+",'ExpiryTodo')");
   }

}
function showHighPriority()
{
	//document.getElementById("notificationdiv").style="margin-top:-26%;"
	document.getElementById("highPriority").style.display="grid";
	document.getElementById("change").style.display="flex";
	document.getElementById("Assigneessss").style = "display:none;";
	document.getElementById("AssignedByMe").style = "color:white;";
	document.getElementById("highpr").style="color:#00a7f6;";
	document.getElementById("close").style = "color:white; font-size: 18px;";
	document.getElementById("expiry").style = "color:white;";
	document.getElementById("yourTodo").style = "color:white;";
	document.getElementById("AssignedToMe").style = "color:white;";
	document.getElementById("TodoHead").innerHTML = "High Priority Todo";
	document.getElementById("Todo").style = "display:none;";
	document.getElementById("TodoDiv").style = "display:none;"
	document.getElementById("qqqqqq").style = "display:none;";
	document.getElementById("expiryTodo").style="display:none;";
	document.getElementById("DeadLineTodo").style="display:none;"
    showSelectHighPriority();
}

function showSelectHighPriority()
{
	let selector = document.getElementById("change").value;

	getMyTodo(selector);
}

function getMyTodoSearchBar()
{
   if(document.getElementById("searchbar6").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".mm");
	   let arrayOfD = document.querySelectorAll(".m");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar6").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".m");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function getMyAssigneeSearchBar()
{
   if(document.getElementById("searchbar7").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".am");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar7").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".am");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function getMyAssigneeTodoSearchBar()
{
   if(document.getElementById("searchbar8").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".am1");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar8").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".am1");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function getMyTodo(who)
{
	let xhr = new XMLHttpRequest();
	let array = [];
  if(who == "MyTodo")
  {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show");
			var change1 = document.getElementById("change1");
			
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change1.innerHTML="<select onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option> "
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
					//change1.innerHTML+="<input style='height: 50%; width: 21%;' type='text' onkeyup='getMyTodoSearchBar()' placeholder='Search' id='searchbar6' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "showMyHighTodo");
					roots.setAttribute("id", "showMyHighTododiv");
					mainDiv.appendChild(roots);

					let head = document.createElement("h3");
					head.setAttribute("class", "heads");

					a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						if (!array.includes(res.Message[i].StartDate) && res.Message[i].Priority == "High" && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;

							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("m");
							d.setAttribute("id", "mz" + i);
							document.getElementById("mz" + i).style = "overflow-y:scroll";

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "m2");
							div2.classList.add("mm");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("mt2");
							down2.setAttribute("id", "m12" + i);
							document.getElementById("m12" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("m12" + i).appendChild(subDivs);
							subDivs.classList.add("inside");
							subDivs.setAttribute("id", "m1" + i);
							subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i])+",'HighPriority','date'"+ ")")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							head2.setAttribute("class","truncate")
							head2.setAttribute("title",res.Message[i].TodoDesc)
							head2.style = "    margin-top: -3%;color: #797575;font-family: cursive;font-size: 18px;";
							
                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: 3%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} 
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";	    
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
								//document.getElementById("m1"+i).style="text-decoration-line: line-through;";
							}
							head4.textContent = "Status : " + res.Message[i].Status;
							
							                                     var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(Difference_In_Time<0)
    								{
										 let hi = document.createElement("div");
   										 subDivs.appendChild(hi)
  										 hi.classList.add("expiry1");
  										 hi.classList.add("insideExpiry")
  										  
   									}
   									else if(Difference_In_Time == 0)
   									{
										let hi = document.createElement("div");
   										 subDivs.appendChild(hi)
  										 hi.classList.add("expiry1");
  										 hi.classList.add("insideExpiry")
  				     					 hi.style="background-color:white;"; 
  				     				 }

						} else {
							let headList = document.querySelectorAll(".mm");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)&& res.Message[i].Priority == "High"&& res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("inside");
									subDivs.style = "margin-top:8%;";
									subDivs.setAttribute("id", "m1" + i);
									subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i])+",'HighPriority','date'"+ ")")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "    font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
									head2.setAttribute("class","truncate")
							head2.setAttribute("title",res.Message[i].TodoDesc)
							head2.style = "    margin-top: -3%;color: #797575;font-family: cursive;font-size: 18px;";
                              
                              let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: 3%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
										head3.style.color = "#f0483e";
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									//document.getElementById("m1"+i).style="margin-top: 10%; text-decoration-line: line-through;";
									}
									head4.textContent = "Status : " + res.Message[i].Status;

                                     var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(Difference_In_Time<0)
    								{
										 let hi = document.createElement("div");
   										 subDivs.appendChild(hi)
   										 hi.classList.add("expiry1");
  										 hi.classList.add("insideExpiry")
  				     					
  				     				}
   									else if(Difference_In_Time == 0)
   									{
										let hi = document.createElement("div");
   										 subDivs.appendChild(hi)
   										 hi.classList.add("expiry1");
  										 hi.classList.add("insideExpiry")
  				     					 hi.style="background-color:white;";
  				     				}
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);
	}
	else if(who == "Assignedbyme")
	{
		xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var mainDiv = document.getElementById("show");
			let res = JSON.parse(this.responseText);
			var change1 = document.getElementById("change1");
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change1.innerHTML="<select onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> "

				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					change1.innerHTML+="<input style='height: 58%; margin-top: 1.3%; width: 24%;' type='text' onkeyup='getMyAssigneeSearchBar()' placeholder='Search' id='searchbar7' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexe");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].AssigneeName) && res.Message[i].Priority == "High" && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("am");
							name2.setAttribute("id", "am" + i);
							name2.setAttribute("onclick", "AssignedByMe4(" + JSON.stringify(res.Message[i].AssignedTo) + "," + JSON.stringify(res.Message[i].AssigneeName)+","+JSON.stringify(who) + ")")
							let num1=4;
							if (num > num1) {
								c = c + 2;
								num1+=num1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							document.getElementById("am" + i).appendChild(head1);
							head1.classList.add("overL");
							head1.textContent = "Assigned To : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							document.getElementById("am" + i).appendChild(head2);
							head2.classList.add("overL");
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedTo;
							head2.style = "font-weight: 300;";

						}
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);	
}

else if(who == "AssigneeTodo")
{
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show");
			let res = JSON.parse(this.responseText);
			var change1 = document.getElementById("change1");
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change1.innerHTML="<select onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> "

				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					change1.innerHTML+="<input style='height: 58%; margin-top: 1.3%; width: 24%;' type='text' onkeyup='getMyAssigneeTodoSearchBar()' placeholder='Search' id='searchbar8' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexe1");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].AssigneeName) && res.Message[i].Priority == "High" && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("am1");
							name2.setAttribute("id", "am1" + i);
							name2.setAttribute("onclick", "AssignedByMe4(" + JSON.stringify(res.Message[i].AssignedBy) + "," + JSON.stringify(res.Message[i].AssigneeName)+","+JSON.stringify(who) + ")")
							if (num > 0) {
								c = c + 1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							document.getElementById("am1" + i).appendChild(head1);
							head1.classList.add("overL");
							head1.textContent = "Assigned By : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							document.getElementById("am1" + i).appendChild(head2);
							head2.classList.add("overL");
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedBy;
							head2.style = "font-weight: 300;";

						}
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);
}
}

/*function getAssigneeTodo(selector)
{
let xhr = new XMLHttpRequest();
	let array = [];
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show");
			
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexe");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						if (!array.includes(res.Message[i].AssigneeName) && res.Message[i].Priority == "High") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("am");
							name2.setAttribute("id", "am" + i);
							name2.setAttribute("onclick", "AssignedByMe4(" + JSON.stringify(res.Message[i].AssignedTo) + "," + JSON.stringify(res.Message[i].AssigneeName) + ")")
							if (num > 0) {
								c = c + 1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							document.getElementById("am" + i).appendChild(head1);
							head1.textContent = "Assigned To : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							document.getElementById("am" + i).appendChild(head2);
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedTo;
							head2.style = "font-weight: 300;";

						}
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + selector);	
}*/

function getMyAssigneeInsideSearchBar()
{
   if(document.getElementById("searchbar9").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".shows2");
	   let arrayOfD = document.querySelectorAll(".ss");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar9").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".ss");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function getMyAssigneeTodoInsideSearchBar()
{
   if(document.getElementById("searchbar10").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".shows2");
	   let arrayOfD = document.querySelectorAll(".ss");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar10").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".ss");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function AssignedByMe4(id, name,who) {

	let array = [];
    let xhr = new XMLHttpRequest();
	let string1;
	if(who == "Assignedbyme")
	{
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show");
			let res = JSON.parse(this.responseText);
            document.getElementById("change1").innerHTML = "<select style='display:none;'onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option></select>  <div id='x123' onclick='cancelDisplay21()'>X</div>";

			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} 
				else {

					let roots = document.createElement("div");
					roots.setAttribute("class", "showhighAssignedByme ");
					roots.setAttribute("id", "highPriority2");
					mainDiv.appendChild(roots);
					document.getElementById("highPriority2").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "headsss");

					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						if (!array.includes(res.Message[i].StartDate) && res.Message[i].Priority =="High" && res.Message[i].Status !="Completed" && res.Message[i].Status !="Rejected") {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("ss");
							d.setAttribute("id", "sss" + i);
							document.getElementById("sss" + i).style = "overflow-y:scroll;";
   									
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "s1");
							div2.classList.add("shows2");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("s3");
							down2.setAttribute("id", "ss12" + i);
							document.getElementById("ss12" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("ss12" + i).appendChild(subDivs);
							subDivs.classList.add("sdiv");
							subDivs.setAttribute("id", "ses" + i);
							subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i])+",'Highpriority')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    margin-top: 2%;font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							head2.setAttribute("class","truncate")
							head2.setAttribute("title",res.Message[i].TodoDesc)
							head2.style = "    margin-top: -4%;margin-bottom: -15%;color: #797575;font-family: cursive;font-size: 18px;";
                            
                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;
							
                                var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    							if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:green; margin-left: 93%; margin-bottom: 55%;    margin-top: -74%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;    margin-top: -74%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:red; margin-left: 93%; margin-bottom: 55%;    margin-top: -74%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:white; margin-left: 93%; margin-bottom: 54%;     margin-top: -74%;"
   							}		

						} else {
							let headList = document.querySelectorAll(".shows2");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate) && res.Message[i].Priority=="High" && res.Message[i].Status !="Completed" && res.Message[i].Status !="Rejected") {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("sdiv");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "ses" + i);
									subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i]) +",'Highpriority')")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "    margin-top: 2%;font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = " margin-bottom:-15%;margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";
							
                              let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"
                                  
									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									head4.textContent = "Status : " + res.Message[i].Status;
									
                               var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    					  if(res.Message[i].Status == "Completed")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:green; margin-left: 93%; margin-bottom: 55%;    margin-top: -74%;"
   							}
   							else if(res.Message[i].Status == "Rejected")
    						{
								let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:#8d1fea; margin-left: 93%; margin-bottom: 55%;    margin-top: -74%;"
   							}
                            else if(Difference_In_Time <0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:red; margin-left: 93%; margin-bottom: 55%;     margin-top: -74%;"
   							}
   							else if(Difference_In_Time ==0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:white; margin-left: 93%; margin-bottom: 54%;     margin-top: -74%;"
   							}
								}
							}
						}
					}
				 }
				}
			}
		}
		
			xhr.open("POST", "FetchTheAssigneeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);
	}
  else if( who == "AssigneeTodo")
  {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show");
			let res = JSON.parse(this.responseText);
            document.getElementById("change1").innerHTML = "<select style='display:none;'onchange='showSelectHighPriority()'class='addTodo' name='select' id='change'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option><select> <div id='x123' onclick='cancelDisplay2()'>X</div>";

			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				if (res.Message.length === 0) {
					console.log("empty");
				} 
				else {
					console.log(res.Message.length);
					let roots = document.createElement("div");
					roots.setAttribute("class", "showhighAssignedByme ");
					roots.setAttribute("id", "highPriority2");
					mainDiv.appendChild(roots);
					document.getElementById("highPriority2").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "headsss");

					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						if (!array.includes(res.Message[i].StartDate) && res.Message[i].Priority =="High" && res.Message[i].Status !="Completed" && res.Message[i].Status !="Rejected") {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("ss");
							d.setAttribute("id", "sss" + i);
							document.getElementById("sss" + i).style = "overflow-y:scroll;"
							
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "s1");
							div2.classList.add("shows2");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("s3");
							down2.setAttribute("id", "ss12" + i);
							document.getElementById("ss12" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("ss12" + i).appendChild(subDivs);
							subDivs.classList.add("sdiv");
							subDivs.setAttribute("id", "ses" + i);
							subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Highpriority')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "margin-top: 2%;font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-top: -4%; margin-bottom:-13%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						   subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;
                               var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
                            if(Difference_In_Time <=0)
                            {
							    let hi = document.createElement("div");
   								subDivs.appendChild(hi)
  							    hi.classList.add("expiry1");
  							    hi.style="background-color:red; margin-left: 93%; margin-bottom: 55%; margin-top: -64%;"
   							}
						} else {
							let headList = document.querySelectorAll(".shows2");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate) && res.Message[i].Priority=="High" && res.Message[i].Status !="Completed" && res.Message[i].Status !="Rejected") {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("sdiv");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "ses" + i);
									subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Highpriority')")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "margin-top: 2%;font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "margin-top: -4%; margin-bottom:-13%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									head4.textContent = "Status : " + res.Message[i].Status;
									                               var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(Difference_In_Time<=0)
    								{
										 let hi = document.createElement("div");
   										 subDivs.appendChild(hi)
  										 hi.classList.add("expiry1");
  										  hi.style=" margin-left: 93%; margin-bottom: 55%; margin-top: -66%;"
   									}
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheAssigneeToMeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);
  }
}
function deadLineTodos()
{
	//document.getElementById("notificationdiv").style="    margin-top: -52%;"
	document.getElementById("highPriority").style.display="none";
	//document.getElementById("change").style.display="none";
	document.getElementById("Assigneessss").style = "display:none;";
	document.getElementById("AssignedByMe").style = "color:white;";
	document.getElementById("close").style="color:#00a7f6; font-size: 18px;";
	document.getElementById("highpr").style = "color:white;";
	document.getElementById("expiry").style = "color:white;";
	document.getElementById("yourTodo").style = "color:white;";
	document.getElementById("AssignedToMe").style = "color:white;";
	document.getElementById("TodoHead").innerHTML = "Deadline Todo";
	document.getElementById("Todo").style = "display:none;";
	document.getElementById("TodoDiv").style = "display:none;";
	document.getElementById("qqqqqq").style = "display:none;";
	document.getElementById("expiryTodo").style="display:none;";
	document.getElementById("DeadLineTodo").style="display:grid;";
    showDeadLineTodo1();
}
function ExpiryTodo()
{
	//document.getElementById("notificationdiv").style="     margin-top: -52%;"
    document.getElementById("highPriority").style.display="none";
	//document.getElementById("change").style.display="none";
	document.getElementById("Assigneessss").style = "display:none;";
	document.getElementById("AssignedByMe").style = "color:white;";
	document.getElementById("close").style="color:white; font-size: 18px;";
	document.getElementById("highpr").style = "color:white;";
	document.getElementById("expiry").style = "color:#00a7f6;";
	document.getElementById("yourTodo").style = "color:white;";
	document.getElementById("AssignedToMe").style = "color:white;";
	document.getElementById("TodoHead").innerHTML = "Expiry Todo";
	document.getElementById("Todo").style = "display:none;";
	document.getElementById("TodoDiv").style = "display:none;";
	document.getElementById("qqqqqq").style = "display:none;";
	document.getElementById("DeadLineTodo").style="display:none;";
	document.getElementById("expiryTodo").style="display:grid;";
	ShowExpiryTodo();
}
function showDeadLineTodo1()
{
	console.log(document.getElementById("changes").value);
	let selector = document.getElementById("changes").value;
	showDeadLineTodo(selector);
}
function ShowExpiryTodo()
{
	//console.log(document.getElementById("changes3").value);
	let selector = document.getElementById("changes3").value;
	showExpiryTodo1(selector);
}

function getDeadLineTodoSearchBar()
{
   if(document.getElementById("searchbar11").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".zz");
	   let arrayOfD = document.querySelectorAll(".z");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar11").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".z");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function getAsssignedByMeDeadLineTodo()
{
   if(document.getElementById("searchbar13").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".am");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar13").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".am");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function getMyAssigneeTodoSearchBar1()
{
   if(document.getElementById("searchbar17").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".am1");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar17").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".am1");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function showDeadLineTodo(who)
{
	
	let xhr = new XMLHttpRequest();
	let array = [];
  if(who == "MyTodo")
  {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show1");
			var change2 = document.getElementById("change2");
			
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change2.innerHTML="<select onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option> "
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
				//	change2.innerHTML+="<input style='height: 50%; width: 21%;' type='text' onkeyup='getDeadLineTodoSearchBar()' placeholder='Search' id='searchbar11' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "showDeadLineTodo");
					mainDiv.appendChild(roots);

					let head = document.createElement("h3");
					head.setAttribute("class", "headss");

					a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
							
					     var momentStartDate = moment(new Date(), "DD/MM/YYYY");
					     var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

						 var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    					if(0<=Difference_In_Time && Difference_In_Time<=3)
    				{
						if (!array.includes(res.Message[i].StartDate) && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {

							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;

							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("z");
							d.setAttribute("id", "z00" + i);
							document.getElementById("z00" + i).style = "overflow-y:scroll";

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "z2");
							div2.classList.add("zz");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("zt2");
							down2.setAttribute("id", "z12" + i);
							document.getElementById("z12" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("z12" + i).appendChild(subDivs);
							subDivs.classList.add("zsubDive");
							subDivs.setAttribute("id", "z1" + i);
							subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i])+",'DeadLineTodo'"+ ")")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-top: -3%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: 2%;color: #479ab8;font-family: cursive;font-size: 20px;"


							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} 
							else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "rgb(235, 137, 9)";
							}
							else if (res.Message[i].Priority == "Low") {
								head3.style.color = "rgb(36, 111, 224)";
							}
 
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through;";	    
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
								//document.getElementById("z1"+i).style="text-decoration-line: line-through; color:#00cfba";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

						} else {
							let headList = document.querySelectorAll(".zz");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)&& res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("zsubDive");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "zsbDive2");
									subDivs.setAttribute("id", "z1" + i);
									subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i])+",'DeadLineTodo'"+ ")")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "    font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-top: -3%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						   subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: 2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
								        head3.style.color = "#f0483e";
							            } 
							       else if (res.Message[i].Priority == "Medium") {
								       head3.style.color = "rgb(235, 137, 9)";
							           }
							       else if (res.Message[i].Priority == "Low") {
								       head3.style.color = "rgb(36, 111, 224)";
							           }
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									//document.getElementById("m1"+i).style="text-decoration-line: line-through; color:#00cfba";
									}
									head4.textContent = "Status : " + res.Message[i].Status;
   									}
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);
	}
	else if(who == "Assignedbyme")
	{
		xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var mainDiv = document.getElementById("show1");
			let res = JSON.parse(this.responseText);
			var change2 = document.getElementById("change2");
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change2.innerHTML="<select onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> "

				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					change2.innerHTML+="<input style='height: 58%; margin-top: 1.3%; width: 24%;' type='text' onkeyup='getAsssignedByMeDeadLineTodo()' placeholder='Search' id='searchbar13' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexe");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						var momentStartDate = moment(new Date(), "DD/MM/YYYY");
						var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
						var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
						if (!array.includes(res.Message[i].AssigneeName) && 0<=Difference_In_Time && Difference_In_Time<=3 && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("am");
							name2.setAttribute("id", "am" + i);
							name2.setAttribute("onclick", "AssignedByMe5(" + JSON.stringify(res.Message[i].AssignedTo) + "," + JSON.stringify(res.Message[i].AssigneeName)+","+JSON.stringify(who) + ")")
							if (num > 0) {
								c = c + 1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							name2.appendChild(head1);
							head1.classList.add("overL");
							head1.textContent = "Assigned To : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							name2.appendChild(head2);
							head2.classList.add("overL");
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedTo;
							head2.style = "font-weight: 300;";

						}
					   
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);	
}

else if(who == "AssigneeTodo")
{
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show1");
			let res = JSON.parse(this.responseText);
			var change2 = document.getElementById("change2");
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change2.innerHTML="<select onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> "

				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					change2.innerHTML+="<input style='height: 58%; margin-top: 1.3%; width: 24%;' type='text' onkeyup='getMyAssigneeTodoSearchBar1()' placeholder='Search' id='searchbar17' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexe1");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						var momentStartDate = moment(new Date(), "DD/MM/YYYY");
						var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
						var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
						if (!array.includes(res.Message[i].AssigneeName) && 0<=Difference_In_Time && Difference_In_Time<=3 && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("am1");
							name2.setAttribute("id", "am1" + i);
							name2.setAttribute("onclick", "AssignedByMe5(" + JSON.stringify(res.Message[i].AssignedBy) + "," + JSON.stringify(res.Message[i].AssigneeName)+","+JSON.stringify(who) + ")")
							if (num > 0) {
								c = c + 1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							console.log(3814);
							let head1 = document.createElement("h3");
							name2.appendChild(head1);
							head1.classList.add("overL");
							head1.textContent = "Assigned By : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							name2.appendChild(head2);
							head2.classList.add("overL");
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedBy;
							head2.style = "font-weight: 300;";

						}
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);
}
}

function getExipiryTodoSearchBar()
{
   if(document.getElementById("searchbar12").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".expiryex");
	   let arrayOfD = document.querySelectorAll(".expiry");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar12").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".expiry");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function getAsssignedByMeExpiryTodo()
{
   if(document.getElementById("searchbar14").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".assignedBydivexpirys");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar14").value) )
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".assignedBydivexpirys");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}

function getMyAssigneeTodoSearchBar2()
{
   if(document.getElementById("searchbar18").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".assignedBydivexpiryexss");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar18").value))
		   {
              arrayOfDD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfDD[i].style="display:flex;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".assignedBydivexpiryexss");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:flex;";
	   }
   }
}


function showExpiryTodo1(who)
{
	
	let xhr = new XMLHttpRequest();
	let array = [];
  if(who == "MyTodo")
  {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show3");
			var change2 = document.getElementById("change3");
			
			let res = JSON.parse(this.responseText);
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change2.innerHTML="<select onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='AssigneeTodo'>Assigned To Me</option> "
				if (res.Message.length === 0) {
					console.log("empty");
				} else {
					//change2.innerHTML+="<input style='height: 50%; width: 21%;' type='text' onkeyup='getExipiryTodoSearchBar()' placeholder='Search' id='searchbar12' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "showExpiryTodo");
					mainDiv.appendChild(roots);

					let head = document.createElement("h3");
					head.setAttribute("class", "headss");

					a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
							
					     var momentStartDate = moment(new Date(), "DD/MM/YYYY");
					     var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

						 var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    					if(Difference_In_Time<=0)
    				{
						if (!array.includes(res.Message[i].StartDate) && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {

							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;

							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("expiry");
							d.setAttribute("id", "expiry" + i);
							document.getElementById("expiry" + i).style = "overflow-y:scroll";

							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "expiryz");
							div2.classList.add("expiryex");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("expiryt");
							down2.setAttribute("id", "expiryt" + i);
							document.getElementById("expiryt" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("expiryt" + i).appendChild(subDivs);
							subDivs.classList.add("expirysubDive");
							subDivs.setAttribute("id", "expirysubDive" + i);
							subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i])+",'ExpiryTodo'" + ")")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    margin-top: 3%; font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-top: -4%;margin-bottom: -15%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"


							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} 
							else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "rgb(235, 137, 9)";
							}
							else if (res.Message[i].Priority == "Low") {
								head3.style.color = "rgb(36, 111, 224)";
							}
 
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";	    
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
								//document.getElementById("expirysubDive"+i).style="text-decoration-line: line-through; color:#00cfba";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

						} else {
							let headList = document.querySelectorAll(".expiryex");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)&& Difference_In_Time<0 && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("expirysubDive");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "zsbDive2");
									subDivs.setAttribute("id", "expirysubDive" + i);
									subDivs.setAttribute("onclick", "showTodoList(" + JSON.stringify(res.Message[i])+",'ExpiryTodo'" + ")")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "    margin-top: 3%;font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
									head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "   margin-top: -4%;margin-bottom: -15%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"


									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
										} 
									else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "rgb(235, 137, 9)";
										}
									else if (res.Message[i].Priority == "Low") {
										head3.style.color = "rgb(36, 111, 224)";
										}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									
									}
									head4.textContent = "Status : " + res.Message[i].Status;
   									}
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);
	}
	else if(who == "Assignedbyme")
	{
		xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var mainDiv = document.getElementById("show3");
			let res = JSON.parse(this.responseText);
			var change2 = document.getElementById("change3");
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change2.innerHTML="<select onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> "

				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					change2.innerHTML+="<input style='height: 58%; margin-top: 1.3%; width: 24%;' type='text' onkeyup='getAsssignedByMeExpiryTodo()' placeholder='Search' id='searchbar14' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexpiry");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						var momentStartDate = moment(new Date(), "DD/MM/YYYY");
						var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
						var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
						if (!array.includes(res.Message[i].AssigneeName) && Difference_In_Time<0 && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("assignedBydivexpirys");
							name2.setAttribute("id", "assignedBydivexpiry" + i);
							name2.setAttribute("onclick", "ExpiryTodo5(" + JSON.stringify(res.Message[i].AssignedTo) + "," + JSON.stringify(res.Message[i].AssigneeName)+","+JSON.stringify(who) + ")")
							let num1=4;
							if (num > num1) {
								c = c + 3;
								num1+=num1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							name2.appendChild(head1);
							head1.classList.add("overL")
							head1.textContent = "Assigned To : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							name2.appendChild(head2);
							head2.classList.add("overL")
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedTo;
							head2.style = "font-weight: 300;";

						}
					   
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);	
}

else if(who == "AssigneeTodo")
{
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show3");
			let res = JSON.parse(this.responseText);
			var change2 = document.getElementById("change3");
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				change2.innerHTML="<select onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='MyTodo'>My Todo</option> <option value='Assignedbyme'>Assigned By Me</option> "

				if (res.Message.length === 0) {
					console.log("empty");
				}
				else{
					change2.innerHTML+="<input style='height: 58%; margin-top: 1.3%; width: 24%;' type='text' onkeyup='getMyAssigneeTodoSearchBar2()' placeholder='Search' id='searchbar18' class='searchBar1'/>"
					
					let roots = document.createElement("div");
					roots.setAttribute("class", "hi");
					roots.setAttribute("id", "assignedBydivexpiryex");
					mainDiv.appendChild(roots);
					let num = 0;
					let c = 0;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						var momentStartDate = moment(new Date(), "DD/MM/YYYY");
						var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");
						var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
						if (!array.includes(res.Message[i].AssigneeName) && Difference_In_Time<0 && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							num = num + 1;
							array.push(res.Message[i].AssigneeName);
							let name2 = document.createElement("div");
							roots.appendChild(name2);
							name2.classList.add("assignedBydivexpiryexss");
							name2.setAttribute("id", "assignedBydivexpiryexss" + i);
							name2.setAttribute("onclick", "ExpiryTodo5(" + JSON.stringify(res.Message[i].AssignedBy) + "," + JSON.stringify(res.Message[i].AssigneeName)+","+JSON.stringify(who) + ")")
							num1=4;
							if (num > num1) {
								c = c + 3;
								num1+=num1;
								roots.setAttribute('style', 'grid-template-rows: repeat(' + c + ', 32%)');
							}
							let head1 = document.createElement("h3");
							name2.appendChild(head1);
							head1.textContent = "Assigned By : " + res.Message[i].AssigneeName;
							head1.style = "font-weight: 300;";

							let head2 = document.createElement("h3");
							name2.appendChild(head2);
							head2.textContent = "Assignee Id : " + res.Message[i].AssignedBy;
							head2.style = "font-weight: 300;";

						}
					}
				}
				
			}
				
         }
     }
     
     xhr.open("POST", "FetchTheTodoList");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Todo=" + who);
}
}
function getMyAssigneeInsideSearchBar1()
{
   if(document.getElementById("searchbar15").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".shows3");
	   let arrayOfD = document.querySelectorAll(".de");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar15").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".de");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function getMyAssigneeTodoInsideSearchBar1()
{
   if(document.getElementById("searchbar19").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".shows2");
	   let arrayOfD = document.querySelectorAll(".ss");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar19").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".ss");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function getMyAssigneeTodoInsideSearchBar2()
{
   if(document.getElementById("searchbar20").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".shows4");
	   let arrayOfD = document.querySelectorAll(".expiryde");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar20").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".expiryde");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}

function AssignedByMe5(id, name,who) {

	let array = [];
    let xhr = new XMLHttpRequest();
	let string1;
	let you = who;
	if(who == "Assignedbyme")
	{
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show1");
			let res = JSON.parse(this.responseText);

			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				document.getElementById("change2").innerHTML = "<select style='display:none;' onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> </select> <input style='height: 50%; width: 21%;' type='text' onkeyup='getMyAssigneeInsideSearchBar1()' placeholder='Search' id='searchbar15' class='searchBar1'/> <div id='x1x' onclick=\"cancelDisplay3('Assignedbyme')\">X</div>";

				if (res.Message.length === 0) {
					console.log("empty");
				} 
				else {
                    
					let roots = document.createElement("div");
					roots.setAttribute("class", "deadLineTodo");
					roots.setAttribute("id", "deadLineTodo2");
					mainDiv.appendChild(roots);
					document.getElementById("deadLineTodo2").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "headsss");

					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						                                var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(0<=Difference_In_Time && Difference_In_Time<=3 && res.Message[i].Status !="Completed" && res.Message[i].Status !="Rejected")
    								{

						if (!array.includes(res.Message[i].StartDate)) {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("de");
							d.setAttribute("id", "de" + i);
							document.getElementById("de" + i).style = "overflow-y:scroll;";
   									
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "del");
							div2.classList.add("shows3");
                            div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("dels");
							down2.setAttribute("id", "delsr" + i);
							document.getElementById("delsr" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("delsr" + i).appendChild(subDivs);
							subDivs.classList.add("sdiv");
							subDivs.setAttribute("id", "delsrs" + i);
							subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i]) +",'Deadlinetodo')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "margin-top: 2%;font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-bottom: -13%; margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

						} else {
							let headList = document.querySelectorAll(".shows3");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)) {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("sdiv");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "delsrs" + i);
									subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i]) +",'Deadlinetodo')")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "margin-top: 2%;font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
								    head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-bottom: -13%; margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									head4.textContent = "Status : " + res.Message[i].Status;
									
                              /* var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(Difference_In_Time<0)
    								{
										 let hi = document.createElement("div");
   										 subDivs.appendChild(hi)
  										 hi.classList.add("expiry1");
  										  hi.style=" margin-left: 93%; margin-bottom: 55%; margin-top: -66%;"
   									}*/
								}
							}
						}
					 }
					}
				 }
				}
			}
		}
		
			xhr.open("POST", "FetchTheAssigneeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);
	}
  else if( who == "AssigneeTodo")
  {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show1");
			let res = JSON.parse(this.responseText);
            
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				document.getElementById("change2").innerHTML = "<select style='display:none;' onchange='showDeadLineTodo1()'class='addTodo' name='select' id='changes'> <option value='AssigneeTodo'>Assigned To Me</option> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> </select> <input style='height: 50%; width: 21%;' type='text' onkeyup='getMyAssigneeTodoInsideSearchBar1()' placeholder='Search' id='searchbar19' class='searchBar1'/>  <div id='x1x' onclick=\"cancelDisplay3('AssigneeTodo')\">X</div>";

				if (res.Message.length === 0) {
					console.log("empty");
				} 
				else {
					console.log(res.Message);
					let roots = document.createElement("div");
					roots.setAttribute("class", "deadLineTodo");
					roots.setAttribute("id", "deadLineTodo2");
					mainDiv.appendChild(roots);
					document.getElementById("deadLineTodo2").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "headsss");

					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {
						    var momentStartDate = moment(new Date(), "DD/MM/YYYY");
							var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

							var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    						if(0<=Difference_In_Time && Difference_In_Time<=3 && res.Message[i].Status !="Completed" && res.Message[i].Status !="Rejected")
    						{
						if (!array.includes(res.Message[i].StartDate)) {

							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("de");
							d.setAttribute("id", "de" + i);
							document.getElementById("de" + i).style = "overflow-y:scroll;"
							
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "del");
							div2.classList.add("shows3");
							div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("dels");
							down2.setAttribute("id", "delsr" + i);
							document.getElementById("delsr" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("delsr" + i).appendChild(subDivs);
							subDivs.classList.add("delsrr");
							subDivs.setAttribute("id", "delsrs" + i);
							subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Deadlinetodo')")

							let head1 = document.createElement("h3");
							document.getElementById("delsrs" + i).appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "    font-size: 25px;";

							let head2 = document.createElement("h3");
							document.getElementById("delsrs" + i).appendChild(head2);
						head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    document.getElementById("d1" + i).appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							document.getElementById("delsrs" + i).appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							document.getElementById("delsrs" + i).appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent="Status : "+res.Message[i].Status;

						} else {
							let headList = document.querySelectorAll(".shows3");
					
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)) {
								
									let subDivs = document.createElement("div");
									
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("delsrr");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "delsrs" + i);
									subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Deadlinetodo')")

									let head1 = document.createElement("h3");
									document.getElementById("delsrs" + i).appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "    font-size: 25px;";

									let head2 = document.createElement("h3");
									document.getElementById("delsrs" + i).appendChild(head2);
								head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    document.getElementById("d1" + i).appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

									let head3 = document.createElement("h6");
									document.getElementById("delsrs" + i).appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									document.getElementById("delsrs" + i).appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									
									head4.textContent="Status : "+res.Message[i].Status;

								}
								
							}
						}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheAssigneeToMeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);
  }
}
function getMyAssigneeInsideSearchBar2()
{
   if(document.getElementById("searchbar16").value.trim() !=="")
   {
	   let arrayOfDD = document.querySelectorAll(".shows4");
	   let arrayOfD = document.querySelectorAll(".expiryde");
	   for(let i=0; i<arrayOfDD.length; i++)
	   {
		   if(!arrayOfDD[i].textContent.includes(document.getElementById("searchbar16").value))
		   {
              arrayOfD[i].style="display:none;"; 
		   }
		   else
		   {
			   arrayOfD[i].style="display:grid;"; 
		   }
	   }
   }
   else
   {
	   let arrayOfD = document.querySelectorAll(".expiryde");
	    for(let i=0; i<arrayOfD.length; i++)
	   {
			   arrayOfD[i].style="display:grid;";
	   }
   }
}
function ExpiryTodo5(id, name,who) {

	let array = [];
    let xhr = new XMLHttpRequest();
	let string1;
	if(who == "Assignedbyme")
	{
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show3");
			let res = JSON.parse(this.responseText);

			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				document.getElementById("change3").innerHTML = "<select style='display:none;' onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> </select> <input style='height: 50%; width: 21%;' type='text' onkeyup='getMyAssigneeInsideSearchBar2()' placeholder='Search' id='searchbar16' class='searchBar1'/> <div id='x2x' onclick=\"cancelDisplay4('Assignedbyme')\">X</div>";

				if (res.Message.length === 0) {
					console.log("empty");
				} 
				else {

					let roots = document.createElement("div");
					roots.setAttribute("class", "expiryTodos");
					roots.setAttribute("id", "expiryTodoss");
					mainDiv.appendChild(roots);
					document.getElementById("expiryTodoss").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "headsss");

					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						           var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(Difference_In_Time<0)
    								{

						if (!array.includes(res.Message[i].StartDate) && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("expiryde");
							d.setAttribute("id", "expiryde" + i);
							document.getElementById("expiryde" + i).style = "overflow-y:scroll;";
   									
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "expirydel");
							div2.classList.add("shows4");
                            div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("expirydels");
							down2.setAttribute("id", "expirydels" + i);
							document.getElementById("expirydels" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("expirydels" + i).appendChild(subDivs);
							subDivs.classList.add("expirydelsdiv");
							subDivs.setAttribute("id", "expirydelsdiv" + i);
							subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i]) +",'Expirytodo')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = " margin-bottom: 15px; font-size: 25px;margin-top: 3%;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "      margin-bottom: -14%;  margin-top: 2%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent = "Status : " + res.Message[i].Status;

						} else {
							let headList = document.querySelectorAll(".shows4");
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate) && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected") {
									let subDivs = document.createElement("div");
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("expirydelsdiv");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "expirydelsdiv" + i);
									subDivs.setAttribute("onclick", "showTodoList2(" + JSON.stringify(res.Message[i]) +",'Expirytodo')")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = " margin-bottom: 15px; font-size: 25px;margin-top: 3%;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
						head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-bottom: -14%; margin-top: 2%;color: #797575;font-family: cursive;font-size: 18px;";

									
	                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"
		                			
		                			let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									head4.textContent = "Status : " + res.Message[i].Status;

								}
							}
						}
					 }
					}
				 }
				}
			}
		}
		
			xhr.open("POST", "FetchTheAssigneeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);
	}
  else if( who == "AssigneeTodo")
  {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mainDiv = document.getElementById("show3");
			let res = JSON.parse(this.responseText);
            
			if (res.StatusCode == 200) {
				mainDiv.innerHTML = "";
				document.getElementById("change3").innerHTML = "<select style='display:none;' onchange='ShowExpiryTodo()'class='addTodo' name='select' id='changes3'> <option value='Assignedbyme'>Assigned By Me</option> <option value='MyTodo'>My Todo</option> <option value='AssigneeTodo'>Assigned To Me</option> </select> <input style='height: 50%; width: 21%;' type='text' onkeyup='getMyAssigneeTodoInsideSearchBar2()' placeholder='Search' id='searchbar20' class='searchBar1'/>  <div id='x2x' onclick=\"cancelDisplay4('AssigneeTodo')\">X</div>";

				if (res.Message.length === 0) {
					console.log("empty");
				} 
				else {
					let roots = document.createElement("div");
					roots.setAttribute("class", "expiryTodos");
					roots.setAttribute("id", "expiryTodoss");
					mainDiv.appendChild(roots);
					document.getElementById("expiryTodoss").style = "overflow-x:scroll;"

					let head = document.createElement("h3");
					head.setAttribute("class", "headsss");

					let a = 0;
					let a1;
					for (let i = res.Message.length - 1; i >= 0; i--) {

						                                var momentStartDate = moment(new Date(), "DD/MM/YYYY");
									var momentDueDate = moment(res.Message[i].DueDate, "DD/MM/YYYY");

									var Difference_In_Time = momentDueDate.diff(momentStartDate, 'days');
 
    								if(Difference_In_Time<0 && res.Message[i].Status != "Completed" && res.Message[i].Status != "Rejected")
    								{

						if (!array.includes(res.Message[i].StartDate)) {
							a1 = 16;
							array.push(res.Message[i].StartDate);
							string1 = array.join(" ");
							a = a + 1;
							head.textContent = res.Message[i].StartDate;
							roots.setAttribute('style', 'grid-template-columns: repeat(' + a + ', 25%)');

							var d = document.createElement("div");
							roots.appendChild(d);
							d.classList.add("expiryde");
							d.setAttribute("id", "expiryde" + i);
							document.getElementById("expiryde" + i).style = "overflow-y:scroll;";
   									
							let div2 = document.createElement("div");
							d.appendChild(div2);
							div2.setAttribute("id", "expirydel");
							div2.classList.add("shows4");
                            div2.textContent = res.Message[i].StartDate;


							let down2 = document.createElement("div");
							d.appendChild(down2);
							down2.classList.add("expirydels");
							down2.setAttribute("id", "expirydels" + i);
							document.getElementById("expirydels" + i).style = "overflow-y: scroll;";

							let subDivs = document.createElement("div");
							document.getElementById("expirydels" + i).appendChild(subDivs);
							subDivs.classList.add("expiryyy");
							subDivs.setAttribute("id", "expiryyy" + i);
							subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Expirytodo')")

							let head1 = document.createElement("h3");
							subDivs.appendChild(head1);
							head1.innerText = res.Message[i].TodoName;
							head1.style = "margin-top: 2%; font-size: 25px;";

							let head2 = document.createElement("h3");
							subDivs.appendChild(head2);
							head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "   margin-bottom: -13%; margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						    subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"

							let head3 = document.createElement("h6");
							subDivs.appendChild(head3);
							head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
							if (res.Message[i].Priority == "High") {
								head3.style.color = "#f0483e";
							} else if (res.Message[i].Priority == "Medium") {
								head3.style.color = "#eb8909"
							} else if (res.Message[i].Priority == "Low") {
								head3.style.color = "#246fe0";
							}
							head3.textContent = "Priority : " + res.Message[i].Priority;


							let head4 = document.createElement("h6");
							subDivs.appendChild(head4);
							head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
							
							if (res.Message[i].Status == "New") {
								head4.style.color = "#6dd645";
							} else if (res.Message[i].Status == "Accepted") {
								head4.style.color = "#9E40EB"
							} else if (res.Message[i].Status == "Completed") {
								head4.style.color = "#e9da1e";
								subDivs.style="text-decoration-line: line-through; color:#3a94a7;";
							} else if (res.Message[i].Status == "Rejected") {
								head4.style.color = "#52a9a1";
							}
							head4.textContent="Status : "+res.Message[i].Status;

						} else {
							let headList = document.querySelectorAll(".shows3");
					
							for (let j = 0; j < headList.length; j++) {
								if (headList[j].textContent.includes(res.Message[i].StartDate)) {
								
									let subDivs = document.createElement("div");
									
									headList[j].nextSibling.appendChild(subDivs);
									subDivs.classList.add("expiryyy");
									subDivs.style = "margin-top:5%;";
									subDivs.setAttribute("id", "expiryyy" + i);
									subDivs.setAttribute("onclick", "showTodoList3(" + JSON.stringify(res.Message[i]) +",'Expirytodo')")

									let head1 = document.createElement("h3");
									subDivs.appendChild(head1);
									head1.style = "font-size: 25px;";
									head1.textContent = res.Message[i].TodoName;
									head1.style = "margin-top: 2%; font-size: 25px;";

									let head2 = document.createElement("h3");
									subDivs.appendChild(head2);
						head2.textContent = res.Message[i].TodoDesc;
							        head2.setAttribute("class","truncate")
							        head2.setAttribute("title",res.Message[i].TodoDesc)
							        head2.style = "    margin-bottom: -13%; margin-top: -4%;color: #797575;font-family: cursive;font-size: 18px;";

                            let todoid = document.createElement("h3");
						   subDivs.appendChild(todoid);
							todoid.textContent ="TodoId : "+res.Message[i].TodoId;
							todoid.style = "margin-top: -2%;color: #479ab8;font-family: cursive;font-size: 20px;"


									let head3 = document.createElement("h6");
									subDivs.appendChild(head3);
									head3.style = " margin-top: -2%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Priority == "High") {
										head3.style.color = "#f0483e";
									} else if (res.Message[i].Priority == "Medium") {
										head3.style.color = "#eb8909"
									} else if (res.Message[i].Priority == "Low") {
										head3.style.color = "#246fe0";
									}
									head3.textContent = "Priority : " + res.Message[i].Priority;


									let head4 = document.createElement("h6");
									subDivs.appendChild(head4);
									head4.style = " margin-top: -11%;font-size: 23px; font-weight: 300;";
									if (res.Message[i].Status == "New") {
										head4.style.color = "#6dd645";
									} else if (res.Message[i].Status == "Accepted") {
										head4.style.color = "#9E40EB"
									} else if (res.Message[i].Status == "Completed") {
										head4.style.color = "#e9da1e";
										subDivs.style="margin-top: 5%; text-decoration-line: line-through; color:#3a94a7;";
									} else if (res.Message[i].Status == "Rejected") {
										head4.style.color = "#52a9a1";
									}
									
									head4.textContent="Status : "+res.Message[i].Status;

								}
								
							}
						}
						}
					}
				}
			}
		}
	}
	xhr.open("POST", "FetchTheAssigneeToMeTodo");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("Id=" + id + "&Name=" + name);
  }
}

