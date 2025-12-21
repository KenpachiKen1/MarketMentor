import React, { useState } from "react";


import "survey-core/survey-core.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

import { useAccount } from "./ProfileContext";

const Quiz3 = () => {
    const { profile, getProfile, update_profile } = useAccount();

  const surveyJson = {
    title: "Trading Platforms",
    showTimer: true,
    timeLimit: 60,
    timeLimitPerPage: 15,
    progressBarLocation: "bottom",
    firstPageIsStartPage: true,

    pages: [
      {
        elements: [
          {
            type: "html",
            html: "You are about to start a quiz on Trading Platforms. <br>You will have 15 seconds for every question and 60 seconds to end the quiz. click <strong> Start </strong> to begin. <br/> <strong> get ALL questions correct to increase your progress to the next modules! </strong>",
          },
        ],
      },

      {
        elements: [
          {
            type: "radiogroup",
            name: "Concept 1",
            title: "What is a trading platform?",
            choices: [
              "A software that allows users to buy and sell financial assets",
              "A platform that connects users to brokers to then buy stocks",
              "A platform that gives advice on investments to make",
              "A company that owns the stock market",
            ],
            correctAnswer:
              "A software that allows users to buy and sell financial assets",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "Concept 2",
            title: "What does paper trading mean",
            choices: [
              "Trading only with penny stocks",
              "Practice making trades with fake money",
              "Trading use physical cash",
              "Trading only during open market hours",
            ],
            correctAnswer: "Practice making trades with fake money",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "Concept 3",
            title:
              "Can you own a trading account by yourself if you're under 18 (for most platforms)",
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
            name: "Concept 4",
            title: "What tools help analyze stock movements",
            choices: [
              "Charts and Indicators",
              "News headlines alone",
              "Account balance",
            ],
            correctAnswer: "Charts and Indicators",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "Concept 5",
            title: "Which of these is not a trading platform",
            choices: [
              "Robinhood",
              "Webull",
              "Fidelity",
              "Amazon Finance and Stocks",
            ],
            correctAnswer: "Amazon Finance and Stocks",
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

export default Quiz3;
