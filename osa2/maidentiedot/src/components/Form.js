import React from 'react'

const Form = ({ filtertext, onChange }) => {
    return (
        <div>
            <form>
                <div>
                    find countries <input
                        value={filtertext}
                        onChange={onChange}
                    />
                </div>
            </form>
        </div>
    )
}

export default Form;
