import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LT_Pda_Ship.module.css';
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
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import DrawerModal from './DrawerModal';
import ModalScan from './ModalScan';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'

export const LT_Pda_Ship = () => {
    const [data, setData] = useState([]);
    const [custNamedata, setCustNameData] = useState([]);
    const [workTicketData, setWorkTicketData] = useState([]);
    const [workTicketCount, setWorkTicketCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [selectItem, setSelectItem] = useState('');
    const [companyName, setComponyName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isWorkTicket, setIsWorkTicket] = useState(false);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [isSelectGubn, setIsSelectGubn] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [modalDateOpen, setModalDateOpen] = useState(false);
    const [modalGubnOpen, setModalGubnOpen] = useState(false);
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const REACT_APP_SECOND_DOMAIN_CODE = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CODE;
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;

    const navigate = useNavigate();

    const [draweropen, setDrawerOpen] = useState(false);
   
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


    const m_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleModalOpen = () => {
        setModalDateOpen(true);
        setTimeout(() => {
            setModalDateOpen(false);
        }, 2000);
    };

    const handleModalClose = () => {
        setModalDateOpen(false);
    };
    const handleModalGubnOpen = () => {
        setModalGubnOpen(true);
        setTimeout(() => {
            setModalGubnOpen(false);
        }, 2000);
    };

    const handleModalGubnClose = () => {
        setModalGubnOpen(false);
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
        setComponyName('');
    };

    const handleItemChange = (e) => {
        console.log('isSelectDate : ', isSelectDate);
        if (!isSelectDate) {
            handleModalOpen();
            console.log('11');
            return;
        } else {
            console.log('22');
            setIsWorkTicket(true);
            setIsSelectGubn(true);
            const value = e.target.value;
            setSelectItem(value);
            custNameData(value);
            workTicket(selectedDate, value);
        }
    }

    const handleCompanyChange = (e) => {
        const value = e.target.value;
        setComponyName(value);
        setIsWorkTicket(true);
        workTicket(selectedDate, selectItem, value === '*' ? 'undefined' : value);
    }

    const handleClick = () => {
        if (selectedRowIndex !== null) {
            navigate('/LT_Pda_Ship_Insert', { state: { selectedRowData: workTicketData[selectedRowIndex] } });
        }
    }

    const handleRowDoubleClick = (rowData) => {
        const now = new Date().getTime();
        const timesince = now - lastClickTime;
        if (timesince < 500) {
            navigate('/LT_Pda_Ship_Insert', { state: { selectedRowData: rowData } });
        } else {
            setLastClickTime(now);
        }

    };

    const columns = [
        { id: 'lotNo', label: 'Lot No', minWidth: 170 },
        { id: 'custName', label: '업체명', minWidth: 200 },
        { id: 'partTypeName', label: '제품유형', minWidth: 170 },
        { id: 'wdSizeRep', label: '규격', minWidth: 170 },
        { id: 'qty', label: '수량', minWidth: 170 },
        { id: 'partSectId', label: '구분', minWidth: 170 }
    ];

    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        codeData();
    }, []);

    const codeData = () => {
        const url = `http://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}`;
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

    const custNameData = (codeValue) => {
        console.log('v1 :', codeValue);
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/codeValue`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(codeValue),
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

    const workTicket = (startDate, codeValue, custName) => {
        const formData = new FormData();
        formData.append('P_WORK_DATE', startDate);
        formData.append('P_LINE_GUBN', codeValue);
        formData.append('P_CUST_NAME', custName);
        console.log('startDate : ', startDate, ', codeValue : ', codeValue, ', custName : ', custName);
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

    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.menuBar}>
                <MenuIcon style={{ marginLeft: -10, fontSize: 30 }} onClick={toggleDrawer(true)} />
                    <Drawer open={draweropen} onClose={toggleDrawer(false)}>
                        <DrawerModal handleModalScanOpen={handleModalScanOpen} toggleDrawer={toggleDrawer} />
                    </Drawer>
                    <div className={style.menuBarText}>출하 지시 조회</div>
                    <div className={style.rightSection}>
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
                <div className={style.datePicker}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko" dateFormats={{ monthShort: `M` }}>
                        <DemoContainer components={['DatePicker']} stlye={{ minWidth: 10 }} >
                            <DatePicker id='start_date' label="납품일자" stlye={{ width: 100, minWidth: 10 }}
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
                <div className={style.companyName}>
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel id="select-label">업체명</InputLabel>
                        <Select
                            labelId="select-label"
                            id="LT_COMPANY"
                            value={companyName}
                            label="업체명"
                            onChange={handleCompanyChange}
                            onOpen={() => {
                                if (!isSelectGubn) {
                                    handleModalGubnOpen();
                                    onClose;
                                    return;
                                }
                            }}
                        >
                            {custNamedata.map((item, index) => (
                                <MenuItem id='codeValue' key={index} value={item.cusT_NAME}> {item.cusT_NAME === '*' ? item.cusT_NAME + '(모든회사)'  : `${item.cusT_ID}:${item.cusT_NAME}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                                    {!isWorkTicket || workTicketData.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                style={{
                                                    height: '180px',
                                                    verticalAlign: 'middle',
                                                    fontSize: 10,
                                                    paddingLeft: '150px'
                                                }}
                                            >No Rows</TableCell>
                                        </TableRow>
                                    ) : (
                                        workTicketData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <TableRow key={index} style={{ maxWidth: 200, whiteSpace: 'break-spaces' }}
                                                    onDoubleClick={() => handleRowDoubleClick(item)}>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.loT_NO}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.cusT_NAME}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.parT_TYPE_NAME}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.parT_NAME}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.ordeR_QTY}</TableCell>
                                                    <TableCell style={{ fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.parT_SECT_ID}</TableCell>
                                                </TableRow>
                                            ))
                                    )}
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
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} onClick={handleClick} disabled={selectedRowIndex === null}>선택완료</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleOpen}>이전</Button>
                    </div>
                </div>
            </div>
            <Modal
                open={modalDateOpen}
                onClose={handleModalClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    .   <h2 className={style.selectDateIcon}><CalendarMonthIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        납품일자를 먼저 선택해주세요.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalClose}>확인</Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalGubnOpen}
                onClose={handleModalGubnClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    <h2 className={style.selectDateIcon}><SafetyDividerIcon style={{ fontSize: 60, marginTop: 80 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        구분을 먼저 선택해주세요.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalGubnClose}>확인</Button>
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
export default LT_Pda_Ship;