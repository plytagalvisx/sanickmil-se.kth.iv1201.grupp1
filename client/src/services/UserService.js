import axios from 'axios';


const login = 'api/users/login';
const logout = 'api/users/logout';

class UserService{

    static login(username, password){
        return axios.post(login, {
            username,
            password
        }).then(response => {
            return response.data
        })
    }
    static checkToken(){
        return axios.get(login,{

        }).then(response => {
            return response.data
        })
    }

    static logout(){
        return axios.get(logout,{

        }).then(response => {
            return response.data
        })
    }
}

export default UserService;