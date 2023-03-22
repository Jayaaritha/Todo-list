package LoginLogout;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
/**
 * Servlet implementation class LogOut
 */
//@WebServlet("/LogOut")
public class SignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignUp() {
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
		
		String userId = (String) request.getAttribute("userId");
		System.out.println("userId ="+userId);
		Cookie cookie =new Cookie("userId",userId);	
		response.addCookie(cookie);
		
		jsonResponse.put("StatusCode", 200);
        jsonResponse.put("Message","login successfully!");	 
	    System.out.print(jsonResponse.toString());
	    response.getWriter().append(jsonResponse.toString());
	}

}
