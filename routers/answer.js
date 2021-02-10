const express = require("express")
const {
    getAccessToRoute,
    getAnswerOwnerAccess
} = require("../middlewares/authorization/auth")
const {
    checkQuestionAndAnswerExist
} = require("../middlewares/database/databaseErrorHelpers")
const {
    addNewAnswerToQuestion,
    getAllAnswerByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer
} = require("../controllers/answer")

const router = express.Router({
    mergeParams: true
});

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswerByQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist, getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist, getAccessToRoute,getAnswerOwnerAccess], editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist, getAccessToRoute,getAnswerOwnerAccess], deleteAnswer);

module.exports = router;