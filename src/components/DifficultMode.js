function DifficultMode({ dispatch }) {
    //
    function handleChangeValue(e) {
        const value = e.target.value;
        dispatch({ type: "difficultMode", payload: value });

        console.log(value);
    }
    return (
        <>
            <h3>Chose a diffucult mode:</h3>
            <select
                className="btn"
                defaultValue={"0"}
                onChange={handleChangeValue}
            >
                <option value="0">Default</option>
                <option value="10">Easy Mode</option>
                <option value="20">Medium Mode</option>
                <option value="30">Hard Mode</option>
            </select>
        </>
    );
}

export default DifficultMode;
