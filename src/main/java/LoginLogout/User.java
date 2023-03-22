package LoginLogout;

import org.json.simple.JSONObject;

import  dbs.JDBCConnectionClass;


public class User {
	String name;
	String email;
	String password;
	String userName;

//	public User(String name,String id,String password, String email,String userName)
//	{
//		this.name = name;
//		this.email=email;
//		this.userName=userName;
//		this.password=password;
//	
//	}
//	

	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}
	public void setPassword(String password) {
		this.password = password;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}



	public void setEmail(String email) {
		this.email = email;
	}

    public String tostring()
    {
    	return "Name: "+this.name+"userName: "+this.userName+", Email: "+this.email+", Password: "+this.password;
    }
    
 // login:
    
 	public static boolean login(String id, String password) {
 		
 		boolean checkData=false;
		try {
			checkData = JDBCConnectionClass.getInstance().login(id, password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		if(checkData)
 		{
 			return true;
 		}

         return false;
     }
     
 	//registor:
 	

 	public static boolean register(String name,String email,String password,String userName) {
 		 boolean checkData = JDBCConnectionClass.getInstance().checkTheUserDetails(email ,userName);
 		 boolean a=true;
 		 if(!checkData)
 		 {
            boolean check =JDBCConnectionClass.getInstance().signUp(name,userName,email,password);
            
            if(check)
            {
            	a=false;
            }

         }
 		if(!a)
 		{
 			return true;
 		}
 		else
 		{
 			return false;
 		}
 	}
}
