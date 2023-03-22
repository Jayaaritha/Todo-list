package fetchData;

import java.util.List;

import Notification.NotificationClass;
import TodoDetails.TodoDetailsClass;
import dbs.JDBCConnectionClass;

public class FetchDataClass {
  
	//List<TodoDetailsClass> todoList = new ArrayList<>();
	public static FetchDataClass ftchd =null;
	public FetchDataClass() {};
    public static FetchDataClass getInstance()
	{
		if(ftchd== null)
		{
			ftchd = new FetchDataClass();
		}
		return ftchd;
	}
    
	public List<TodoDetailsClass> getAllRecords(String userId)
	{
		//System.out.println(userId+"====24 fetclass");
		List<TodoDetailsClass> list =JDBCConnectionClass.getInstance().TodoList(userId);
		//System.out.println(list);
		return list;
	}
	public List<TodoDetailsClass> AssignedToMe()
	{
		//System.out.println(userId+"====24 fetclass");
		List<TodoDetailsClass> list =JDBCConnectionClass.getInstance().AssignedToMeList();
		//System.out.println(list);
		return list;
	}
	public String getName(String userName)
	{
		//System.out.println(userId+"====24 fetclass");
		String name =JDBCConnectionClass.getInstance().getName1(userName);
		//System.out.println(name+" == fetch class 40");
		return name;
	}
	public List<String> getIds(String Id)
	{
		List<String> IdList =JDBCConnectionClass.getInstance().getIdList(Id);
		//System.out.println(IdList+" == fetch class 40");
		return IdList;
	}
	public List<TodoDetailsClass> getAssigneeRecords(String Id,String userId)
	{
		List<TodoDetailsClass> list =JDBCConnectionClass.getInstance().getAssigneeTodo(Id,userId);
		//System.out.println(IdList+" == fetch class 40");
		return list;
	}
	public List<TodoDetailsClass> getAssigneeToMeRecords(String Id,String userId)
	{
		List<TodoDetailsClass> list =JDBCConnectionClass.getInstance().getAssigneeToMe(Id,userId);
		//System.out.println(IdList+" == fetch class 40");
		return list;
	}
	public List<NotificationClass> getTheNotifications(String userId)
	{
		List<NotificationClass> list =JDBCConnectionClass.getInstance().getNotification(userId);
		//System.out.println(IdList+" == fetch class 40");
		return list;
	}
}
