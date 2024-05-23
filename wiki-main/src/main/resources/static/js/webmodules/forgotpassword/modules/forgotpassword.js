/*
 * 
 * from the backend   buildResetEmail(email, "https://www.zinxswiki.com/resetpassword/request/"+token));
 * this is how the reset system works, you pass in the email it generates a token and sends you a url with the token as 
 * a path parameter, from this url your supposed to be able to, using this token, reset your password, there was another directory controller
 * from the old system that i didn't bring over that would control what happens after you enter this directory, should look at that as well
 * 
 * ---
 * 
 * backend needs more stuff before this system is ready
 * 
 * /