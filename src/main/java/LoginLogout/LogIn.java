package LoginLogout;

//import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

/**
 * Servlet implementation class LogIn
 */
//@WebServlet("/LogIn")
public class LogIn extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LogIn() {
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
        
        System.out.println("hi-filter");
        String userId = (String) request.getAttribute("userId");
		System.out.println("userId = 56"+userId);
        JSONObject jsonResponse = new JSONObject();
        Cookie cookie = new Cookie("userId",userId);
				response.addCookie(cookie);
       // System.out.println("");
        	jsonResponse.put("StatusCode", 200);
            jsonResponse.put("Message","login successfully!");
        
//        System.out.println("checkId : "+checkId);
            System.out.println(jsonResponse.toString());
        response.getWriter().append(jsonResponse.toString());
		//doGet(request, response);
	}

}
