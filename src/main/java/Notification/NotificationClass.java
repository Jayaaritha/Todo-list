package Notification;
import dbs.JDBCConnectionClass;

public class NotificationClass {
    String notification;
    String userId;
    String AssigneeId;
	String AssigneeName;
	String postion;
	String status;
    String notifyDate;
    int notifyId;
    int todoId;

	public NotificationClass(String notification,String position,String userId, String assigneeId, String assigneeName, String status,
			String notifyDate, int notifyId, int todoId) {
		super();
		this.notification = notification;
		this.postion=position;
		this.userId = userId;
		this.AssigneeId = assigneeId;
		this.AssigneeName = assigneeName;
		this.status = status;
		this.notifyDate = notifyDate;
		this.notifyId = notifyId;
		this.todoId = todoId;
	}
	public String getNotification() {
		return notification;
	}
    public String getNotifyDate() {
		return notifyDate;
	}
	public void setNotifyDate(String notifyDate) {
		this.notifyDate = notifyDate;
	}
	public void setNotification(String notification) {
		this.notification = notification;
	}
	public String getUserId() {
		return userId;
	}
	
	public String getPostion() {
		return postion;
	}
	public void setPostion(String postion) {
		this.postion = postion;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAssigneeId() {
		return AssigneeId;
	}
	public void setAssigneeId(String assigneeId) {
		AssigneeId = assigneeId;
	}
	public String getAssigneeName() {
		return AssigneeName;
	}
	public void setAssigneeName(String assigneeName) {
		AssigneeName = assigneeName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getTodoId() {
		return todoId;
	}
	public void setTodoId(int todoId) {
		this.todoId = todoId;
	}
	public int getNotifyId() {
		return notifyId;
	}
	public void setNotifyId(int notifyId) {
		this.notifyId = notifyId;
	}
}
