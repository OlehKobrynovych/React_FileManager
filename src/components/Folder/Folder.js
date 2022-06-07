
import File from "../File/File";


const Folder = ({files}) => {
    // const [files, setFiles] = useState({})

    // useEffect (() => {
        
    //         const iconNames = ['bmp', 'doc', 'jpg', 'jpeg', 'mp4', 'pdf', 'png', 'ppt', 'txt', 'xls', 'xlsx']; 
    //         const arr = files.split('.'); 
    //         const name = arr[arr.length - 1]; 
    //         return iconNames.includes(name) ? name : 'doc'; 
        
        
    //   }, [files])


  return ( 
    <div>
        {files.map(el =>
            (
                <File file={el} key={el.name}/>
        ))}
    </div>
  )
}

export default Folder


