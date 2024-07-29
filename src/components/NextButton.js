function NextButton({ dispatch, answer, index, numQuestions, questionCount }) {
    if (answer === null) return null;

    const questionNumbers = questionCount ? questionCount : numQuestions;

    if (index < questionNumbers - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next Question
            </button>
        );

    if (index === questionNumbers - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finishQuestion" })}
            >
                Finish
            </button>
        );
}

export default NextButton;
