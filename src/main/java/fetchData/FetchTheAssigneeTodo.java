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
 * Servlet implementation class FetchTheAssigneeTodo
 */
//@WebServlet("/FetchTheAssigneeTodo")
public class FetchTheAssigneeTodo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchTheAssigneeTodo() {
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
	    String Id = request.getParameter("Id"); 
		
		String name = request.getParameter("Name");
	     JSONArray arr1 = new JSONArray();
	     JSONObject responseObject = new JSONObject();
		String userId="";
		  Cookie[] cookies = request.getCookies();
		  for(Cookie cook : cookies)
		  {
			  if(cook.getName().equals("userId"))
			  {
			  userId=cook.getValue();
			  }
		  }
		  System.out.println(Id+",,"+userId);
	     List<TodoDetailsClass> list = FetchDataClass.getInstance().getAssigneeRecords(Id,userId);
	     for(int i=0; i<list.size(); i++)
		    {

	    	 System.out.println("enter---------------");
		    		JSONObject responseObject1 = new JSONObject();
		    		responseObject1.put("TodoName", list.get(i).getTodoName());
		    		responseObject1.put("TodoDesc", list.get(i).getTodoDesc());
		    		responseObject1.put("StartDate", list.get(i).getStartDate());
		    		responseObject1.put("DueDate", list.get(i).getDueDate());
		    		responseObject1.put("Priority", list.get(i).getPriority());
		    		responseObject1.put("Status", list.get(i).getStatus());
		    		responseObject1.put("TodoId", list.get(i).getTodoId());
		    		responseObject1.put("AssignedTo", list.get(i).getAssignedTo());
		    		responseObject1.put("AssigneeName", name);
		    		arr1.add(responseObject1);
		    		
		    		}
	     responseObject.put("StatusCode",200);
	     responseObject.put("Message", arr1);
	     
	     response.getWriter().append(responseObject.toString());
	}

}
