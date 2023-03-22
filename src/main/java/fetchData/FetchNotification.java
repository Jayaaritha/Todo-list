package fetchData;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import Notification.NotificationClass;

/**
 * Servlet implementation class FetchNotification
 */

public class FetchNotification extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchNotification() {
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
		JSONArray arr = new JSONArray(); 
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
		List<NotificationClass> list =FetchDataClass.getInstance().getTheNotifications(userId);
		for(NotificationClass notification : list)
		{
			JSONObject res = new JSONObject();
			res.put("Notification",notification.getNotification());
			res.put("notifyDate", notification.getNotifyDate());
			res.put("todoid", notification.getTodoId());
			res.put("notifyId", notification.getNotifyId());
			res.put("AssigneeName", notification.getAssigneeName());
			res.put("AssigneeId", notification.getAssigneeId());
			res.put("Position", notification.getPostion());
			arr.add(res);
		}
		
		jsonResponse.put("StatusCode",200);
	    jsonResponse.put("Message", arr);
	    
	    response.getWriter().append(jsonResponse.toString());
	}

}
