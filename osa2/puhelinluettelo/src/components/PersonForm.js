import React from 'react'

const PersonForm = ({ onSubmit, valueName, valueNumber, onNameChange, onNumberChange }) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input
                        value={valueName}
                        onChange={onNameChange} /><br />
                    number: <input
                        value={valueNumber}
                        onChange={onNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm