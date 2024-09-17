import Options from "./Options";

function Question({
    question,
    displayedQuestion,
    questionCount,
    dispatch,
    answer,
    userAnswers,
    index,
    selectedDifficult,
}) {
    const currentAnswer = userAnswers.length > 0 ? userAnswers[index] : answer;

    return (
        <div>
            <h4>
                {displayedQuestion || selectedDifficult
                    ? displayedQuestion?.question
                    : question.question}
            </h4>
            <Options
                question={question}
                displayedQuestion={displayedQuestion}
                questionCount={questionCount}
                dispatch={dispatch}
                answer={currentAnswer}
                selectedDifficult={selectedDifficult}
            />
        </div>
    );
}

export default Question;
