import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './LT_Pda_Ship_RFID_Scan.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ClearIcon from '@mui/icons-material/Clear';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import DrawerModal from './DrawerModal';
import ModalScan from './ModalScan';
import Drawer from '@mui/material/Drawer';


export const LT_Pda_Ship_RFID_Scan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [rowData, setRowData] = useState('');
    const { selectedRowData } = location.state || {};
    const [modalSettingOpen, setModalSettingOpen] = useState(false);
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [timeOutValue, setTimeoutValue] = useState(100);
    const [powerValue, setPowerValue] = useState(100);
    const [switch1, setSwitch1] = useState(true);
    const [switch2, setSwitch2] = useState(true);
    const [switch3, setSwitch3] = useState(true);
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
const [modalMenuOpen, setModalMenuOpen] = useState(false);
const [draweropen, setDrawerOpen] = useState(false);

    
    useEffect(() => {
        if (selectedRowData) {
            console.log('선택된 행 데이터:', selectedRowData);
        } else {
            console.log('선택된 행 데이터가 없습니다.');
        }
    }, [selectedRowData]);

    const rowsDataArray = Array.isArray(selectedRowData) ? selectedRowData : [selectedRowData];

    const m_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:2,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        setOpen(false);
        navigate('/');
    }

    const handleModalOpen = () => {
        setModalScanOpen(true);
        setTimeout(() => {
            setModalScanOpen(false);
        }, 2000);
    };

    const handleModalClose = () => {
        setModalScanOpen(false);
    };

    const columns = [
        { id: 'TagUid', label: 'TagUid', minWidth: 170 },
        { id: 'No', label: 'No', minWidth: 170 },
    ];

    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const handleModalScanOpen = () => {
        setModalMenuOpen(true);
    };

    const handleModalScanClose = () => {
        setModalMenuOpen(false);
    };

 const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };

    const handleWorkStart = () => {
        const formData = new FormData();
        const EQUIP_ID = document.getElementById('EQUIP_ID').value;
        formData.append('EQUIP_ID', EQUIP_ID);
        const apiUrl = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_EMP}/equip_login`;
        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const equipName = data.equipName;
                    navigate('/LT_Pda_Ship_AN', { state: {nameData : equipName}});
                } else {
                    alert('일치하는 설비가 없습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('네트워크 오류 발생');
            });
    }



    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleCancel = () => {
        navigate('/LT_Pda_Ship_RFID')
    }

    function ValueLabelComponent(props) {
        const { children, value } = props;
        return (
            <Tooltip enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        value: PropTypes.number.isRequired,
    };

    const handleTimeOutSliderChange = (e, newValue) => {
        setTimeoutValue(newValue);
    }

    const handlePowerSliderChange = (e, newValue) => {
        setPowerValue(newValue);
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleSwitch1Change = () => {
        setSwitch1(!switch1);
    };

    const handleSwitch2Change = () => {
        setSwitch2(!switch2);
    };

    const handleSwitch3Change = () => {
        setSwitch3(!switch3);
    };

    const handleModalSettingOpen = () => {
        setModalSettingOpen(true);
    };

    const handleModalSettingClose = () => {
        setModalSettingOpen(false);
    };

    function ValueLabelComponent(props) {
        const { children, value } = props;
        return (
            <Tooltip enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        value: PropTypes.number.isRequired,
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.menuBar}>
                <MenuIcon style={{ marginLeft: -10, fontSize: 30 }} onClick={toggleDrawer(true)} />
                    <Drawer open={draweropen} onClose={toggleDrawer(false)}>
                        <DrawerModal handleModalScanOpen={handleModalScanOpen} toggleDrawer={toggleDrawer} />
                    </Drawer>
                    <div className={style.menuBarText}>출하 등록</div>
                    <div className={style.rightSection}>
                        <Button variant="contained" style={{ width: 70, height: 30, marginRight: 5, fontSize: 12, padding: 0, background: '#0404B4' }} onClick={handleModalSettingOpen}>장비설정</Button>
                        <PersonIcon style={{ marginRight: -10, fontSize: 30 }} onClick={handleOpen} />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...m_style, width: 200, height: 100 }}>
                                <h2 className={style.logoutIcon}><PermIdentityIcon style={{ fontSize: 60 }} /></h2>
                                <p id="child-modal-description" className={style.logoutText}>
                                    로그아웃 하시겠습니까?
                                </p>
                                <div className={style.logoutBtn}>
                                    <Button onClick={handleClose}>취소</Button>
                                    <Button onClick={handleLogout}>로그아웃</Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
                <div className={style.textFields}>
                    {rowsDataArray.map((item, index) => (
                        <div key={index}>
                            <div className={style.textField1}>
                                <TextField id="outlined-basic" label="LOT NO" variant="outlined" defaultValue={item.loT_NO} style={{ marginRight: 5 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly:true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="주문수량" variant="outlined" defaultValue={item.ordeR_QTY}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly:true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                            </div>
                            <div className={style.textField2}>
                                <TextField id="outlined-basic" label="제품유형" variant="outlined" defaultValue={item.parT_TYPE} style={{ marginRight: 5 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly:true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="규격" variant="outlined" defaultValue={item.parT_NAME}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly:true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.bacodeField}>
                    <TextField id="filled-basic" label="Box code" variant="filled" style={{ width: 340 }} focused
                        InputLabelProps={{
                            style: { color: '#0404B4', fontWeight: 'bold' } 
                        }} 
                        />
                </div>
                <div>
                    <Paper sx={{ width: '93.7%', marginLeft: 1.5, overflow: 'hidden', marginTop: 1 }}>
                        <TableContainer className={style.tableContainer}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow className={style.tableRow} >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                className={style.tableHeadCell}
                                                style={{ width: 20, fontSize: 10, background: '#01DFA5', textAlign: 'center', whiteSpace: 'nowrap' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={style.tableRow}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} className={style.tableBodyCell} style={{ width: 20, fontSize: 10, textAlign: 'center' }}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 40, background: '#0404B4', marginTop: 10, marginLeft: 10, fontSize: 15 }} >CLEAR</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 40, background: '#0404B4', marginTop: 10, marginRight: 10, fontSize: 15 }} >스캔</Button>
                    </div>
                </div>
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 40, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 15 }} onClick={handleModalOpen}>저장</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 40, background: '#FF0000', marginTop: 10, marginRight: 10, fontSize: 15 }} onClick={handleCancel}>이전</Button>
                    </div>
                </div>
            </div>
            <Modal
                open={modalSettingOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 270, height: 350 }}>
                    <div className={style.modalText}>
                        <h3 className={style.modalAlime}>RFID SETTING</h3>
                        <ClearIcon onClick={handleModalSettingClose}/>
                    </div>
                    <div>
                        <div className={style.modalSetting}>
                            <p className={style.timeOut_text}>TimeOut</p>
                            <Slider
                                valueLabelDisplay="auto"
                                slots={{
                                    valueLabel: ValueLabelComponent,
                                }}
                                aria-label="custom thumb label"
                                defaultValue={20}
                                onChange={handleTimeOutSliderChange}
                                style={{width:160}}
                            />
                            <p className={style.timeOutsliderText}>{timeOutValue}</p>
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting}>
                            <p className={style.timeOut_text}>Power</p>
                            <Slider
                                valueLabelDisplay="auto"
                                slots={{
                                    valueLabel: ValueLabelComponent,
                                }}
                                aria-label="custom thumb label"
                                defaultValue={20}
                                onChange={handlePowerSliderChange}
                                style={{width:180}}
                            />
                            <p className={style.timeOutsliderText}>{powerValue}</p>
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting1}>
                            <SpellcheckIcon style={{fontSize:45}}/>
                            <p className={style.timeOut_text}>terminator none</p>
                            <Switch {...label} checked={switch1} onChange={handleSwitch1Change}/>
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting2}>
                        <RestartAltIcon style={{fontSize:45}}/>
                            <p className={style.timeOut_text}>Continue Mode</p>
                            <Switch {...label} checked={switch2} onChange={handleSwitch2Change}/>
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting3}>
                        <NotificationsActiveIcon style={{fontSize:45}}/>
                            <p className={style.timeOut_text}>Buzzer Switch</p>
                            <Switch {...label} checked={switch3} onChange={handleSwitch3Change} />
                        </div>
                    </div>
                    <div className={style.selectDateBtn}>
                        <Button variant="contained" onClick={handleModalSettingClose} style={{marginTop:15, width: 270, background: '#0404B4' }}>완료</Button>
                    </div>
                </Box>
            </Modal>
            
<ModalScan
                modalScanOpen={modalScanOpen}
                handleModalScanClose={handleModalScanClose}
                handleWorkStart={handleWorkStart}
            />
        </>
    );
}
export default LT_Pda_Ship_RFID_Scan;