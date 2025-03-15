const TryCatch = require("../../utils/TryCatch");
const prisma = require('../../models')

exports.postReview = TryCatch(async (req, res) => {
    console.log('req.user', req.user);
    console.log('req.body', req.body);
    console.log('req.params', req.params);

    const postReview = await prisma.review.create({
        data: {
            accommodationID: parseInt(req.params.accommodationID),
            customerID: req.user.id,
            rating: req.body.rating,
            content: req.body.content
        }
    })
    console.log('postReview', postReview);

    res.status(200).json({ message: "SUCCESS, Create Review already" })
})