import React from 'react'

const Notification = ({ message, type }) => {


    if (message) {
    return (
        <p className={`notification ${type}`}>
            {message}
        </p>
    )
    }
}

export default Notification