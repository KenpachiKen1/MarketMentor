import React, { useState } from "react";


import "survey-core/survey-core.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useAccount } from "./ProfileContext";
const Quiz2 = () => {
   const { profile, getProfile, update_profile } = useAccount();

  const surveyJson = {
    title: "Market Termnology and Concepts",
    showTimer: true,
    timeLimit: 45,
    timeLimitPerPage: 15,
    progressBarLocation: "bottom",
    firstPageIsStartPage: true,

    pages: [
      {
        elements: [
          {
            type: "html",
            html: "You are about to start a quiz on Stock Terminology and Concepts. <br>You will have 15 seconds for every question and 45 seconds to end the quiz. click <strong> Start </strong> to begin.<br/> <strong> get ALL questions correct to increase your progress to the next modules! </strong>",
          },
        ],
      },

      {
        elements: [
          {
            type: "radiogroup",
            name: "bullish",
            title: "What does bullish mean",
            choices: [
              "Expecting the stock to fall",
              "Expecting the stock to rise",
              "Bulls are hungry",
              "Expecting a stock to remain stagnant",
            ],
            correctAnswer: "Expecting the stock to rise",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "bearish",
            title: "What does bearish mean",
            choices: [
              "Expecting the stock to fall",
              "Expecting the stock to rise",
              "Someone acting like a bear",
              "Expecting a stock to remain stagnant",
            ],
            correctAnswer: "Expecting the stock to fall",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "Concept 1",
            title:
              "Can you predict how the stock market can perform in a week?",
            choices: ["Yes", "No"],
            correctAnswer: "No",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "NASDAQ",
            title: "What is NASDAQ",
            choices: [
              "An American Stock Exchange which lists many famous tech companies",
              "A trading platform",
              "A new term for Nascar",
            ],
            correctAnswer:
              "An American Stock Exchange which lists many famous tech companies",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "Trading",
            title: "What is a broker",
            choices: [
              "An intermediary who places trades for you",
              "Someone who deals on the black market",
              "An intermediary who does places trades for you AND manages your stock portfolio",
              "An intermediary who manages all of yor finances, but focuses on your stocks",
            ],
            correctAnswer: "An intermediary who places trades for you",
          },
        ],
      },
    ],
    completedHtml:
      "<h4>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers.</h4>",
    completedHtmlOnCondition: [
      {
        expression: "{correctAnswers} == 0",
        html: "<h4>Unfortunately, none of your answers are correct. Please try again.</h4>",
      },
      {
        expression: "{correctAnswers} == {questionCount}",
        html: "<h4>Congratulations! You answered all the questions correctly!</h4>",
      },
    ],
  };
 const [survey] = useState(() => new Model(surveyJson));

 survey.onComplete.add((sender) => {
   const correct = sender.getCorrectAnswerCount();
   const total = sender.getQuizQuestionCount();

   console.log("Correct:", correct, "Total:", total);

   if (correct === total) {
       update_profile();
   }
 });

  return <Survey model={survey} />;
};

export default Quiz2;
