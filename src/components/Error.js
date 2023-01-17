/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';

const Error = ({ errorMessage }) => (
    <div className="error">
        <span className="error-message">{`Error: ${errorMessage}`}</span>
    </div>
);

export default Error;