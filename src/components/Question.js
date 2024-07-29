import Options from "./Options";

function Question({
    question,
    displayedQuestions,
    questionCount,
    dispatch,
    answer,
}) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options
                question={question}
                displayedQuestions={displayedQuestions}
                questionCount={questionCount}
                dispatch={dispatch}
                answer={answer}
            />
        </div>
    );
}

export default Question;
