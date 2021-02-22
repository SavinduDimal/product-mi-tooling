import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { changeGroup } from '../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import AuthManager from '../auth/AuthManager';
import { Constants } from '../auth/Constants';

export default function GroupSelector() {

    const [groupList, setGroupList] = React.useState([]);
    const dispatch = useDispatch();
    const basePath = useSelector(state => state.basePath);

    React.useEffect(() => {
        const url = basePath.concat('/groups/');
        let groups = [];
        var authBearer = "Bearer " + AuthManager.getCookie(Constants.JWT_TOKEN_COOKIE)
        axios.get(url, { headers: { Authorization: authBearer } }).then(response => {
            response.data.filter(groupName => {
                var group = {
                    label: groupName,
                    value: groupName
                }
                groups.push(group);
            })
            setGroupList(groups)
            if (groups.length > 0) {
                dispatch(changeGroup(groups[0].value))
            }
        })
    }, [])

    return (
        <SelectComponent groupList={groupList} />
    );
}

function SelectComponent(props) {
    const classes = useStyles();

    var options = props.groupList;
    const dispatch = useDispatch();
    return <FormControl style={{ width: 150 }}>
        <Select
            classes={{ root: classes.selectRoot }}

            labelId="group-id-select-label"
            id="group-id-select"
            onChange={(e) => dispatch(changeGroup(e.target.value))}
        >
            {options.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}

        </Select>
        <FormHelperText>Group ID</FormHelperText>

    </FormControl>;
}

const useStyles = makeStyles((theme) => ({
    selectRoot: {
        minHeight: '25px',
        lineHeight: '25px',
    },
}));