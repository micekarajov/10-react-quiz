function FinishScreen({
    points,
    maxPossiblePoints,
    highscore,
    dispatch,
    loading,
}) {
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 95) emoji = "🥈";
    if (percentage >= 50 && percentage < 80) emoji = "🥉";
    if (percentage > 0 && percentage < 50) emoji = "Not bad, not terible ☹";
    if (percentage === 0) emoji = "🤕";

    const handleUpload = async () => {
        dispatch({ type: "uploadStart" });

        try {
            const response = await fetch("http://localhost:8000/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ highScore: highscore }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result);
            dispatch({ type: "UPLOAD_SUCCESS", payload: result });
        } catch (error) {
            dispatch({ type: "UPLOAD_ERROR", error: error.message });
        }
    };

    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>

            <p className="highscore">(Highscore: {highscore} points)</p>

            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart Quiz
            </button>

            <h3>Upload High Score</h3>

            <button className="btn" onClick={handleUpload} disable={loading}>
                {loading ? "Uploading..." : "Upload High Score"}
            </button>
        </>
    );
}

export default FinishScreen;
