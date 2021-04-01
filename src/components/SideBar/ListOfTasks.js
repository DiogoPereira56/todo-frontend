

const ListOfTasks = ({ lists }) => {
  return (
    <div>
      {lists.map(list => (
        <div key={list.idList} >
            <h2>{ list.listName }</h2>
        </div>
      ))}
    </div>
  );
}
 
export default ListOfTasks;