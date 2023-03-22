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

/**
 * Servlet implementation class optionServlet
 */
@WebServlet("/optionServlet")
public class OptionIdServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OptionIdServlet() {
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
		  
		   Cookie[] cookies = request.getCookies();
		   String userId="";
			  for(Cookie cook : cookies)
			  {
				  if(cook.getName().equals("userId"))
				  {
				  userId=cook.getValue();
				  }
			  }
		   List <String> list = FetchDataClass.getInstance().getIds(userId);
		   JSONArray responsearr = new JSONArray();
		   for(String a: list)
		   {
			   responsearr.add(a);
		   }
		   
		   response.getWriter().append(responsearr.toString());
		   
	}

}
