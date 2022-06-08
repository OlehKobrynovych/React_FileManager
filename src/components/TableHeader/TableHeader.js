import PropTypes from 'prop-types'; 
import TableHead from '@mui/material/TableHead'; 
import TableSortLabel from '@mui/material/TableSortLabel'; 
import { visuallyHidden } from '@mui/utils'; 
import { Box, TableCell, TableRow } from '@mui/material';

import "./TableHeader.css"

const TableHeader = (props) => {
  
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
            label: 'Updated', 
        }, 
        { 
            id: 'atime', 
            numeric: true, 
            label: 'Created', 
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
                    className='tableHeader__th'
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
  )
}

TableHeader.propTypes = { 
        onRequestSort: PropTypes.func.isRequired, 
        order: PropTypes.oneOf(['asc', 'desc']).isRequired, 
        orderBy: PropTypes.string.isRequired, 
    }; 
     

export default TableHeader


