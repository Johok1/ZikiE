export default class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
        this.fetch_url_profile = "https://www.zinxswiki.com/api/v1/profile"
        this.fetch_url_page = "https://www.zinxswiki.com/api/v1/page"
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_tag = "https://www.zinxswiki.com/api/v1/tag"
        this.fetch_url_validation = this.domain + "/api/v1/validation"
        this.fetch_url_resetpassword = "/resetpassword"
    }

    postResetPassword(emailToken, newPassword, confirmPassword) {
        let body = `{
                          "newPassword": "`+ newPassword + `",
                          "confirmPassword": "`+ confirmPassword + `"
                        }`
        let result = JSON.parse(body)
        return fetch(this.fetch_url_resetpassword + "/resetPassword/" + emailToken, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }).catch(error => {
            console.error(error);
        });
    }

    getProfilePicture(token) {
        return fetch(this.fetch_url_profile + "/getProfileImage/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setProfilePicture(token, input) {
        let formData = new FormData()
        formData.append('file', input)
        return fetch(this.fetch_url_profile + "/setProfileImage/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        }).catch(error => {
            console.error(error)
        });
    }

    getBannerImage(token) {
        return fetch(this.fetch_url_profile + "/getBannerImage/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setBannerImage(token, input) {
        let formData = new FormData()
        formData.append('file', input)
        return fetch(this.fetch_url_profile + "/setBannerImage/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        }).catch(error => {
            console.error(error)
        });
    }

    getProfileEmail(token) {
        return fetch(this.fetch_url_profile + "/getEmail/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    setProfileEmail(token, email) {
        return fetch(this.fetch_url_profile + "/setEmail/" + token + "/" + email, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setProfilePassword(token, password) {
        return fetch(this.fetch_url_profile + "/setPassword/" + token + "/" + password, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    getProfileBio(token) {
        return fetch(this.fetch_url_profile + "/getBio/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    setProfileBio(token, bio) {
        return fetch(this.fetch_url_profile + "/setBio/" + token + "/" + bio, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });

    }

    getProfileUsername(token) {
        return fetch(this.fetch_url_profile + "/getUsername/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    setProfileUsername(token, username) {
        return fetch(this.fetch_url_profile + "/setUsername/" + token + "/" + username, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setProfileNickname(token, nickname) {
        return fetch(this.fetch_url_profile + "/setNickname/" + token + "/" + nickname, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });

    }

    getProfileNickname(token) {
        return fetch(this.fetch_url_profile + "/getNickname/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }
}