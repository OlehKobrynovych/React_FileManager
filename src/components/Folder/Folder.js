import React from 'react'; 
import { useEffect} from "react";
import Box from '@mui/material/Box'; 
import Table from '@mui/material/Table'; 
import TableBody from '@mui/material/TableBody'; 
import TableCell from '@mui/material/TableCell'; 
import TableContainer from '@mui/material/TableContainer'; 
import TableRow from '@mui/material/TableRow'; 
import Paper from '@mui/material/Paper'; 

import docIcon from "../../assets/img/doc.svg";
import docxIcon from "../../assets/img/docx.svg";
import fileIcon from "../../assets/img/file.svg";
import jpegIcon from "../../assets/img/jpeg.svg";
import pdfIcon  from "../../assets/img/pdf.svg";
import pngIcon from "../../assets/img/png.svg";
import xlsxIcon from "../../assets/img/xlsx.svg";
 
import TableHeader from '../TableHeader/TableHeader';
import "./Folder.css"
import { Button } from '@mui/material';
import moment from 'moment';

 
export default function Folder({files, setCurrentFolder}) { 
 
    const [order, setOrder] = React.useState('asc'); 
    const [orderBy, setOrderBy] = React.useState('size'); 

    useEffect (() => {
        let asd = (localStorage.getItem('order'))
        if (asd) {
            setOrder(asd)
        }

        let asdasd = (localStorage.getItem('orderBy'))
        if (asdasd) {
            setOrderBy(asdasd)
        }
    }, [])

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
        localStorage.setItem('order', `${isAsc ? 'desc' : 'asc'}`);
        localStorage.setItem('orderBy', `${property}`);
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

    const getHumanDate = (date) => { 
        let dateUtc = moment.utc(date); 
        let localDate = moment(dateUtc).local().calendar({ sameElse: 'MM/DD/YYYY [at] h:mm a' }); 
        return localDate; 
    };
 
    return (
         <>
            <Button variant="contained" onClick={() => setCurrentFolder(null)} >Return</Button>

            <Box sx={{ width: '100%' }}> 
                <Paper sx={{ width: '100%', mb: 2 }}> 
                    <TableContainer> 
                        <Table
                            className='folder__table'
                            sx={{ minWidth: 320 }} 
                            aria-labelledby="tableTitle" 
                            size={'small'} 
                        > 

                            <TableHeader 
                                order={order} 
                                orderBy={orderBy} 
                                onRequestSort={handleRequestSort} 
                            /> 

                            <TableBody className='folder__tableBody' > 
                                {stableSort(files, getComparator(order, orderBy)) 
                                    .map((row, index) => { 
                                        const labelId = `enhanced-table-checkbox-${index}`; 
    
                                            return ( 
                                                <TableRow 
                                                    className='folder__row'
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
                                                        <img className='folder__file-icon' src={getIconFormat(row.name)} alt='img'/>
                                                        <span>{row.name}</span>
                                                    </TableCell> 
                                                    <TableCell align="right">{row.size}</TableCell> 
                                                    <TableCell align="right">{getHumanDate(row.mtime)}</TableCell> 
                                                    <TableCell align="right">{getHumanDate(row.atime)}</TableCell> 
                                                </TableRow> 
                                            ); 
                                    })
                                } 
    
                            </TableBody> 
                        </Table> 
                    </TableContainer>

                    <div className='folder__items'>
                        {stableSort(files, getComparator(order, orderBy)) 
                            .map((row, index) => ( 
                                <div 
                                    className='folder__item'
                                    key={row.name}
                                > 
                                        <img className='folder__file-icon' src={getIconFormat(row.name)} alt='img'/>
                                        <b>{row.name}</b>
                                        <p><b>Size:</b> {row.size}</p> 
                                        <p><b>Updated:</b> {getHumanDate(row.mtime)}</p> 
                                        <p><b>Created:</b> {getHumanDate(row.atime)}</p> 
                                </div>
                                ))
                        }
                    </div>
                </Paper> 
            </Box> 
        </>    
    ); 
}

