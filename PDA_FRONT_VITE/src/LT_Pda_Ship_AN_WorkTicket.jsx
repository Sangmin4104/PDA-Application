import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './LT_Pda_Ship_AN_WorkTicket.module.css';
import LOGO from '../img/logo.gif';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SearchIcon from '@mui/icons-material/Search';
import DrawerModal from './DrawerModal';
import ModalScan from './ModalScan';
import Drawer from '@mui/material/Drawer';
import dayjs from 'dayjs';


export const LT_Pda_Ship_AN_WorkTicket = () => {
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const REACT_APP_SECOND_DOMAIN_CODE = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CODE;
    const REACT_APP_SECOND_DOMAIN_CUSTOMER = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CUSTOMER;
    const [data, setData] = useState([]);
    const [custNamedata, setCustNameData] = useState([]);
    const [workTicketData, setWorkTicketData] = useState([]);
    const [workTicketCount, setWorkTicketCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [timeOutValue, setTimeoutValue] = useState(100);
    const [powerValue, setPowerValue] = useState(100);
    const [customerName, setCustomerName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isWorkTicket, setIsWorkTicket] = useState(false);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalDateOpen, setModalDateOpen] = useState(false);
    const [modalSettingOpen, setModalSettingOpen] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [switch1, setSwitch1] = useState(true);
    const [switch2, setSwitch2] = useState(true);
    const [switch3, setSwitch3] = useState(true);
    const [selectItem, setSelectItem] = useState('');
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [draweropen, setDrawerOpen] = useState(false);


    const navigate = useNavigate();

    const location = useLocation();
    const equipId = location.state?.equipId;
    const equipName = location.state?.nameData;
    console.log('11', equipName);
    const m_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        padding: 2
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleModalSettingClose = () => {
        setModalSettingOpen(false);
    };

    const handleModalDateOpen = () => {
        setModalDateOpen(true);
        setTimeout(() => {
            setModalDateOpen(false);
        }, 2000);
    };

    const handleModalDateClose = () => {
        setModalDateOpen(false);
    };

    const handleLogout = () => {
        setOpen(false);
        navigate('/');
    }

    const handleDateChange = (newDate) => {
        setIsSelectDate(true);
        const dateValue = newDate.format('YYYY-MM-DD');
        console.log(dateValue);
        setSelectedDate(dateValue);
        setSelectItem('');
        setIsWorkTicket(true);
    };

    const handleCustomerChange = (e) => {
        if (!isSelectDate) {
            handleModalDateOpen();
            return;
        } else {
            const value = e.target.value;
            setCustomerName(value);
            setIsWorkTicket(true);
            workTicket(selectedDate, value === '*' ? 'undefined' : value);
        }

    }

    const handleClick = () => {
        if (selectedRowIndex !== null) {
            navigate('/LT_Pda_Ship_AN_WorkTicket_Detail', { state: { selectedRowData: workTicketData[selectedRowIndex], equipId : equipId, nameData : equipName } });
        }
    }

    const handleRowDoubleClick = (rowData) => {
        const now = new Date().getTime();
        const timesince = now - lastClickTime;
        if (timesince < 500) {
            navigate('/LT_Pda_Ship_AN_WorkTicket_Detail', { state: { selectedRowData: workTicketData[selectedRowIndex], equipId : equipId, nameData : equipName } });
        } else {
            setLastClickTime(now);
        }

    };

    const columns = [
        { id: 'custName', label: '업체명', minWidth: 200 },
        { id: 'partTypeName', label: '제품유형', minWidth: 170 },
        { id: 'wdSizeRep', label: '규격', minWidth: 170 },
        { id: 'orderQTY', label: '주문수량', minWidth: 170 },
    ];


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        custNameData();
    }, []);

    const custNameData = () => {
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CUSTOMER}`;
        fetch(url, {
            method: 'POST',
        })
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                setCustNameData(jsonData);
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
    }

    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
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

    useEffect(() => {
        codeData();
    }, []);

    const codeData = () => {
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}`;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                setData(jsonData);
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
    }

    const handleItemChange = (e) => {
        console.log('isSelectDate : ', isSelectDate);
        if (!isSelectDate) {
            handleModalOpen();
            console.log('11');
            return;
        } else {
            console.log('22');
            setIsWorkTicket(true);
            const value = e.target.value;
            setSelectItem(value);
            custNameData(value);
            workTicket(selectedDate, value);
        }
    }

    const workTicket = (startDate, codeValue) => {
        const formData = new FormData();
        formData.append('P_WORK_DATE', startDate);
        formData.append('P_LINE_GUBN', codeValue);
        formData.append('P_CUST_NAME', 'undefined');
        console.log('startDate : ', startDate, ', codeValue : ', codeValue);
        console.log('formData : ', formData);
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/workTicket`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('data11 : ', data);
                setWorkTicketData(data);
                setWorkTicketCount(data.length);
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
    }


    const handleModalOpen = () => {
        setModalDateOpen(true);
        setTimeout(() => {
            setModalDateOpen(false);
        }, 2000);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleCancel = () => {
        navigate('/LT_Pda_Ship_AN', { state: {equipId : equipId, nameData : equipName}});
    }

    const handleModalScanOpen = () => {
        setModalScanOpen(true);
    };

    const handleModalScanClose = () => {
        setModalScanOpen(false);
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
                    const EQUIP_ID = data.equipId;
                    navigate('/LT_Pda_Ship_AN', { state: {equipId:EQUIP_ID, nameData : equipName}});
                } else {
                    alert('일치하는 설비가 없습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('네트워크 오류 발생');
            });
    }


    return (
        <>
            <div className={style.container}>
                <div className={style.menuBar}>
                <MenuIcon style={{ marginLeft: -10, fontSize: 30 }} onClick={toggleDrawer(true)} />
                    <Drawer open={draweropen} onClose={toggleDrawer(false)}>
                        <DrawerModal handleModalScanOpen={handleModalScanOpen} toggleDrawer={toggleDrawer} />
                    </Drawer>

                    <div className={style.menuBarText}>{equipName}</div>
                    <div>

                    </div>
                    <div className={style.rightSection}>
                        <Button variant="contained" style={{ width: 70, height: 30, marginRight: 5, fontSize: 12, padding: 0, background: '#0404B4' }} onClick={handleModalScanOpen}>설비교체</Button>
                        <PersonIcon style={{ marginRight: -10, fontSize: 30 }} onClick={handleOpen} />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...m_style, width: 240, height: 120 }}>
                                <h2 className={style.logoutIcon}><PermIdentityIcon style={{ fontSize: 60, marginTop: 10 }} /></h2>
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
                <div className={style.bodyContent}>
                    <div>
                        <h2>
                            작업지시 조회
                        </h2>
                    </div>
                    <div className={style.dateGubn}>
                        <div className={style.datePicker}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} style={{ widht: 30 }} adapterLocale="ko" dateFormats={{ monthShort: `M` }}>
                                <DemoContainer components={['DatePicker']} style={{ widht: 30 }}>
                                    <DatePicker id='start_date' label="납품일자" stlye={{ width: 30, height: 30 }}
                                        showDaysOutsideCurrentMonth
                                        format="YYYY-MM-DD"
                                        onChange={handleDateChange}
                                        defaultValue={dayjs('2023-01-17')}
                                    />

                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.selecter}>
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel id="select-label">구분</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="LT_ITEM"
                                    value={selectItem}
                                    label="구분"
                                    onChange={isSelectDate ? handleItemChange : handleModalOpen}
                                >
                                    {data.map((item, index) => (
                                        <MenuItem id='codeValue' key={index} value={item.valuE2}>{item.valuE2}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <Paper sx={{ width: '93.7%', marginLeft: 1.5, overflow: 'hidden' }}>
                            <TableContainer className={style.tableContainer} sx={{ maxHeight: 222 }}>
                                <Table stickyHeader aria-label="sticky table" style={{ width: '160%' }}>
                                    <TableHead>
                                        <TableRow className={style.tableRow}>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={style.tableHeadCell}
                                                    style={{ fontSize: 10, height: 0, background: '#01DFA5', textAlign: 'center', whiteSpace: 'nowrap' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {workTicketData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <TableRow key={index} style={{ maxWidth: 200, whiteSpace: 'break-spaces' }}
                                                    onDoubleClick={() => handleRowDoubleClick(item)}>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.cusT_NAME}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.parT_TYPE}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.parT_NAME}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.shiP_QTY}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={workTicketCount}
                                rowsPerPage={10}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[]}
                                sx={{ fontSize: '0.8rem', visibility: isWorkTicket ? 'visible' : 'hidden', borderTop: !isWorkTicket && 'none' }}
                                labelRowsPerPage=""
                            />  
                        </Paper>
                    </div>
                </div>
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} onClick={handleClick} disabled={selectedRowIndex === null}>선택완료</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleCancel}> 이전</Button>
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
                        <ClearIcon onClick={handleModalSettingClose} />
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
                                style={{ width: 160 }}
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
                                style={{ width: 180 }}
                            />
                            <p className={style.timeOutsliderText}>{powerValue}</p>
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting1}>
                            <SpellcheckIcon style={{ fontSize: 45 }} />
                            <p className={style.timeOut_text}>terminator none</p>
                            <Switch {...label} checked={switch1} onChange={handleSwitch1Change} />
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting2}>
                            <RestartAltIcon style={{ fontSize: 45 }} />
                            <p className={style.timeOut_text}>Continue Mode</p>
                            <Switch {...label} checked={switch2} onChange={handleSwitch2Change} />
                        </div>
                    </div>
                    <div>
                        <div className={style.modalSetting3}>
                            <NotificationsActiveIcon style={{ fontSize: 45 }} />
                            <p className={style.timeOut_text}>Buzzer Switch</p>
                            <Switch {...label} checked={switch3} onChange={handleSwitch3Change} />
                        </div>
                    </div>
                    <div className={style.selectDateBtn}>
                        <Button variant="contained" onClick={handleModalSettingClose} style={{ marginTop: 15, width: 270, background: '#0404B4' }}>완료</Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalDateOpen}
                onClose={handleModalDateClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    .   <h2 className={style.selectDateIcon}><CalendarMonthIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        납품일자를 먼저 선택해주세요.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalDateClose}>확인</Button>
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
export default LT_Pda_Ship_AN_WorkTicket;