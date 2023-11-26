import React from 'react'

export default function Alert(props) {
    const alertStyle= {
        position: "absolute",
        right:"0px"
    }

    function capitalize(type) {
        let lower = type.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        props.alert && <div style={alertStyle} className={`alert alert-${props.alert.type} alert-dismissible fade show m-0 border`} role="alert">
            <strong>{capitalize(props.alert.type)} : </strong>{props.alert.msg}
        </div>
    )
}