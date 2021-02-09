const Question = require("../models/Question")
const Answer = require("../models/Answer")
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");


const addNewAnswerToQuestion = asyncHandler(async (req, res, next) => {
    const information = req.body;
    const {
        question_id
    } = req.params;
    const answer = await Answer.create({
        ...information,
        user: req.user.id,
        question: question_id
    })

    res.status(200).json({
        success: true,
        data: answer
    });
});

const getAllAnswerByQuestion = asyncHandler(async (req, res, next) => {
    const {
        question_id
    } = req.params;
    const answers = await Question.findById(question_id).populate("answer")
    console.log(answers)
    res.status(200).json({
        success: true,
        answers: answers
    });
});

const getSingleAnswer = asyncHandler(async (req, res, next) => {
    const {
        answer_id
    } = req.params;
    const answer = await Answer.findById(answer_id)
        .populate({
            path: "question",
            select: "title"
        })
        .populate({
            path: "user",
            select: "name profile_image"
        })
    res.status(200).json({
        success: true,
        answer
    });
});

module.exports = {
    addNewAnswerToQuestion,
    getAllAnswerByQuestion,
    getSingleAnswer
}