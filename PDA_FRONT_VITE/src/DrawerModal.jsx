import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import { useNavigate } from 'react-router-dom';
import style from './LT_Pda_Ship_Insert.module.css';

const DrawerModal = ({ handleModalScanOpen, toggleDrawer }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <div className={style.menuTitle}>
                <p className={style.menuText}>Menu</p>
                <ClearIcon style={{ float: 'right', marginTop: 10, marginRight: 10 }} />
            </div>
            <List style={{ marginTop: -10 }}>
                {['열처리', '출하 RFID', '출하등록'].map((text, index) => {
                    const path = index === 1 ? '/LT_Pda_Ship_RFID' : '/LT_Pda_Ship';
                    return (
                        <React.Fragment key={text}>
                            <ListItem disablePadding style={{ marginTop: 0 }}>
                                <ListItemButton style={{marginTop:5}}onClick={() => {
                                    if (index === 0) {
                                        handleModalScanOpen();
                                    } else {
                                        navigate(path);
                                    }
                                }}>
                                    <ListItemIcon>
                                        {index === 1 ? <FireplaceIcon style={{ marginLeft: 20 }} /> : index === 2 ? <LocalShippingIcon style={{ marginLeft: 20 }} /> : <FireTruckIcon style={{ marginLeft: 20 }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                            <Divider style={{marginTop:-5}}/>
                        </React.Fragment>
                    );
                })}
            </List>
        </Box>
    );
};

export default DrawerModal;