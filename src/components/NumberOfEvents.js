import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [number, setNumber] = useState('32'); // before eventNumber

    const handleInputChanged = (event) => {
        const value = event.target.value;
        // Alerts
        let errorText;
        if (value <= 0) {
            errorText = "Only numbers higher than 0 allowed."
        } else {
            errorText = ""
        }
        setNumber(value);
        setCurrentNOE(value);
        //setErrorAlert(errorText);
    }

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events: </label>
            <input
                type="text"
                id="number-of-events-input"
                className="number-of-events-input"
                value={number}
                onChange={handleInputChanged}
            />
           
        </div>
    );
}

export default NumberOfEvents;
