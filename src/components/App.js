import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import BackButton from "./BackButton";
import Quit from "./Quit";
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
    answersList: [],
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };

        case "dataFailed":
            return { ...state, status: "error" };

        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
            };

        case "newAnswer":
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
                // answersList: [...state.answerList, action.payload],
            };

        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };

        case "previousQuestion":
            return { ...state, index: state.index - 1 };

        case "finishQuestion":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.point > state.highscore
                        ? state.point
                        : state.highscore,
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
                5,
                Math.min(action.payload, state.questions.length)
            );
            console.log(count);
            return {
                ...state,
                questionCount: action.payload,
                displayedQuestions: state.questions.slice(0, count),
            };

        // case "updateDisplayedQuestion":
        //     return {
        //         ...state,
        //         questions: state.question.slice(0, state.questionCount),
        //     };

        //*
        case "uploadStart":
            return { ...state, loading: true };

        case "UPLOAD_SUCCESS":
            return { ...state, loading: false, data: action.payload };

        case "UPLOAD_ERROR":
            return { ...state, loading: false, error: action.error };

        default:
            throw new Error("Action unknown");
    }
}

//
export default function App() {
    const [
        {
            questions,
            questionCount,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            loading,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.points,
        0
    );

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((error) => {
                console.error("Failed to fetch questions:", error); // Log the error
                dispatch({ type: "dataFailed", payload: error });
            });
    }, []);

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        questionCount={questionCount}
                        dispatch={dispatch}
                    />
                )}

                {status === "active" && (
                    <>
                        <Progress
                            index={index + 1}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <BackButton dispatch={dispatch} />

                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <Quit dispatch={dispatch} />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={highscore}
                        dispatch={dispatch}
                        loading={loading}
                    />
                )}
            </Main>
        </div>
    );
}
