import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

function CollapseRadio(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('0');

    
    useEffect(() => {
        if(props.initState){
            setOpen(props.initState);
        }
    }, [props.initState]);

    const handleClick = () => {
        setOpen(open ? false : true);
    }

    const handleAngle = () => {
        return (open ?
            <FontAwesomeIcon icon={faAngleUp} className="icon"/>
        :
            <FontAwesomeIcon icon={faAngleDown} className="icon"/>
        )
    };

    const renderList = () => (
        props.list ? 
            props.list.map((value)=>(
                <FormControlLabel
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio/>}
                    label={value.name}
                />
            ))
        :   
            null
    )

    const handleChange = (event) => {
        setValue(event.target.value);
        props.handleFilters(event.target.value);
    }

    return (
        <div>
            <List style={{borderBottom: '1px solid #dbdbdb'}}>
                <ListItem onClick={() => handleClick()} style={{padding: '10px 23px 10px 0'}}>
                    <ListItemText
                        primary={props.title}
                        className="collapse_title"
                    />
                        {handleAngle()}
                </ListItem>
            </List>

            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    <RadioGroup
                        aria-label="prices"
                        name="prices"
                        value={value}
                        onChange={handleChange}
                    >
                        {renderList()}
                    </RadioGroup>
                </List>
            </Collapse>
        </div>
    )

}

export default CollapseRadio
