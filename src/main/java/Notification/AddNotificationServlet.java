package Notification;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import AddTodoClass.AddNotification;
import fetchData.FetchDataClass;

/**
 * Servlet implementation class AddNotificationServlet
 */
//@WebServlet("/AddNotificationServlet")
public class AddNotificationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddNotificationServlet() {
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
		String jsonInput = request.getParameter("NotificationDetails");
		JSONParser parser = new JSONParser();
		JSONObject json2 =new JSONObject();
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		      Date date = new Date();
		      String currentDate = sdf.format(date);
			JSONObject json = (JSONObject)parser.parse(jsonInput);
			String userName = FetchDataClass.getInstance().getName((String)json.get("assigneeId"));
			String notification=(String)json.get("Notification");
			String assigneeId =(String)json.get("assigneeId");
			String userID=(String)json.get("userId");
			String position =(String)json.get("Position");
			long id =(long)json.get("Todoid");
		     System.out.println(id);
		     
			AddNotification notify = new AddNotification(notification,assigneeId,userID,userName,position,"unread",id,currentDate);
			boolean check0 = notify.checkNotification(notify);
			if(!check0)
			{
			boolean check2 = notify.Sendnotification(notify);
			}
			//System.out.println(check2);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		json2.put("StatusCode",200);
		json2.put("Message", "su");

response.getWriter().append(json2.toString());
	}

}
