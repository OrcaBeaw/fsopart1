const Notification = ({ message }) => {
    if (!message) return null;

    return <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>;
};

export default Notification;
