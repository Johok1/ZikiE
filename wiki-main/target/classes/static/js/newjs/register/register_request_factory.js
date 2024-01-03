export default class RegisterRequestFactory {
    constructRequest(username, email, password, confirmPassword,dob,pincode) {
        let registerBody = `{
                "username": "`+ username + `",
                "email": "`+ email + `",
                "password": "`+ password + `",
                "confirmPassword": "`+ confirmPassword + `",
                "dob": "`+ dob + `",
                "pincode": "`+ pincode + `"
                }`
        return registerBody
    }
}