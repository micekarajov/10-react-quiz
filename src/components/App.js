import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

import Quit from "./Quit";
import DifficultMode from "./DifficultMode";
import Buttons from "./Buttons";
//
const SECONDS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    displayedQuestions: [],
    questionCount: null,

    //* 'loading', 'error', 'ready', 'active', 'finished';
    status: "loading",
    loading: false,
    index: 0,
    answer: null,
    userAnswers: {},
    points: 0,
    highscore: 0,
    secondsRemaining: null,

    selectedDifficult: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload.questions,
                highscore: state.highscore,
                status: "ready",
            };

        case "dataFailed":
            return { ...state, status: "error" };

        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining:
                    (state.displayedQuestions.length > 0
                        ? state.displayedQuestions.length
                        : state.questions.length) * SECONDS_PER_QUESTION,
                // secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
            };

        case "newAnswer":
            const question =
                state.displayedQuestions.length > 0
                    ? state.displayedQuestions.at(state.index)
                    : state.questions.at(state.index); // Use filtered questions if available

            // const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,

                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,

                userAnswers: {
                    ...state.userAnswers,
                    [state.index]: action.payload,
                },
            };

        case "nextQuestion":
            const nextIndex = state.index + 1;

            const nextAnswer = state.userAnswers[nextIndex] || null;
            return {
                ...state,
                index: nextIndex,
                answer: nextAnswer,
            };

        case "previousQuestion":
            return {
                ...state,
                index: state.index - 1,
                answer: state.userAnswers[state.index - 1],
            };

        case "setHighscore":
            return {
                ...initialState,
                questions: state.questions,
                highscore: action.payload, // Update the highscore in the state
                status: "ready",
            };

        case "finishQuestion":
            return {
                ...state,
                status: "finished",
            };

        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };

        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
            };

        //*
        case "setQuestionsCount":
            const count = Math.max(
                1,
                Math.min(action.payload, state.questions.length)
            );

            return {
                ...state,
                questionCount: action.payload,
                displayedQuestions: state.questions.slice(0, count),
            };

        case "difficultMode": {
            const selectedDifficult = action.payload;

            let filterDifficultMode = [];

            switch (selectedDifficult) {
                case "10": // Easy Mode
                    filterDifficultMode = state.questions.filter(
                        (q) => q.points === 10
                    );
                    console.log(
                        "Filter DIfficult MODE EASY:",
                        filterDifficultMode
                    );
                    break;

                case "20": // Medium Mode
                    filterDifficultMode = state.questions.filter(
                        (q) => q.points === 20
                    );
                    console.log(
                        "Filtered Questions (Medium Mode):",
                        filterDifficultMode
                    );

                    break;
                case "30": // Hard Modex
                    filterDifficultMode = state.questions.filter(
                        (q) => q.points === 30
                    );
                    break;

                default:
                    filterDifficultMode = state.questions;
                    break;
            }
            const displayedQuestions = filterDifficultMode;
            // console.log("Displayed Questiions:", displayedQuestions);

            return {
                ...state,
                selectedDifficult: action.payload,
                displayedQuestions: filterDifficultMode,
            };
        }

        default:
            throw new Error("Action unknown");
    }
}

//
export default function App() {
    const [
        {
            questions,
            displayedQuestions,
            questionCount,
            status,
            index,
            answer,
            userAnswers,
            points,
            highscore,
            secondsRemaining,
            loading,
            selectedDifficult,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const newHighscore = points > highscore ? points : highscore;

    const numQuestions = questions.length;
    const numDisplayedQuestions = displayedQuestions.length;

    //* Max Possible Points from Questions and "Choose Questions"
    const maxPossiblePoints = questions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.points,
        0
    );

    //* Max Possible Points from Difficult Mode
    const maxPossiblePointsDifficultMode = displayedQuestions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.points,
        0
    );

    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const res = await fetch("http://localhost:8000/data");
                    const data = await res.json();
                    dispatch({
                        type: "dataReceived",
                        payload: data,
                    });
                } catch (error) {
                    console.error("Failed to fetch questions:", error);
                    dispatch({ type: "dataFailed", payload: error });
                }
            };

            fetchData();
        },
        [],
        highscore
    );

    const updateHighscore = async () => {
        try {
            const fullData = {
                questions: questions,
                highscore: newHighscore,
            };

            const res = await fetch("http://localhost:8000/data", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fullData),
            });

            if (!res.ok) {
                throw new Error("Failed to update highscore");
            }

            const data = await res.json();
            console.log("Highscore updated:", data.highscore);
        } catch (error) {
            console.error("Error updating highscore:", error);
        }
    };

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <>
                        <StartScreen
                            numQuestions={numQuestions}
                            questionCount={questionCount}
                            dispatch={dispatch}
                        />
                        {!questionCount && (
                            <DifficultMode dispatch={dispatch} />
                        )}
                    </>
                )}

                {status === "active" && (
                    <>
                        <Progress
                            index={index + 1}
                            numQuestions={numQuestions}
                            numDisplayedQuestions={numDisplayedQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            maxPossiblePointsDifficultMode={
                                maxPossiblePointsDifficultMode
                            }
                            questionCount={questionCount}
                        />
                        <Question
                            question={questions[index]}
                            displayedQuestion={displayedQuestions[index]}
                            questionCount={questionCount}
                            dispatch={dispatch}
                            answer={answer}
                            userAnswers={userAnswers}
                            index={index}
                            selectedDifficult={selectedDifficult}
                        />
                        <Footer>
                            {index > 0 && (
                                <Buttons dispatch={dispatch} direction="back" />
                            )}

                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <Quit dispatch={dispatch} />
                            <Buttons
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                                numDisplayedQuestions={numDisplayedQuestions}
                                questionCount={questionCount}
                                direction="next"
                                userAnswers={userAnswers}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        maxPossiblePointsDifficultMode={
                            maxPossiblePointsDifficultMode
                        }
                        highscore={highscore}
                        dispatch={dispatch}
                        loading={loading}
                        updateHighscore={updateHighscore}
                    />
                )}
            </Main>
        </div>
    );
}
