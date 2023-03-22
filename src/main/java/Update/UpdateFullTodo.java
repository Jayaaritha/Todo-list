package Update;

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

/**
 * Servlet implementation class UpdateFullTodo
 */
//@WebServlet("/UpdateFullTodo")
public class UpdateFullTodo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateFullTodo() {
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
		System.out.println(44+"updatefull todo iiiiiiiiiiiii");
		String jsonInput = request.getParameter("TodoDetails");
		JSONParser parser = new JSONParser();
		JSONObject obj = new JSONObject();
		boolean update=false;
		try {
			JSONObject json = (JSONObject)parser.parse(jsonInput);
			String todoname =(String)json.get("todoname");
			String tododesc=(String)json.get("tododesc");
			long todoid=(long)json.get("todoid");
			String pr=(String)json.get("priority");
			String st=(String)json.get("status");
			System.out.println(44+"updatefull todo");
			update=UpdateClass.getInstance().updateWholeTodo(todoname,tododesc,todoid,pr,st);
			System.out.println(update);
		}
		catch(Exception ex)
		{
			System.out.println(ex.getMessage());
		}
		
		if(update)
		{
			
			obj.put("StatusCode", 200);
			obj.put("Message", "Successfuly edited!");
			
		}
		
		response.getWriter().append(obj.toString());
	}

}
