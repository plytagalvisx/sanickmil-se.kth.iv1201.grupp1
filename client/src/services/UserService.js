import axios from 'axios';


const login = 'api/users/login';
const logout = 'api/users/logout';
const register = 'api/users/register';
const apply = 'api/users/apply';

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

    static register(username, password, email, firstname, lastname, birth){
        return axios.post(register, {
            username,
            password,
            email,
            firstname,
            lastname,
            birth
        });
    }

    static apply(firstname, lastname, email){
        return axios.post(apply, {
            firstname,
            lastname,
            email,
            
        });
    }

        // //Get Users
        // static getUsers(){
        //     return new Promise(async (resolve, reject) => {
        //         try{
        //             const res = await axios.get(url);
        //             const data = res.data;
        //             resolve(
        //                 data.map(user => ({
        //                     ...user
        //                 }))
        //             );
        //         }catch(err){
        //             reject(err);
        //         }
        //     });
        // }
}

export default UserService;