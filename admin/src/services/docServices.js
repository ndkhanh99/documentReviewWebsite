
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
    getAllDocType : async (req,res) => {
        return new Promise((resolve,reject) => {
            api.call().get('/file/show/doctype')
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    addDocument : async (token,input) => {
        const {code,name,type, note} = input
        return new Promise((resolve,reject)=> {
            api.call().post(`/file/show/doc`, {
                code : code,
                name : name,
                type : type,
                note : note
            }, {
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getAllDoc : async () => {
        return new Promise((resolve,reject) => {
            api.call().get('/file/show/doc')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
}

export default docServices