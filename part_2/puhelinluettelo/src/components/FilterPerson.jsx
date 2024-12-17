const FilterPerson = ( props ) => {
    
    return (
        <form>
        <div> Filter shown with <input value={props.newFilter} onChange={props.handleFiltering}/> </div> 
        </form>
    );
};

export default FilterPerson;