const AddPerson = ( props ) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewPersonToArray();
  };

    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label>
            name: <input value={props.newName} onChange={props.handleNewPerson}/>
          </label>
        </div>
        <div>
          <label>
            number: <input value={props.newNumber} onChange={props.handleNewNumber}/>
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export default AddPerson;