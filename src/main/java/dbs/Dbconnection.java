package dbs;

import java.sql.Connection;
import java.sql.DriverManager;

import LoginLogout.JDBCConnection;

public class Dbconnection {
	public   Connection dbConnection;
	public static Dbconnection jdbc =null;
	public Dbconnection() {};
    public static Dbconnection getInstance()
	{
		if(jdbc == null)
		{
			jdbc = new Dbconnection();
		}
		return jdbc;
	}
//	 public void getDBConnection() {
//		if(dbConnection == null) {
//			try {
//				Class.forName("com.mysql.cj.jdbc.Driver");
//				dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/TodoList", "jayaharitha", "root");
//				
//			}catch(Exception ex) {
//				System.out.println(ex.getMessage());
//			}
//		}
//	}
}
