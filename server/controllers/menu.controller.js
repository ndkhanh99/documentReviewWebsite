const menuModel = require('../models/menu.model')
const Menu = require('../models/menu.model')
const createError = require('../utils/errors')

const MenuController = {
    addNewMenu: async (req, res) => {
        const { code, name, note } = req.body
        if (!code || !name) {
            return res.status(400).json(createError(false, 'Thieu thong tin bat buoc'))
        }
        try {
            //  Kiem tra ma tai lieu da ton tai hay chua
            const menu = await Menu.findOne({ code: code })
            if (menu) {
                return res.status(400).json(createError(false, 'Menu code da ton tai'))
            }
            // all good  :
            const newMenu = new Menu({
                code: code,
                name: name,
                note: note
            })
            await newMenu.save()
            res.status(200).json(createError(true, 'Tao menu thanh cong'))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    },
    getAllMenu: async (req, res) => {
        try {
            const listMenu = await Menu.find()
            return res.status(200).json(listMenu)
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    },
    editMenu  : async (req,res) => {
        const {id, name, note} = req.body
        const menuItem = menuModel.findById(id)
        if (!menuItem) return res.status(400).json(createError(false,'Khong co menu item'))
        try {
            await menuModel.findByIdAndUpdate(id,{
                name : name,
                note : note
            })
            const newMenu =  await menuModel.findById(id)
            res.status(200).json(createError({...createError(true,'Update thanh cong'),newMenu}))
        } catch (error) {
            console.log(error)
            res.status(500).json(createError(false, 'Loi he thong'))
        }
    }

}
module.exports =  MenuController