const AddPerson = ( props ) => {
    return (
        <form>
        <div> name: <input value={props.newName} onChange={props.handleNewPerson}/> </div>
        <div> number: <input value={props.newNumber} onChange={props.handleNewNumber}/> </div>
        <div>
          <button type="submit" onClick={(event) => { 
            event.preventDefault(); props.addNewPersonToArray(); 
            }}>add
            </button>
        </div>
      </form>
    );
};

export default AddPerson;