import React, { useState } from "react"


import { useAccount } from "./ProfileContext";
import 'survey-core/survey-core.css';
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

const Quiz1 = () => {
    const { profile, getProfile, update_profile } = useAccount();

  const surveyJson = {
    title: "Ticker Knowledge",
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
            html: "You are about to start a quiz on Ticker Symbols. <br>You will have 15 seconds for every question and 45 seconds to end the quiz. click <strong> Start </strong> to begin. <br/> <strong> get ALL questions correct to increase your progress to the next modules! </strong>",
          },
        ],
      },

      {
        elements: [
          {
            type: "radiogroup",
            name: "apple",
            title: "What is Apple's Ticker Symbol",
            choices: ["AAPL", "APL", "APP", "AAPLE"],
            correctAnswer: "AAPL",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "google",
            title: "What is Google's Ticker Symbol",
            choices: ["GOOG", "GOGL", "GGLE", "GOG"],
            correctAnswer: "GOOG",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "netflix",
            title: "What is Netflix's Ticker Symbol",
            choices: ["NFLX", "NETF", "NETX", "NEFX"],
            correctAnswer: "NFLX",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "snachat",
            title: "What is Snapchat's Ticker Symbol",
            choices: ["SNA", "CHAT", "SNAP", "SNCH"],
            correctAnswer: "SNAP",
            choicesOrder: "random",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "amazon",
            title: "What is Amazon's Ticker Symbol",
            choices: ["AMAZ", "AMZN", "ZON", "AMZO"],
            correctAnswer: "AMZN",
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
    return <Survey model = {survey}/>
    

}

export default Quiz1;