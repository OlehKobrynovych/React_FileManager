
// import File from "../File/File";


// const Folder = ({files}) => {
//     // const [files, setFiles] = useState({})
// // debugger
//     // useEffect (() => {
        
//     //         const iconNames = ['bmp', 'doc', 'jpg', 'jpeg', 'mp4', 'pdf', 'png', 'ppt', 'txt', 'xls', 'xlsx']; 
//     //         const arr = files.split('.'); 
//     //         const name = arr[arr.length - 1]; 
//     //         return iconNames.includes(name) ? name : 'doc'; 
        
        
//     //   }, [files])


//   return ( 
//     <div>
//         {files.map(el =>
//             (
//                 <File file={el} key={el.name}/>
//         ))}
//     </div>
//   )
// }

// export default Folder


import * as React from 'react'; 
import PropTypes from 'prop-types'; 
import Box from '@mui/material/Box'; 
import Table from '@mui/material/Table'; 
import TableBody from '@mui/material/TableBody'; 
import TableCell from '@mui/material/TableCell'; 
import TableContainer from '@mui/material/TableContainer'; 
import TableHead from '@mui/material/TableHead'; 
import TableRow from '@mui/material/TableRow'; 
import TableSortLabel from '@mui/material/TableSortLabel'; 
import Paper from '@mui/material/Paper'; 
import { visuallyHidden } from '@mui/utils'; 

import docIcon from "../../assets/img/doc.svg";
import docxIcon from "../../assets/img/docx.svg";
import fileIcon from "../../assets/img/file.svg";
import jpegIcon from "../../assets/img/jpeg.svg";
import pdfIcon  from "../../assets/img/pdf.svg";
import pngIcon from "../../assets/img/png.svg";
import xlsxIcon from "../../assets/img/xlsx.svg";
 
import "./Folder.css"

const EnhancedTableHead = (props) => { 
    const { order, orderBy, onRequestSort } = props; 
 
    const headCells = [ 
        { 
            id: 'name', 
            numeric: false, 
            label: 'Name', 
        }, 
        { 
            id: 'size', 
            numeric: true, 
            label: 'Size', 
        }, 
        { 
            id: 'mtime', 
            numeric: true, 
            label: 'Updated_at', 
        }, 
        { 
            id: 'atime', 
            numeric: true, 
            label: 'Created_at', 
        }, 
    ]; 
 
    const createSortHandler = (property) => (event) => { 
        onRequestSort(event, property); 
    }; 
 
    return ( 
        <TableHead> 
            <TableRow> 
                {headCells.map((headCell) => ( 
                    <TableCell 
                        key={headCell.id} 
                        align={headCell.numeric ? 'right' : 'left'} 
                        sortDirection={orderBy === headCell.id ? order : false} 
                    > 
                        <TableSortLabel 
                            active={orderBy === headCell.id} 
                            direction={orderBy === headCell.id ? order : 'asc'} 
                            onClick={createSortHandler(headCell.id)} 
                        > 
                        {headCell.label} 
                        {orderBy === headCell.id ? ( 
                            <Box component="span" sx={visuallyHidden}> 
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'} 
                            </Box> 
                        ) : null} 
                        </TableSortLabel> 
                    </TableCell> 
                ))} 
            </TableRow> 
        </TableHead> 
    ); 
} 
 
EnhancedTableHead.propTypes = { 
    onRequestSort: PropTypes.func.isRequired, 
    order: PropTypes.oneOf(['asc', 'desc']).isRequired, 
    orderBy: PropTypes.string.isRequired, 
}; 
 
export default function Folder({files}) { 
    // files 
    // debugger 
 
    // atime: 1654567840 
    // dev: 2049 
    // mtime: 1641977227 
    // name: "regions.xlsx" 
    // size: 10234 
    // type: " 
 
    const [order, setOrder] = React.useState('asc'); 
    const [orderBy, setOrderBy] = React.useState('size'); 
 
    const stableSort = (array, comparator) => { 
        const stabilizedThis = array.map((el, index) => [el, index]); 
        stabilizedThis.sort((a, b) => { 
            const order = comparator(a[0], b[0]); 
            if (order !== 0) { 
            return order; 
            } 
            return a[1] - b[1]; 
        }); 
        return stabilizedThis.map((el) => el[0]); 
    } 
 
    const descendingComparator = (a, b, orderBy) => { 
        if (b[orderBy] < a[orderBy]) { 
            return -1; 
        } 
        if (b[orderBy] > a[orderBy]) { 
            return 1; 
        } 
        return 0; 
    } 
     
    const getComparator = (order, orderBy) => { 
        return order === 'desc' 
            ? (a, b) => descendingComparator(a, b, orderBy) 
            : (a, b) => -descendingComparator(a, b, orderBy); 
    }   
 
    const handleRequestSort = (event, property) => { 
        const isAsc = orderBy === property && order === 'asc'; 
        setOrder(isAsc ? 'desc' : 'asc'); 
        setOrderBy(property); 
    }; 

    const getIconFormat = React.useCallback((file) =>{
        if (file) {
            const iconNames = {
                doc: docIcon,
                docx: docxIcon,
                jpeg: jpegIcon,
                pdf: pdfIcon,
                png: pngIcon,
                xlsx: xlsxIcon
            }; 
            const arr = file.split('.'); 
            const fileName = arr[arr.length - 1]; 
            return iconNames.hasOwnProperty(fileName) ? iconNames[fileName] : fileIcon;
        }

        return;
    }, [files]);
 
    return ( <>
    
        <Box sx={{ width: '100%' }}> 
            <Paper sx={{ width: '100%', mb: 2 }}> 
                <TableContainer> 
                    <Table
// sx={{ minWidth: 750 }} 
                        sx={{ minWidth: 320 }} 
                        aria-labelledby="tableTitle" 
                        size={'small'} 
                    > 
                        <EnhancedTableHead 
                            order={order} 
                            orderBy={orderBy} 
                            onRequestSort={handleRequestSort} 
                        /> 
 
                        <TableBody> 
                            {stableSort(files, getComparator(order, orderBy)) 
                            .map((row, index) => { 
                                const labelId = `enhanced-table-checkbox-${index}`; 
 
                                return ( 
                                <TableRow 
                                    hover 
                                    tabIndex={-1} 
                                    key={row.name} 
                                > 
                                    <TableCell 
                                        component="th" 
                                        id={labelId} 
                                        scope="row" 
                                        padding="none" 
                                    > 
                                        <img className='folder__file-icon' src={getIconFormat(row.name)} alt='img' width={'33'}/>
                                        <span>{row.name}</span>
                                    </TableCell> 
                                    <TableCell align="right">{row.size}</TableCell> 
                                    <TableCell align="right">{row.mtime}</TableCell> 
                                    <TableCell align="right">{row.atime}</TableCell> 
                                </TableRow> 
                                ); 
                            })} 
 
                        </TableBody> 
                    </Table> 
                </TableContainer> 
            </Paper> 
        </Box> 
    </>    
    ); 
}

