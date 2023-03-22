package fetchData;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import TodoDetails.TodoDetailsClass;

/**
 * Servlet implementation class FetchTheAssignedAssigneeTodo
 */
//@WebServlet("/FetchTheAssignedAssigneeTodo")
public class FetchTheTodoList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchTheTodoList() {
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
	@SuppressWarnings({ "unchecked", "unused" })
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//System.out.println("hi=46=fetch data");
        String myTodo = request.getParameter("Todo");
	    JSONArray arr = new JSONArray();
	    JSONArray arr1 = new JSONArray();
	    JSONArray arr2 = new JSONArray();
	    JSONObject jsonResponse = new JSONObject();
		String userId="";
		  Cookie[] cookies = request.getCookies();
		  for(Cookie cook : cookies)
		  {
			  if(cook.getName().equals("userId"))
			  {
			  userId=cook.getValue();
			  }
		  }
		  //System.out.println(userId+"====60 fetch");
	    boolean check = false;
	    boolean check1=false;
	    boolean check2=false;
	    List<TodoDetailsClass> list = FetchDataClass.getInstance().getAllRecords(userId);

	    if(myTodo.equals("MyTodo"))
	    {
	    	for (int i = 0; i < list.size(); i++) {
	    	    if (list.get(i).getAssinedBy().equals(userId) && list.get(i).getUserId().equals(userId) && list.get(i).getAssignedTo().equals(userId)) {
	    	        //System.out.println("\n----------------------------------75 - MyTodo:=");
	    	    	
	    	    	JSONObject responseObject = new JSONObject();
	    	        responseObject.put("TodoName", list.get(i).getTodoName());
	    	        responseObject.put("TodoDesc", list.get(i).getTodoDesc());
	    	        responseObject.put("StartDate", list.get(i).getStartDate());
	    	        responseObject.put("DueDate", list.get(i).getDueDate());
	    	        responseObject.put("Priority", list.get(i).getPriority());
	    	        responseObject.put("Status", list.get(i).getStatus());
	    	        responseObject.put("TodoId", list.get(i).getTodoId());
	    	        responseObject.put("AssignedBy", list.get(i).getAssinedBy());
	    	        responseObject.put("AssignedTo", list.get(i).getAssignedTo());
	    	        responseObject.put("UserId", list.get(i).getUserId());
	    	        if (!arr.contains(responseObject)) {
	    	            arr.add(responseObject);
	    	        }
	    	        check = true;
	    	    	}
	    	    
	    	}
			if(check)
			{     
			    jsonResponse.put("StatusCode",200);
			    jsonResponse.put("Message", arr);
			}
	   }
	    
	    if(myTodo.equals("Assignedbyme"))
	    {
	    	System.out.println(list.size());
	    	for(int i=0; i<list.size(); i++)
		    {
	    		
		    	if(!list.get(i).getAssignedTo().equals(userId) && list.get(i).getAssinedBy().equals(userId))
		    	{
		    		JSONObject responseObject1 = new JSONObject();
		    		responseObject1.put("TodoName", list.get(i).getTodoName());
		    		responseObject1.put("TodoDesc", list.get(i).getTodoDesc());
		    		responseObject1.put("StartDate", list.get(i).getStartDate());
		    		responseObject1.put("DueDate", list.get(i).getDueDate());
		    		responseObject1.put("Priority", list.get(i).getPriority());
		    		responseObject1.put("Status", list.get(i).getStatus());
		    		responseObject1.put("TodoId", list.get(i).getTodoId());
		    		responseObject1.put("AssignedTo", list.get(i).getAssignedTo());
		    		String name = FetchDataClass.getInstance().getName(list.get(i).getAssignedTo());
		    		responseObject1.put("AssigneeName", name);
		    		arr1.add(responseObject1);
		    		check1=true;
		    		
		    	}
		    }
			
			if(check1)
			{     
			    jsonResponse.put("StatusCode",200);
			    jsonResponse.put("Message", arr1);
			}
	    }
	    //System.out.println("--enter----------------------");
    if(myTodo.equals("AssigneeTodo"))
	    {
	    	List<TodoDetailsClass> list2 = FetchDataClass.getInstance().AssignedToMe();
	    	//System.out.println("enter");
	    	for(int i=0; i<list2.size(); i++)
		    {
	    		if(list2.get(i).getAssignedTo().equals(userId) && !list2.get(i).getAssinedBy().equals(userId))
		    	{
		    		
		    		//System.out.println("\n--------------------------------------i==u=94="+i);
		    		JSONObject responseObject1 = new JSONObject();
		    		responseObject1.put("TodoName", list2.get(i).getTodoName());
		    		responseObject1.put("TodoDesc", list2.get(i).getTodoDesc());
		    		responseObject1.put("StartDate", list2.get(i).getStartDate());
		    		responseObject1.put("DueDate", list2.get(i).getDueDate());
		    		responseObject1.put("Priority", list2.get(i).getPriority());
		    		responseObject1.put("Status", list2.get(i).getStatus());
		    		responseObject1.put("TodoId", list2.get(i).getTodoId());
		    		responseObject1.put("AssignedBy", list2.get(i).getAssinedBy());
		    		String name = FetchDataClass.getInstance().getName(list2.get(i).getAssinedBy());
		    		responseObject1.put("AssigneeName", name);
		    		
		    		arr2.add(responseObject1);
		    		check1=true;
		    		
		    	}
		    }
			
			if(check1)
			{     
			    jsonResponse.put("StatusCode",200);
			    jsonResponse.put("Message", arr2);
			}
	    }

		response.getWriter().append(jsonResponse.toString());
	}

}
