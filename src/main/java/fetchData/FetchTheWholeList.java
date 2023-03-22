package fetchData;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import TodoDetails.TodoDetailsClass;

/**
 * Servlet implementation class FetchTheWholeList
 */
//@WebServlet("/FetchTheWholeList")
public class FetchTheWholeList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchTheWholeList() {
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
		JSONObject jsonResponse = new JSONObject();
		JSONArray arr = new JSONArray();
		String userId="";
		boolean check = false;  
		Cookie[] cookies = request.getCookies();
		  for(Cookie cook : cookies)
		  {
			  if(cook.getName().equals("userId"))
			  {
			  userId=cook.getValue();
			  }
		  }
		List<TodoDetailsClass> list = FetchDataClass.getInstance().getAllRecords(userId);
		for (int i = 0; i < list.size(); i++) {
    	    	
    	    	JSONObject responseObject = new JSONObject();
    	        responseObject.put("TodoName", list.get(i).getTodoName());
    	        responseObject.put("TodoDesc", list.get(i).getTodoDesc());
    	        responseObject.put("StartDate", list.get(i).getStartDate());
    	        responseObject.put("DueDate", list.get(i).getDueDate());
    	        responseObject.put("Priority", list.get(i).getPriority());
    	        responseObject.put("Status", list.get(i).getStatus());
    	        responseObject.put("TodoId", list.get(i).getTodoId());
    	        responseObject.put("Assignedby", list.get(i).getAssinedBy());
    	        responseObject.put("AssigneeName",FetchDataClass.getInstance().getName(list.get(i).getAssinedBy()));
    	        responseObject.put("AssignedTo", list.get(i).getAssignedTo());
    	        responseObject.put("UserId", list.get(i).getUserId());
    	        if (!arr.contains(responseObject)) {
    	            arr.add(responseObject);
    	        }
    	        check = true;
    	    	}
    	    
		if(check)
		{     
		    jsonResponse.put("StatusCode",200);
		    jsonResponse.put("Message", arr);
		}
		
		response.getWriter().append(jsonResponse.toString());
	}

}
