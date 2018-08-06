var categoryModel = require('../models/pollCategory');

module.exports = {
    getAllCategory: getAllCategory,
    getUserPreferenceCategory:getUserPreferenceCategory
};

function getAllCategory(req, res) {

    categoryModel.getAllCategory(function (err, data) {

        if (!err) {
            res.status(200).json({
                status: true,
                message: "Fetched all category",
                data: { data }
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Sorry, Not able to fetch",
                data: {}
            });

        }

    });
}

function getUserPreferenceCategory(req, res) {

    if (req.query.hasOwnProperty('userId')) {
        categoryModel.getCategoryByUser(req.query.userId, function (err, data) {

            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Fetched all category",
                    data: { data }
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "Sorry, Not able to fetch",
                    data: {}
                });

            }

        });
    }else{
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        });

    }
}