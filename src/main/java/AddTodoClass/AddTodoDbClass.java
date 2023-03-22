package AddTodoClass;

import dbs.JDBCConnectionClass;

public class AddTodoDbClass {
	
   public static boolean AddTodo(AddTodo addTodo)
   {
	   if(addTodo.getAssignedBy() == null)
	   {
		   addTodo.setAssignedBy(addTodo.getUserID());
	   }
	   if(addTodo.getAssignedTo() == null)
	   {
		   addTodo.setAssignedTo(addTodo.getUserID());
	   }
	   boolean add = JDBCConnectionClass.getInstance().AddTodoDb(addTodo);
	   return add;
   }
}
