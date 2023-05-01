const prizePlanDao = require("../dao/prizePlanDao");
const express = require("express");
const prizeDao = require("../dao/prizeDao");
router = express.Router()

router.post("/prize/changePlanState", async (req, res, next) => {
    prizePlanDao.changeState(req.body.id, req.body.state)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err.message);
        });
});

router.get("/prize/getPlan", async (req, res, next) => {
    prizePlanDao.findAll()
        .then(result => {
            res.json({'prizePlan': result});
        })
        .catch(err => {
            res.json(err.message);
        });
});
router.post("/prize/createPlan", async (req, res, next) => {
    prizePlanDao.create(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err.message);
        });
});
router.get("/prize/deletePlan", async (req, res, next) => {
    prizePlanDao.delete(req.query.id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err.message);
        });
});
router.get("/prize/get", async (req, res, next) => {
    prizeDao.findAll(req.query.planId)
        .then(result => {
            res.json({'prize': result});
        })
        .catch(err => {
            res.json(err.message);
        });
});
router.post("/prize/create", async (req, res, next) => {
    prizeDao.create(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err.message);
        });
});
router.get("/prize/delete", async (req, res, next) => {
    prizeDao.delete(req.query.id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err.message);
        });
});


module.exports = router