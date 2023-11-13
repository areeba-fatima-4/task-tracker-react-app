import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
   <>
   {tasks.map( (it) => 
   (<Task 
    key={it.id} task={it} 
    onDelete = {onDelete}
    onToggle = {onToggle}
    />)
   )}
   </>
  )
}

export default Tasks