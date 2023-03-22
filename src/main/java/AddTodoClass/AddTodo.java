package AddTodoClass;

public class AddTodo {

	String todoName;
	String todoDesc;
	String startDate;
	String dueDate;
	String priority;
	String status;
	String assignedBy;
	String assignedTo;
	String UserID;
	public AddTodo(String todoName, String todoDesc, String startDate, String dueDate, String priority, String status,
			String assignedBy, String assignedTo,String UserID) {
		super();
		this.todoName = todoName;
		this.todoDesc = todoDesc;
		this.startDate = startDate;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = status;
		this.assignedBy = assignedBy;
		this.assignedTo = assignedTo;
		this.UserID=UserID;
	}
	public String getTodoName() {
		return todoName;
	}
	public void setTodoName(String todoName) {
		this.todoName = todoName;
	}
	public String getTodoDesc() {
		return todoDesc;
	}
	public void setTodoDesc(String todoDesc) {
		this.todoDesc = todoDesc;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAssignedBy() {
		return assignedBy;
	}
	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}
	public String getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getUserID() {
		return UserID;
	}
	public void setUserID(String userID) {
		UserID = userID;
	}
}
