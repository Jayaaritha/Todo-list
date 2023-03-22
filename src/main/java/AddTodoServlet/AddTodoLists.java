package AddTodoServlet;


import java.io.IOException;
import java.sql.PreparedStatement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import AddTodoClass.AddNotification;
import AddTodoClass.AddTodo;
import AddTodoClass.AddTodoDbClass;
import dbs.Dbconnection;
import fetchData.FetchDataClass;

/**
 * Servlet implementation class addTodoLists
 */
//@WebServlet("/addTodoLists")
public class AddTodoLists extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddTodoLists() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		boolean check=false;
		String jsonInput = request.getParameter("Todo");
		JSONParser parser = new JSONParser();
		JSONObject responseObject = new JSONObject();
		String userId="";
		try {
			JSONObject json = (JSONObject)parser.parse(jsonInput);
			  String todoName = (String)json.get("todoName");
		      String todoDesc = (String)json.get("todoDesc");
		      String du = (String)json.get("dueDate");
		      String priority = (String)json.get("priority");
		      String status = "New";
		      String assignedBy = (String)json.get("assignedBy");
		      String assignedTo = (String)json.get("assignedTo");
		      SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		      Date date = new Date();
		      String startDate = sdf.format(date);
	        DateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
	        Date finishdate = null;
			try {
				finishdate = inputFormat.parse(du);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        DateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy");
	        String dueDate = outputFormat.format(finishdate);
	        
			  
			  Cookie[] cookies = request.getCookies();
			  for(Cookie cook : cookies)
			  {
				  //System.out.println("user : "+userId);
				  //System.out.println("cookie : "+cook.getName());
				  if(cook.getName().equals("userId"))
				  {
				  userId=cook.getValue();
				  }
			  }
			  //System.out.println(todoName+","+todoDesc+","+startDate+","+dueDate+","+priority+","+status+","+assignedBy+","+assignedTo+","+userId);
			  
			  
			  AddTodo addTodo=new AddTodo(todoName,todoDesc,startDate,dueDate,priority,status,assignedBy,assignedTo,userId);
	          check=AddTodoDbClass.AddTodo(addTodo);
	          
		} catch(Exception ex)
	      {
	    	  //System.out.println("114-AddTodoList Db connection problem");
	    	  ex.getMessage();
	    	  responseObject.put("StatusCode",500);
		      responseObject.put("Message", "query Mistake"); 
	    	  check=false;
	      }
	      
	      if(check)
	      {
	    	  //String notification= userName +" changed the priority "+priority1;	
	    	    
	    	responseObject.put("StatusCode",200);
	    	responseObject.put("Message", "Added successfuly!");
	      }
	      else
	      {
	    	  responseObject.put("StatusCode",500);
		      responseObject.put("Message", "query Mistake"); 
	      }
//	      
	      //System.out.println("added Successfuly : "+responseObject.toString());
	      response.getWriter().append(responseObject.toString());
	}

}
