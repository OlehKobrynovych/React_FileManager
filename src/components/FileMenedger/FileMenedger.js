import { useEffect, useState } from "react";
import FolderIcon from "../../assets/img/folder.svg";
import Folder from "../Folder/Folder";
import Button from '@mui/material/Button';
import { dataApi } from "../../api/data";

import "./FileMenedger.css"

const FileMenedger = () => {
    // const [folders, setFolders] = useState(null)
    const [folders, setFolders] = useState(dataApi)               // TODO: if the API will not work in the future
    const [currentFolder, setCurrentFolder] = useState(null)

    useEffect (() => {
        fetch("https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8")
            .then(res => res.json())
            .then(data => {
                if (data.ok && data.data.files) {
                    setFolders(data.data.files)}
                }
            )
    }, [])

    const handleClick = (folderName) => {
        setCurrentFolder(folders[folderName])
    }

    return ( 
        <div>
            {
                !currentFolder && folders && Object.keys(folders).map(el => (
                    <Button 
                        className="fileMenedger__folder"
                        variant="text"
                        key={el}
                    >
                          <img src={FolderIcon} onClick={() => handleClick(el)} alt="img" />
                          <span>{el}</span>
                    </Button>
                ))
            }
            {
                currentFolder && <Folder files={currentFolder} setCurrentFolder={setCurrentFolder}/>
            }
        </div>
    )
}

export default FileMenedger