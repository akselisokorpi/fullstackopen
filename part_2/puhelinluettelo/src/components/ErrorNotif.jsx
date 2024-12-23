import React from 'react'

const ErrorNotif = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    );
};

export default ErrorNotif;
;