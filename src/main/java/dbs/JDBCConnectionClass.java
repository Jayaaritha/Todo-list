package dbs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.mysql.cj.protocol.Resultset;
import com.mysql.cj.protocol.x.SyncFlushDeflaterOutputStream;

import AddTodoClass.AddNotification;
import AddTodoClass.AddTodo;
import Notification.NotificationClass;
import TodoDetails.TodoDetailsClass;
import fetchData.FetchDataClass;

public class JDBCConnectionClass {
	public static JDBCConnectionClass jdbc =null;
	public JDBCConnectionClass() {};
    public static JDBCConnectionClass getInstance()
	{
		if(jdbc == null)
		{
			jdbc = new JDBCConnectionClass();
		}
		return jdbc;
	}
	public boolean login(String id,String password)
 	{
 		try {
         
			PreparedStatement stmt = Dbconnection.getInstance().dbConnection.prepareStatement("SELECT * from UserDetails WHERE UserId = ? AND Password =?");
            stmt.setString(1, id);
            stmt.setString(2, password);
            ResultSet result = stmt.executeQuery();
            if(result.next())
            {
             return true;
            }
           }catch(Exception ex) {
            System.out.println(ex.getMessage());
        }
 		
 		return false;
 	}
	public boolean signUp(String name,String userName, String email,String password)
	{
		try {
			PreparedStatement ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("INSERT INTO UserDetails(Name,UserId,Gmail,Password) value(?,?,?,?)");
			ptsm.setString(1, name);
			ptsm.setString(2, userName);
			ptsm.setString(3, email);
			ptsm.setString(4, password);
			int result = ptsm.executeUpdate();
			if(result>0)
			{
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
		
	}
	public boolean checkTheUserDetails(String email,String userName)
	{
		try {
			PreparedStatement stmt = Dbconnection.getInstance().dbConnection.prepareStatement("SELECT * from UserDetails WHERE UserId = ?");
			stmt.setString(1, userName);
			ResultSet result = stmt.executeQuery();
			if(result.next())
			{
				return true;
			}
		}catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
		
			return false;
	}
	public boolean AddTodoDb(AddTodo addTodo)
	{
		//addTodo.getTodoName(),,,,,,,,
		try {
            //Dbconnection.getInstance();
			PreparedStatement ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("INSERT INTO TodoLists(TodoName,TodoDesc,StartDate,DueDate,Priority,Status,AssignedBy,AssignedTo,UserId) values(?,?,?,?,?,?,?,?,?)");
            ptsm.setString(1, addTodo.getTodoName());
            ptsm.setString(2, addTodo.getTodoDesc());
            ptsm.setString(3, addTodo.getStartDate());
            ptsm.setString(4, addTodo.getDueDate());
            ptsm.setString(5, addTodo.getPriority());
            ptsm.setString(6, addTodo.getStatus());
            ptsm.setString(7, addTodo.getAssignedBy());
            ptsm.setString(8, addTodo.getAssignedTo());
            ptsm.setString(9, addTodo.getUserID());
            int result = ptsm.executeUpdate();
            
            if(result>0)
            {
            	if(!addTodo.getAssignedTo().equals(addTodo.getUserID()))
            	{
            	int todoid=getTodoId(addTodo);
            	String position="Assigned to me";
  			  String userName = FetchDataClass.getInstance().getName(addTodo.getUserID());
  			  String notification=userName +" Assigned Todo for you";
  			  SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		      Date date = new Date();
		      String startDate = sdf.format(date);
		      System.out.println(startDate);
              AddNotification notify = new AddNotification(notification,addTodo.getAssignedTo(),addTodo.getUserID(),userName,position,"unread",todoid,startDate);
  			  boolean check2 = notify.Sendnotification(notify);
  			  if(check2)
  			  {
            	return true;
  			  }
            	}
            	
            	return true;
            }
            
        }catch(Exception ex) {
            System.out.println(ex.getMessage());
        }
		
		return false;
	}
	
	public int getTodoId(AddTodo addTodo)
	{
	        int todoid=0;
	        try {
	            PreparedStatement ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("select * from TodoLists where TodoName=? AND TodoDesc= ? AND StartDate=? AND DueDate=? AND Priority=? AND Status=? AND AssignedBy=? AND AssignedTo=? AND UserId=?");
	            ptsm.setString(1, addTodo.getTodoName());
	            ptsm.setString(2, addTodo.getTodoDesc());
	            ptsm.setString(3, addTodo.getStartDate());
	            ptsm.setString(4, addTodo.getDueDate());
	            ptsm.setString(5, addTodo.getPriority());
	            ptsm.setString(6, addTodo.getStatus());
	            ptsm.setString(7, addTodo.getAssignedBy());
	            ptsm.setString(8, addTodo.getAssignedTo());
	            ptsm.setString(9, addTodo.getUserID());
	            ResultSet rs = ptsm.executeQuery();
	            while(rs.next()) {
	            		todoid=rs.getInt(10);
	            	}
	        }catch(Exception ex) {
	            System.out.println(ex.getMessage());
	        }
            //System.out.println("list : 126 jdbcConnection class "+todoList);
	        return todoid;
	    }
	public List<TodoDetailsClass> TodoList(String userId)
	{
	        List<TodoDetailsClass> todoList = new ArrayList<TodoDetailsClass>();
	        try {
	        	PreparedStatement ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("select * from TodoLists where UserId = ? OR AssignedTo=?");
	        	ptsm.setString(1,userId);
	        	ptsm.setString(2,userId);
	        	ResultSet rs = ptsm.executeQuery();
	        	//System.out.println(userId);
	            while(rs.next()) {
                   //System.out.println(userId);
                   //System.out.println(rs.getInt(10));
	            	TodoDetailsClass todo = new TodoDetailsClass(rs.getInt(10),rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9));
	            		todoList.add(todo);
	            	
	            	}
	        }catch(Exception ex) {
	            System.out.println(ex.getMessage());
	        }
            //System.out.println("list : 126 jdbcConnection class "+todoList);
	        return todoList;
	    }
	public List<TodoDetailsClass> AssignedToMeList()
	{
	        List<TodoDetailsClass> todoList = new ArrayList<TodoDetailsClass>();
	        try {
	            Statement stmt = Dbconnection.getInstance().dbConnection.createStatement();
	            ResultSet rs = stmt.executeQuery("select * from TodoLists");
	            //System.out.println(userId+"====118 jdbc")
	            while(rs.next()) {
	            	//int a=1;
	            	//System.out.print("\n="+a);
	            		//System.out.println("\n"+a++);
	            	TodoDetailsClass todo = new TodoDetailsClass(rs.getInt(10),rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9));
	            //	System.out.println(rs.getString(8));
	            		todoList.add(todo);
	            	}
	        }catch(Exception ex) {
	            System.out.println(ex.getMessage());
	        }
            //System.out.println("list : 126 jdbcConnection class "+todoList);
	        return todoList;
	    }
	
  public String	getName1(String userName)
  {
	   String name="";
      Statement stmt2;
	try {
		stmt2 = Dbconnection.getInstance().dbConnection.createStatement();
		ResultSet rs1 = stmt2.executeQuery("select * from UserDetails");
	      while(rs1.next())
	      {
	    	if(rs1.getString(2).equals(userName))
	    	{
	      	   name =rs1.getString(1);
	    	}
	      }
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
      return name;
  }
  		public List<String> getIdList(String id)
  		{
  			List<String> Ids = new ArrayList<>();
  			Statement stmt2;
  			try {
  				stmt2 = Dbconnection.getInstance().dbConnection.createStatement();
  				ResultSet rs1 = stmt2.executeQuery("select * from UserDetails");
  			      while(rs1.next())
  			      {
  	                 if(!rs1.getString(2).equals(id))
  	                   {
  			      	   Ids.add(rs1.getString(2));
  			      		}
  			      }
  			} catch (SQLException e) {
  				// TODO Auto-generated catch block
  				e.printStackTrace();
  			}
  		      return Ids; 
  		}
  		
  		public boolean UpdateTodo(String priority,String status,int id)
  		{
  			PreparedStatement ptsm;
			try {
				ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("Update TodoLists SET Priority=?, Status = ? WHERE TodoId=?");

				
				ptsm.setString(1, priority);
				ptsm.setString(2, status);
				ptsm.setInt(3, id);
				System.out.println(priority+","+status+","+id);
				int rs = ptsm.executeUpdate();
				
				if(rs>0)
				{
					return true;
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
  			return false;
  		}
  		
  		public List<TodoDetailsClass> getAssigneeTodo(String assigneeId,String userId)
  		{
  			List<TodoDetailsClass> list = new ArrayList<>();
  			Statement stmt2;
  			try {
  				stmt2 = Dbconnection.getInstance().dbConnection.createStatement();
  				ResultSet rs1 = stmt2.executeQuery("select * from TodoLists");
  			      while(rs1.next())
  			      {
  	                 if(rs1.getString(7).equals(userId) && rs1.getString(8).equals(assigneeId))
  	                   {
  	                	 System.out.println("ass ="+assigneeId+" , "+"uss = "+userId);
  	                	 
  	                	//int TodoId,String todoName, String todoDesc, String startDate, String dueDate, String priority,String status,String assignedBy,String assignedTo,String userId
  	                	 TodoDetailsClass totdo = new TodoDetailsClass(rs1.getInt(10),rs1.getString(1),rs1.getString(2),rs1.getString(3),rs1.getString(4),rs1.getString(5),rs1.getString(6),rs1.getString(7),rs1.getString(8),rs1.getString(9));
  			      	   list.add(totdo);
  			      		}
  			      }
  			} catch (SQLException e) {
  				// TODO Auto-generated catch block
  				e.printStackTrace();
  			}
  			return list;
  		}
  public List<TodoDetailsClass> getAssigneeToMe(String assigneeId,String userId)
  		{
  			List<TodoDetailsClass> list = new ArrayList<>();
  			Statement stmt2;
  			try {
  				stmt2 = Dbconnection.getInstance().dbConnection.createStatement();
  				ResultSet rs1 = stmt2.executeQuery("select * from TodoLists");
  			      while(rs1.next())
  			      {
  	                 if(rs1.getString(8).equals(userId) && rs1.getString(7).equals(assigneeId))
  	                   {
  	                	 System.out.println("ass ="+assigneeId+" , "+"uss = "+userId);
  	                	 
  	                	//int TodoId,String todoName, String todoDesc, String startDate, String dueDate, String priority,String status,String assignedBy,String assignedTo,String userId
  	                	 TodoDetailsClass totdo = new TodoDetailsClass(rs1.getInt(10),rs1.getString(1),rs1.getString(2),rs1.getString(3),rs1.getString(4),rs1.getString(5),rs1.getString(6),rs1.getString(7),rs1.getString(8),rs1.getString(9));
  			      	   list.add(totdo);
  			      		}
  			      }
  			} catch (SQLException e) {
  				// TODO Auto-generated catch block
  				e.printStackTrace();
  			}
  			return list;
  		}
  public boolean addNotification(AddNotification notification)
  {
	 
	  PreparedStatement ptsm;
	try {
		ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("INSERT INTO NotificationTable(Notification,userId,AssigneeName,Status,NotifyDate,TodoID,Position,AssigneeId) values(?,?,?,?,?,?,?,?)");
		  ptsm.setString(1, notification.getNotification());
	      ptsm.setString(2, notification.getUserId());
	      ptsm.setString(3, notification.getAssigneeName());
	      ptsm.setString(4, notification.getStatus());
	      ptsm.setString(5, notification.getNotifyDate());
	      ptsm.setInt(6, (int)notification.getTodoId());
	      ptsm.setString(7, notification.getPosition());
	      ptsm.setString(8, notification.getAssigneeId());
	      int result = ptsm.executeUpdate();
	      if(result>0)
	      {
	    	  return true;
	      }
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
      return false;
  }
  public boolean checkNotification2(AddNotification notification)
  {
	 
	  PreparedStatement ptsm;
	try {
		ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("SELECT * FROM NotificationTable where Notification=? AND userId=? AND AssigneeName=? AND Status=? AND TodoID=? AND Position=? AND AssigneeId=?");
		ptsm.setString(1, notification.getNotification());
		ptsm.setString(2, notification.getUserId());
		ptsm.setString(3, notification.getAssigneeName());
		ptsm.setString(4, notification.getStatus());
		ptsm.setInt(5, (int)notification.getTodoId());
		ptsm.setString(6, notification.getPosition());
		ptsm.setString(7, notification.getAssigneeId());
		ResultSet rs1 = ptsm.executeQuery();

	      while(rs1.next())
	      {
	    	  if(rs1.getString(4).equals("unread"))
	    	  {
	    	  return true;
	    	  }
	      }
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
      return false;
  }
  public List<NotificationClass> getNotification(String userId)
  {
	  List<NotificationClass> list = new ArrayList<>();
	  PreparedStatement ptsm;
	  try {
		  ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("select * from NotificationTable where userId = ? And Status='unread'");
		  ptsm.setString(1,userId);
		  ResultSet rs1 =ptsm.executeQuery();
		      while(rs1.next())
		      {
		    	                                                    //String notification,String position,String userId, String assigneeId, String assigneeName, String status,String notifyDate, int notifyId, int todoId
                	 NotificationClass totdo = new NotificationClass(rs1.getString(1),rs1.getString(8),rs1.getString(2),rs1.getString(9),rs1.getString(3),rs1.getString(4),rs1.getString(6),rs1.getInt(5),rs1.getInt(7));
		      	   list.add(totdo);
		      }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
     }
  public boolean UpdateNotifications(long id)
  {
	  PreparedStatement ptsm;
		try {
			ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("Update NotificationTable set Status='read' where NotificationID = ?");
			ptsm.setInt(1, (int)id);
			//System.out.println(priority+","+status+","+id);
			int rs = ptsm.executeUpdate();
			
			if(rs>0)
			{
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
  }
  
  public boolean UpdateWholeTodos(String name, String desc, long id, String pr, String st)
  {
	  //Connection conn = Dbconnection.getInstance().dbConnection;
	  PreparedStatement ptsm;
		try {
			System.out.println("hiiiiiiiiiiiiiiii41341314131413143   413");
			ptsm = Dbconnection.getInstance().dbConnection.prepareStatement("UPDATE TodoLists SET TodoName=?, TodoDesc=?, Priority=?, Status=? WHERE TodoId=?\n"+ "");
			ptsm.setString(1, name);
			ptsm.setString(2, desc);
			ptsm.setString(3, pr);
			ptsm.setString(4, st);
			ptsm.setInt(5, (int)id);
			System.out.println(name+","+desc+","+pr+","+st+","+id);
			int rs = ptsm.executeUpdate();

			if(rs>0)
			{
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
  }
  }


