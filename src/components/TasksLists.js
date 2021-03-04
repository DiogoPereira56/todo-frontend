

const BlogList = ({ tasks }) => {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} >
          <Link to={`/task/${task.id}`}>
            <h2>{ task.title }</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;