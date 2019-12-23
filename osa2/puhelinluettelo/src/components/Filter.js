import React from 'react'

const Filter = ({ filtertext, onChange }) => {
    return (
        <div>
            filter shown with <input
                value={filtertext}
                onChange={onChange} />
        </div>
    )
}

export default Filter