import { useState } from "react";

function FinishScreen({
    points,
    maxPossiblePoints,
    maxPossiblePointsDifficultMode,
    highscore,
    dispatch,
    loading,
    updateHighscore,
}) {
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const percentage =
        (points /
            (maxPossiblePointsDifficultMode
                ? maxPossiblePointsDifficultMode
                : maxPossiblePoints)) *
        100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 95) emoji = "🥈";
    if (percentage >= 50 && percentage < 80) emoji = "🥉";
    if (percentage > 0 && percentage < 50) emoji = "Not bad, not terible ☹";
    if (percentage === 0) emoji = "🤕";

    const handleUpdateHighscore = async () => {
        if (points > highscore) {
            dispatch({ type: "setHighscore", payload: points });
            await updateHighscore();
            setUpdateSuccess(true);
        }
    };

    const handleRestartQuiz = async () => {
        dispatch({ type: "restart" }); // Then restart the quiz
    };

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
                {maxPossiblePointsDifficultMode
                    ? maxPossiblePointsDifficultMode
                    : maxPossiblePoints}{" "}
                ({Math.ceil(percentage)}%)
            </p>

            <p className="highscore">(Highscore: {highscore} points)</p>

            <button className="btn" onClick={() => handleRestartQuiz()}>
                Restart Quiz
            </button>

            <div className="">
                <h4>Upload High Score</h4>

                <button
                    className="btn btn-upload"
                    onClick={() => handleUpdateHighscore()}
                >
                    {loading ? "Uploading..." : "Upload High Score"}
                </button>

                {updateSuccess && (
                    <h5>
                        You sucessfully updated the High Score. Your game will
                        restart now.
                    </h5>
                )}
            </div>
        </>
    );
}
export default FinishScreen;
