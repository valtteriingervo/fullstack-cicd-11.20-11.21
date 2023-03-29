const Notification = ({ message, isError }) => {
    const notifStyleGood = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderWidth: 'medium',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notifStyleError = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderWidth: 'medium',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notifStyle = isError ? notifStyleError : notifStyleGood

    if (message === null) {
        return null
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}

export default Notification