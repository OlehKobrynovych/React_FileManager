import { useState } from "react"
import arrow from "../../assets/img/arrow.svg"
import '../Filter/Filter.css';


const Filter = ({setFilterFolders, files}) => {
    // debugger
    const [toggle, setToggle] = useState(false)
    const [nameArrow, setNameArrow] = useState(false)


    const handleClickName = () => {
       if (toggle) {
        setFilterFolders([...files].sort((a, b) => a.name.localeCompare(b.name)))
        } else {
            setFilterFolders([...files].sort((a, b) => b.name.localeCompare(a.name)))
        }
        setToggle(!toggle)
        setNameArrow(!nameArrow)
    }

    const handleClickSize = () => {
       if (toggle) {
        setFilterFolders([...files].sort((a, b) => a.size - b.size))
        } else {
            setFilterFolders([...files].sort((a, b) => b.size - a.size))
        }
        setToggle(!toggle)
    }
    
    const handleClickCreated = () => {
       if (toggle) {
        setFilterFolders([...files].sort((a, b) => a.atime - b.atime))
        } else {
            setFilterFolders([...files].sort((a, b) => b.atime - a.atime))
        }
        setToggle(!toggle)
    }

return ( 
    <div>
        <button onClick={() => handleClickName()}>
           <span>Name</span>
           <img className={`filter__arrow ${nameArrow ? '' : 'filter__arrow--rotate'}`} src={arrow}/>   
        </button>
        <button onClick={() => handleClickSize()}>
           <span>Name</span>
           <img className="filter__arrow" src={arrow}/>   
        </button>
        <button onClick={() => handleClickCreated()}>
           <span>Name</span>
           <img className="filter__arrow" src={arrow}/>   
        </button>
    </div>
)
}

export default Filter


