import { useEffect, useState } from "react";
import FolderIcon from "../../assets/img/folder.svg";
// import Filter from "../Filter/Filter";
import Folder from "../Folder/Folder";
import Button from '@mui/material/Button';

import "./FileMenedger.css"


const FileMenedger = () => {
    const [folders, setFolders] = useState(null)
    // const [filterFolders, setFilterFolders] = useState([])
    const [currentFolder, setCurrentFolder] = useState(null)

    // debugger
    useEffect (() => {
        fetch("https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8")
          .then(res => res.json())
          .then(data => {
            //   debugger
              if (data.ok && data.data.files) {
                //   debugger
                setFolders(data.data.files)}

              }
          )
      }, [])

    const handleClick = (folderName) => {
        setCurrentFolder(folders[folderName])
        // setFilterFolders(folders[folderName])
}


  return ( 
   <div>
       {/* <Filter setFilterFolders={setFilterFolders} files={filterFolders}/> */}
       {
           !currentFolder && folders && Object.keys(folders).map(el => (
               <Button 
                    className="fileMenedger__folder"
                    variant="text"
                    key={el}><img src={FolderIcon}
                    onClick={() => handleClick(el)} />
                        {el}
                </Button>
           ))
       }
       {
        //    currentFolderName && <Folder files={filterFolders} />
           currentFolder && <Folder files={currentFolder} />
       }
   
   </div>
  )
}

export default FileMenedger


