
const Notification = ({ newName }) => {
    return (
        window.alert(`${newName} is already added to phonebook`)
    );
};

export default Notification;