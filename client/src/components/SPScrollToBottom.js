import React, { useEffect, useRef } from 'react';

function ScrollToBottom(props) {

    /* useRef */
    const endRef = useRef();

    /* useEffect */
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [endRef, props.children.length]);

    return (
        <div className={props.className}>
            {props.children}
            <div ref={endRef}></div>
        </div>
    );
}

export default ScrollToBottom;