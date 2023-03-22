package Update;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import AddTodoClass.AddNotification;
import Notification.NotificationClass;
import fetchData.FetchDataClass;

/**
 * Servlet implementation class updateServlet
 */
//@WebServlet("/updateServlet")
public class updateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public updateServlet() {
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
		String priority1 = request.getParameter("priority");
		String status1 = request.getParameter("status");
		String whos = request.getParameter("who");
		String AssigneeId = request.getParameter("AssigneeId");
		int todoid = Integer.parseInt(request.getParameter("todoId"));
		JSONObject obj = new JSONObject();
		boolean check = false;
		System.out.println(priority1+","+status1+","+todoid);
		String notification ="";
		String position="";
		String userId="";
		 SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	      Date date = new Date();
	      String currentDate = sdf.format(date);
		Cookie[] cookies = request.getCookies();
		  for(Cookie cook : cookies)
		  {
			  if(cook.getName().equals("userId"))
			  {
			  userId=cook.getValue();
			  }
		  }
		String AssigneeName = FetchDataClass.getInstance().getName(AssigneeId); 
		String userName = FetchDataClass.getInstance().getName(userId);
		//String notification, String userId, String assigneeId, String assigneeName,
		//String position, String status, String notifyDate, int todoId
		if(whos.equals("Assignedbyme"))
		{
			position="Assigned by me";
			notification=userName +" changed the priority "+priority1;	
		}
		else if(whos.equals("AssigneeTodo"))
		{
			position="Assigned to me";
			notification=userName +" changed the status "+status1;	
		}
		check = UpdateClass.getInstance().updateTodo(priority1, status1, todoid);
		if(check)
		{   
			if(!whos.equals("me"))
			{
				                                //String notification,String assigneeName,String position, String status, int todoId,String NotifyDate
				AddNotification notify = new AddNotification(notification,AssigneeId,userId,userName,position,"unread",todoid,currentDate);
				boolean check2 = notify.Sendnotification(notify);
				System.out.println(check2);
			}
			obj.put("StatusCode", 200);
			obj.put("Message", "Successfuly Updated!");
		}
		else
		{
			obj.put("StatusCode", 400);
			obj.put("Message", "Somthing Wrong!");
		}
		
		response.getWriter().append(obj.toString());
	}

}
