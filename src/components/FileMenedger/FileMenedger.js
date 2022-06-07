import { useEffect, useState } from "react";
import FolderIcon from "../../assets/img/folder.svg";
import Folder from "../Folder/Folder";


const FileMenedger = () => {
    const [folders, setFolders] = useState({})
    const [currentFolderName, setCurrentFolderName] = useState(null)

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
        setCurrentFolderName(folderName)
}


  return ( 
//    <div>{files.Folder1 && files.Folder1[0].name}</div>
   <div>
       {
           !currentFolderName && folders.Folder1 && Object.keys(folders).map(el => (
               <button 
                    key={el}><img src={FolderIcon}
                    onClick={() => handleClick(el)} />
                        {el}
                </button>
           ))
       }
       {
           currentFolderName && <Folder files={folders[currentFolderName]} />
       }
   
   </div>
  )
}

export default FileMenedger


