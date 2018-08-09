var categoryModel = require('../models/pollCategory');

module.exports = {
    getAllCategory: getAllCategory,
    getUserPreferenceCategory:getUserPreferenceCategory,
    addCategory:addCategory
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

function addCategory(req,res){
    if(req.body.hasOwnProperty('user_id') && req.body.hasOwnProperty('cat_id')){
      var data={
            user_id:req.body.user_id,
            cat_id:req.body.cat_id
        }
        categoryModel.addCategory(data,function(err,result){
                if(!err){
                    res.status(200).json({
                        status: true,
                        message: "Category Added",
                        data: {}
                    });
                }else{
                    res.status(200).json({
                        status: false,
                        message: "Error",
                        data: {}
                    });
                }
        })
    }else{
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        });
    }
}