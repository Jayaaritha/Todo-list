package Filter;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import LoginLogout.User;
import dbs.Dbconnection;

/**
 * Servlet Filter implementation class ValidationFilter
 */
//@WebFilter("/ValidationFilter")
@SuppressWarnings("serial")
public class ValidationFilter extends HttpFilter implements Filter {
       
    /**
     * @see HttpFilter#HttpFilter()
     */
    public ValidationFilter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	@SuppressWarnings("unchecked")
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpr = (HttpServletRequest) request; 
		boolean check =true;
		System.out.println("hey");
		String jsonInput = request.getParameter("signup");
		//String jsonWithoutQuotes = jsonInput.replace("{", "{").replace("}", "}");
		JSONParser parser = new JSONParser();
		JSONObject jsonResponse = new JSONObject();
		System.out.println("   "+jsonInput);
			try {
				JSONObject json = (JSONObject)parser.parse(jsonInput);
				String username = (String)json.get("name");
				String userId =  (String)json.get("userName");
				String password =  (String)json.get("passWord");
				String mail =  (String)json.get("email");
			    System.out.println("username : " + username + ", password : " + password + ", userId : " + userId + ", Your mail : " +mail);
			    check = User.register(username, mail, password, userId);
			    
			    if(check)
			    {
			    	
			    	 System.out.println(userId+"  userId"+"");
			    	 request.setAttribute("userId",userId);
			    	 chain.doFilter(request, response);
			    	 
			    }
			    if(!check)
		        {
						jsonResponse.put("StatusCode", 400);
						jsonResponse.put("message", "Username is already exist");
		        }

			} catch (ParseException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
         response.getWriter().append(jsonResponse.toString());
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
