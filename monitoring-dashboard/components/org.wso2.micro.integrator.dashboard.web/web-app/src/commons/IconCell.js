/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 *
 */

import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow'
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';
import RegistryResourceSideDrawer from './sideDrawers/RegistryResourceSideDrawer';
import { Folder, ArrowForward } from "@material-ui/icons";
import XmlIcon from '@material-ui/icons/Code';
import TextIcon from '@material-ui/icons/ShortText';
import PropertyIcon from '@material-ui/icons/Build';
import CsvIcon from '@material-ui/icons/Toc';


export default function IconCell(props) {
    const classes = useStyles();
    const { pageId, retrieveData, name, iconType, handleDoubleClick, registryPath,data } = props;
    const [state, setState] = React.useState({
        openSideDrawer: false,
    });

    const toggleDrawer = (open,name) => (event) => {
        console.log('drawer click on item:')
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, openSideDrawer: open });
    };

    let timer = 0;
    let delay = 200;
    let prevent = false;

    const handleSingleClick = (name) => {

        timer = setTimeout(() => {
            if (!prevent) {
                console.log('single click on table cell name',{name})
                setState({ ...state, openSideDrawer: true });
            }
          }, delay);
    }

    const handleDoubleClickCell = (name,iconType,registryPath,handleDoubleClick) => {
        
        clearTimeout(timer);
        prevent = true;
        handleDoubleClick(name,iconType,registryPath);
        console.log('Double click on table cell name',{name})
        setTimeout(() => {prevent = false}, delay);

    }


    return <TableRow hover role="presentation">
        <TableCell onClick={() => handleSingleClick(name)} onDoubleClick={() => handleDoubleClickCell(name,iconType,registryPath,handleDoubleClick)} className={classes.tableCell}> 
            <Button variant="text" startIcon={<FileIcon iconType={iconType}/>}>
                {name}
            </Button>   
        </TableCell>
        <Drawer anchor='right' open={state['openSideDrawer']} onClose={toggleDrawer(false)} classes={{paper: classes.drawerPaper}}>
            <RegistryResourceSideDrawer pageId={pageId} data={data} registryPath={registryPath}/>
        </Drawer>
    </TableRow>;
}


function FileIcon(props) {
    var iconType = props.iconType
    if (iconType === 'folder'){
        return <Folder />
    } else if (iconType === 'xml'){
        return <XmlIcon />
    } else if (iconType === 'json'){
        return <CsvIcon />
    } else if (iconType === 'csv'){
        return <CsvIcon />
    } else if (iconType === 'text'){
        return <TextIcon />
    } else if (iconType === 'property'){
        return <PropertyIcon />
    } else {
        return <ArrowForward />
    }
}

function SideDrawer(props) {
    const { data, retrieveData } = props
    switch(props.pageId) {
        case 'registry-resources':
            console.log('drawer case switch')
            return <RegistryResourceSideDrawer data={data} retrieveData={retrieveData}/>
    }
}

const useStyles = makeStyles(() => ({
    tableCell : {
        padding: '1px',
        borderBottom: 'none',
        color: '#3f51b5',
        cursor: "pointer"
    },
    drawerPaper: {
        backgroundColor: '#fff',
    },
}));

