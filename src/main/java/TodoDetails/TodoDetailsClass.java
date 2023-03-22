package TodoDetails;

public class TodoDetailsClass {
    
	String todoName;
	String todoDesc;
	String startDate;
	String dueDate;
	String priority;
	String status;
	String assinedBy;
	String assignedTo;
	String userId;
	int TodoId;
	public TodoDetailsClass(int TodoId,String todoName, String todoDesc, String startDate, String dueDate, String priority,String status,String assignedBy,String assignedTo,String userId) {
		super();
		this.TodoId=TodoId;
		this.todoName = todoName;
		this.todoDesc = todoDesc;
		this.startDate = startDate;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = status;
		this.assinedBy=assignedBy;
		this.assignedTo=assignedTo;
		this.userId=userId;
	}
	public int getTodoId() {
		return TodoId;
	}
	public void setTodoId(int todoId) {
		TodoId = todoId;
	}
	public String getAssignedTo() {
		//System.out.println("26 TodoDetails class ="+assignedTo);
		return assignedTo;
	}
	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAssinedBy() {
		return assinedBy;
	}
	public void setAssinedBy(String assinedBy) {
		this.assinedBy = assinedBy;
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

	public String toString()
	{
	   return "TodoName :"+this.todoName+", "+this.todoDesc+", "+this.startDate+", "+this.dueDate+", "+this.assinedBy+", "+this.assignedTo+", "+this.priority+", "+this.status+", "+this.userId;	
	}
}
