package LoginLogout;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Request;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;

import dbs.Dbconnection;

/**
 * Servlet implementation class JDBCConnection
 */
//@WebServlet("/JDBCConnection")
public class JDBCConnection extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public JDBCConnection() {
        super();
       // init();
        // TODO Auto-generated constructor stub
    }

    @SuppressWarnings("static-access")
	public void init()
    {
//    	Connection dbConnection;
    	System.out.println("hello2");
    	String dbName=getServletConfig().getInitParameter("dbName");
    	String dbUser=getServletConfig().getInitParameter("dbUserName");
    	String URL = "jdbc:mysql://localhost:3306/"+dbName;
    	String password = getServletConfig().getInitParameter("dbPassword");
    	System.out.println(URL+","+dbUser+","+password);
    	try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Dbconnection.getInstance().dbConnection = DriverManager.getConnection(URL,dbUser,password);
			
		}catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
    }

	
	public void destroy() {
	    try {
	        Dbconnection.getInstance().dbConnection.close(); // Close the database connection
	        DriverManager.deregisterDriver(new com.mysql.cj.jdbc.Driver()); // Deregister the JDBC driver
	        AbandonedConnectionCleanupThread.checkedShutdown();
	    } catch (SQLException ex) {
	        System.out.println("Error while closing database connection: " + ex.getMessage());
	    }
	}
	
//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
