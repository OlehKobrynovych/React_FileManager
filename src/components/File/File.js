import React from "react";
import docIcon from "../../assets/img/doc.svg";
import docxIcon from "../../assets/img/docx.svg";
import fileIcon from "../../assets/img/file.svg";
import jpegIcon from "../../assets/img/jpeg.svg";
import pdfIcon  from "../../assets/img/pdf.svg";
import pngIcon from "../../assets/img/png.svg";
import xlsxIcon from "../../assets/img/xlsx.svg";
import '../File/File.css';



const File = ({file}) => {

    const getIconFormat = React.useCallback(() =>{
        if (file) {
            const iconNames = {
                doc: docIcon,
                docx: docxIcon,
                jpeg: jpegIcon,
                pdf: pdfIcon,
                png: pngIcon,
                xlsx: xlsxIcon
            }; 
            const arr = file.name.split('.'); 
            const fileName = arr[arr.length - 1]; 
            return iconNames.hasOwnProperty(fileName) ? iconNames[fileName] : fileIcon;
        }

        return;
    }, [file]);

return ( 
    <div>
        {
            file && 
            <div >
                <img className="file_iconImg" src={getIconFormat()}/>{file.name}
                <p className="file_size">size: {file.size}</p> 
                <p className="file_created">created_at: {file.atime}</p>
            </div>
        }
            
    </div>
)
}

export default File

