package AddTodoClass;

import dbs.JDBCConnectionClass;

public class AddNotification {
	    String notification;
	    String userId;
	    String assigneeId;
		String assigneeName;
		String position;
		String notifyDate;
		String status;
	    long todoId;
	    
	    public AddNotification(String notification, String userId, String assigneeId, String assigneeName,
				String position, String status, long id,String notifyDate) {
			super();
			this.notification = notification;
			this.userId = userId;
			this.assigneeId = assigneeId;
			this.assigneeName = assigneeName;
			this.position = position;
			this.status = status;
			this.todoId = id;
			this.notifyDate=notifyDate;
		}
	    
		public String getAssigneeId() {
			return assigneeId;
		}

		public void setAssigneeId(String assigneeId) {
			this.assigneeId = assigneeId;
		}

		public String getPosition() {
			return position;
		}

		public void setPosition(String position) {
			this.position = position;
		}

		public String getAssigneeName() {
			return assigneeName;
		}

		public void setAssigneeName(String assigneeName) {
			this.assigneeName = assigneeName;
		}

		public String getNotifyDate() {
			return notifyDate;
		}

		public void setNotifyDate(String notifyDate) {
			this.notifyDate = notifyDate;
		}

		public String getNotification() {
			return notification;
		}

		public void setNotification(String notification) {
			this.notification = notification;
		}
		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public long getTodoId() {
			return todoId;
		}
		public void setTodoId(long todoId) {
			this.todoId = todoId;
		}
		
		public boolean Sendnotification(AddNotification notification)
	    {
			boolean check =JDBCConnectionClass.getInstance().addNotification(notification);
	        return check;
	    }
		public boolean checkNotification(AddNotification notification)
	    {
	    	boolean check =JDBCConnectionClass.getInstance().checkNotification2(notification);
	        return check;
	    }

}
