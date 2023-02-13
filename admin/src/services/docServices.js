
import api from './index';
const docServices = {
    addDocType : async (token,input) => {
        const {code,name,note} = input
        return new Promise((resolve,reject)=> {
            api.call().post(`/file/show/doctype`,{
                code : code,
                name : name,
                note : note,
            },{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    
}

export default docServices