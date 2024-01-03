export default class LoginRequestFactory {
	constructRequest(email, password) {
		let loginBody = `{
                          "email": "`+ email + `",
                          "password": "`+ password + `"
                        }`
		return loginBody
	}
}