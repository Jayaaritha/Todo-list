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

import LoginLogout.User;
import dbs.Dbconnection;

/**
 * Servlet Filter implementation class AuthendicationFilter
 */
//@WebFilter("/AuthendicationFilter")
@SuppressWarnings("serial")
public class AuthenticationFilter extends HttpFilter implements Filter {
       
    /**
     * @see HttpFilter#HttpFilter()
     */
    public AuthenticationFilter() {
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
		System.out.println("hiiiiiiiiiii");
		@SuppressWarnings("unused")
		HttpServletRequest httpr = (HttpServletRequest) request; 
		boolean check = false;
		boolean checkId=false;
		String userId = request.getParameter("userId");
		System.out.println(userId);
        String password = request.getParameter("password");
        System.out.println(password);
        User user = new User();
        boolean loginSuccess= user.login(userId, password);
        
        JSONObject jsonResponse = new JSONObject();
        
        if(loginSuccess)
        {
        	request.setAttribute("userId",userId);
        	chain.doFilter(request, response);
        }
        else
        {
        	jsonResponse.put("StatusCode",400);
		    jsonResponse.put("Message","Invalid userId");
        }
       
//        try {
//			PreparedStatement ptsm = Dbconnection.dbConnection.prepareStatement("SELECT * FROM UserDetails WHERE UserId =? AND Password=?");
//			ptsm.setString(1, userId);
//			ptsm.setString(2, password);
//			ResultSet rs = ptsm.executeQuery();
//			if(rs.next())
//			{
//				check=true;
//				System.out.println("true");
//				request.setAttribute("userId", userId);
//			}
//
//		} catch (SQLException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
//
//        if(check)
//        {
//		chain.doFilter(request, response);
//        }
//        else
//        {
//        	PreparedStatement ptsm;
//			try {
//				ptsm = Dbconnection.dbConnection.prepareStatement("SELECT * FROM UserDetails WHERE UserId =?");
//				ptsm.setString(1, userId);
//				ResultSet rs = ptsm.executeQuery();
//				if(rs.next())
//				{
//					checkId=true;
//				}
//			} catch (SQLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			if(checkId)
//			{
//			     jsonResponse.put("StatusCode",400);
//			     jsonResponse.put("Message","Invalid Password");
//			}
//			else
//			{
//				jsonResponse.put("StatusCode",400);
//			    jsonResponse.put("Message","Invalid userId");	
//			}
//        }
//        
        response.getWriter().append(jsonResponse.toString());
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
