const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

exports.createAccomCate = TryCatch(async (req, res) => {
    console.log('req.body', req.body); //cateName

    const createCateName = await prisma.accomCate.create({
        data: { cateName: req.body.cateName }
    })
    console.log('createCateName', createCateName);
    res.status(200).json({ message: "SUCCESS, Create CateName already!" })
})

exports.getAllAccomCate = TryCatch(async (req, res) => {
    const allAccomCate = await prisma.accomCate.findMany()
    console.log('allAccomCate', allAccomCate);
    res.status(200).json({ message: "SUCCESS, Get all AccomCate already!", allAccomCate })
})

exports.updateCateName = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //accomcateID
    console.log('req.body', req.body); //newCateName

    const newCateName = await prisma.accomCate.update({
        where: { accomcateID: req.params.accomcateID },
        data: {
            cateName: req.body.cateName
        }
    })
    console.log('newCateName', newCateName);
    res.status(200).json({ message: "SUCCESS, Upadte newCateName AccomCate already!" })
})

exports.deleteAccomCate = TryCatch(async (req, res) => {
    console.log('req.params', req.params); //accomcateID

    await prisma.accomCate.delete({
        where: { accomcateID: req.params.accomcateID }
    })
    res.status(200).json({ message: "SUCCESS, Delete this AccomCate already!" })
})

