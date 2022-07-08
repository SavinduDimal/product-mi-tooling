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
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import Editor from "@monaco-editor/react";
import HTTPClient from '../../../utils/HTTPClient';
const format = require('xml-formatter');

export default function RegistrySourceViewSection(props) {
    const {registryPath, designContent, registryName, data} = props;
    const globalGroupId = useSelector(state => state.groupId);
    const [source, setSource] = React.useState("initial source");
    const [isLoading, setIsLoading] = React.useState(true);
    const [sourceLanguage, setSourceLanguage] = React.useState("text");
    const [selectedTab, setSelectedTab] = React.useState(0);
    const selectedPath = registryPath.concat('/').concat(registryName);

    const params = {
        groupId: globalGroupId
    };

    const [open] = React.useState(false);

    React.useEffect(() => {
        if (registryName.endsWith('.json')) {
            setSourceLanguage('json');  
        } else if (registryName.endsWith('.xml')) {
            setSourceLanguage('xml');  
        } else {
            setSourceLanguage('text');
        }
    },[])



        // React.useEffect(() => {
        // console.log("react use effect excecute")
        // console.log(selectedTab,registryName,data.mediaType)
        // if (selectedTab === 1 && (!registryName.endsWith('.properties')) && (data.mediaType !== 'directory')) {
        //     console.log('if path');
        //     const resourcePath = '/groups/'.concat(globalGroupId).concat('/registry-resources/').concat('content?path=').concat(selectedPath);
        //     HTTPClient.get(resourcePath).then(response => {
        //         // setSource(response.data.toString);
        //         setSource("test data /n testdata2 /n testdata3/n");
        //         console.log(response.data);
        //         console.log(typeof response.data.toString());
        //         console.log("source in=",source);

        //     })
        //     console.log("source out=",source);
        // } else {
        //     console.log('else path');
        //     setSource("No available content");
        // }
    // }, [selectedTab])

    // const handleSourceView = () => {
    //     console.log("react use effect excecute")
    //     console.log(selectedTab,registryName,data.mediaType)
    //     if (selectedTab === 0 && (!registryName.endsWith('.properties')) && (data.mediaType !== 'directory')) {
    //         console.log('if path');
    //         const resourcePath = '/groups/'.concat(globalGroupId).concat('/registry-resources/').concat('content?path=').concat(selectedPath);
    //         HTTPClient.get(resourcePath).then(response => {
    //             setSource(getResponseString(response.data));
    //             // setSource("test data /n testdata2 /n testdata3/n");
    //             console.log(response.data);
    //             console.log(typeof response.data.toString());
    //             console.log("source in=",source);

    //         })
    //         console.log("source out=",source);
    //     } else {
    //         console.log('else path');
    //         setSource("No available content");
    //     }
    // }

    const getResponseString = (response) => {
        if ( typeof response === 'object' && !Array.isArray(response) && response !== null) {
            const stringResponse = JSON.stringify(response);
            return stringResponse;
        } else {
            return response.toString();
        }
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const changeTab = (e, tab) => {
        console.log("start change tab:")
        console.log(source)
        console.log(selectedTab,tab,registryName,data.mediaType)
        if (tab === 1 && (!registryName.endsWith('.properties')) && (data.mediaType !== 'directory')) {
            console.log('if path');
            const resourcePath = '/groups/'.concat(globalGroupId).concat('/registry-resources/').concat('content?path=').concat(selectedPath);
            HTTPClient.get(resourcePath).then(response => {
                setSource(getResponseString(response.data));
                setIsLoading(false);
                console.log(response.data);
                console.log(typeof response.data.toString());
                console.log("source in=",source);
            })
            console.log("source out=",source);
        } else if (tab === 0){
            console.log('overview tab');
            setIsLoading(true);
            
        } else {
            setIsLoading(false);
            setSource("No available content");
        }
        setSelectedTab(tab);
    }

    const classes = useStyles();

    if (designContent) {
        return (<><AppBar position="static" classes={{root: classes.tabsAppBar}}>
            <Tabs value={selectedTab} onChange={changeTab} aria-label="design source selection">
                <Tab label="Overview"/>
                <Tab label="Source" />
            </Tabs>
        </AppBar>
            {selectedTab === 0 && (<>{designContent}</>)}
            {(selectedTab === 1 && isLoading) && (<div>Loading...</div>)}
            {(selectedTab === 1 && !isLoading)&& (<Box p={5} overflow='auto'>
                <Editor
                    height="70vh"
                    defaultLanguage={sourceLanguage}
                    defaultValue={source}
                    // defaultValue={source}
                    options={{
                        readOnly: true
                    }}
                />
            </Box>)}
        </>)
    }
}

const useStyles = makeStyles(() => ({
    tabsAppBar: {
        backgroundColor: '#000',
    }
}));
