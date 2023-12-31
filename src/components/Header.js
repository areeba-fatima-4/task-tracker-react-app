import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd }) => {
    
    const onClick = (e) => {
        console.log('clicked' , e)
        onAdd()
    }
 
  return (
    <header className='header'>
        <h1> {title} </h1> 
        <Button 
         text={!showAdd ? 'Add Task' : 'Close'}
         onClick={onClick}
         color={showAdd? 'red' : 'green'}
          />          
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header