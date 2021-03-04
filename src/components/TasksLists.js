

const BlogList = ({ tasks }) => {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} >
            <h2>{ task.title }</h2>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;