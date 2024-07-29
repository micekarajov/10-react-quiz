function DifficultMode() {
    return (
        <>
            <h3>Chose a diffucult mode:</h3>
            <options
                value={difficultMode}
                name="selectedFruit"
                defaultValue="easy"
            >
                <option value={easy}>Easy Mode</option>
                <option value={medium}>Medium Mode</option>
                <option value={hard}>Easy Mode</option>
            </options>
        </>
    );
}

export default DifficultMode;
