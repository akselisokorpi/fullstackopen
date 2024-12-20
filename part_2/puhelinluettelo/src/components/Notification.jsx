
const Notification = ({ newName }) => {
    return (
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    );
};

export default Notification;