package Update;

import dbs.JDBCConnectionClass;

public class UpdateClass {
	public static UpdateClass updateClass =null;
	public UpdateClass() {};
    public static UpdateClass getInstance()
	{
		if(updateClass== null)
		{
			updateClass = new UpdateClass();
		}
		return updateClass;
	}
    
  public boolean updateTodo(String priority,String status,int todoId)
  {
	 // System.out.println("------------------------------------------------------------------------------------------------------------------"+priority+","+status+","+todoId+",");
	  boolean update = JDBCConnectionClass.getInstance().UpdateTodo(priority,status,todoId);
	  return update;
  }
  public boolean updateNotification(long id)
  {
	  
	  boolean update = JDBCConnectionClass.getInstance().UpdateNotifications(id);
	  return update;
  }
  public boolean updateWholeTodo(String todoname, String tododesc, long id,String pr,String st)
  {
	  boolean update = JDBCConnectionClass.getInstance().UpdateWholeTodos(todoname,tododesc,id,pr,st);
	  return update;
  }
}
