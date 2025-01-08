import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './LT_Pda_Ship_AN.module.css';
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
import FaceIcon from '@mui/icons-material/Face';
import swal from 'sweetalert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';


export const LT_Pda_Ship_AN = () => {
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_SECOND_DOMAIN_CODE = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CODE;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const REACT_APP_SECOND_DOMAIN_CUSTOMER = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CUSTOMER;
    const [equipData, setEquipData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [searchUserData, setSearchUserData] = useState([]);
    const [workTicketData, setWorkTicketData] = useState([]);
    const [workTicketCount, setWorkTicketCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [searchuserCount, setSearchUserCount] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isWorkTicket, setIsWorkTicket] = useState(false);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalDateOpen, setModalDateOpen] = useState(false);
    const [modalWorkFinishOpen, setModalWorkFinishOpen] = useState(false);
    const [modalNoUserOpen, setModalNoUserOpen] = useState(false);
    const [modalWarningOpen, setModalWarningOpen] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [draweropen, setDrawerOpen] = useState(false);
    const [searchUser, setSearchUser] = useState(false);
    const [userCheck, setUserCheck] = useState([]);
    const [searchCheck, setSearchCheck] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [modalAleadyUserOpen, setModalAleadyUserOpen] = useState(false);
    const [workNoCheck, setWorkNoCheck] = useState('');
    const [HborbinText, setHBorbinText] = useState('');
    const [GborbinText, setGBorbinText] = useState('');
    const [widCheck, setWidCheck] = useState('');
    const [lotData, setLotData] = useState('');
    const [userIds, setUserIds] = useState('');
    const [widData, setWidData] = useState('');
    const [equipID, setEquipID] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const location = useLocation();
    const equipId = location.state?.equipId;
    const equipName = location.state?.nameData;
    const hBorbin = location.state.hBorbin;
    const gBorbin = location.state.gBorbin;


    useEffect(() => {
        equipFetchData(equipId);
    }, [equipId, userCheck, equipID, searchUser]);

    let LOT, FD, workDate, PTE, PID , PNM, PLQ, combinedUserNames, WID = '';
    const equipFetchData = (equipId) => {
        const getUrl = `${REACT_APP_PROTOCOL}://dabom.acs.co.kr:8686/service.asmx/GetValuesFilterFormattedByJSON`;
            fetch(getUrl, {
                method: 'POST',
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({ pCommId : equipId, pCurEQ : 'Y', pEvMode: 'E'}),
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const parsedData = JSON.parse(data.d);
                const firstData = parsedData[0];
                const rawData = firstData.Data;
                console.log('rawData : ', rawData);
    
                // const commIdMatch = rawData.match(/Comm_ID;([^|]+)/);
                // const commId = commIdMatch ? commIdMatch[1] : '';

                const workTicketMatch = rawData.match(/WID;([^|]+)/);
                const workTicket = workTicketMatch ? workTicketMatch[1] : '';
    
                const workDateMatch = rawData.match(/WORK_DATE;([^|]+)/);
                workDate = workDateMatch ? workDateMatch[1] : '';

                const PIDMatch = rawData.match(/PID;([^|]+)/);
                PID = PIDMatch ? PIDMatch[1] : '';

                const LOTMatch = rawData.match(/LOT;([^|]+)/);
                LOT = LOTMatch ? LOTMatch[1] : '';
                setLotData(LOT);

                const WIDMatch = rawData.match(/WID;([^|]+)/);
                WID = WIDMatch ? WIDMatch[1] : '';
                setWidData(WID);

                const FDMatch = rawData.match(/FD;([^|]+)/);
                FD = FDMatch ? FDMatch[1] : '';

                const PNMMatch = rawData.match(/PNM;([^|]+)/);
                PNM = PNMMatch ? PNMMatch[1] : '';

                const PLQMatch = rawData.match(/PLQ;([^|]+)/);
                PLQ = PLQMatch ? PLQMatch[1] : '';

                const PTEMatch = rawData.match(/PTE;([^|]+)/);
                PTE = PTEMatch ? PTEMatch[1] : '';

                const UN0Match = rawData.match(/UN0;([^|]+)/);
                const UN0 = UN0Match ? UN0Match[1] : '';

                const UN1Match = rawData.match(/UN1;([^|]+)/);
                const UN1 = UN1Match ? UN1Match[1] : '';

                const UN2Match = rawData.match(/UN2;([^|]+)/);
                const UN2 = UN2Match ? UN2Match[1] : '';

                const UN3Match = rawData.match(/UN3;([^|]+)/);
                const UN3 = UN3Match ? UN3Match[1] : '';

                const UI0Match = rawData.match(/UI0;([^|]+)/);
                const UI0 = UI0Match ? UI0Match[1] : '';
                setUserIds(UI0);

                const UI1Match = rawData.match(/UI1;([^|]+)/);
                const UI1 = UI1Match ? UI1Match[1] : '';

                const UI2Match = rawData.match(/UI2;([^|]+)/);
                const UI2 = UI2Match ? UI2Match[1] : '';

                const UI3Match = rawData.match(/UI3;([^|]+)/);
                const UI3 = UI3Match ? UI3Match[1] : '';
                
                const combinedUserNames = [UN0, UN1, UN2, UN3].join(', ');

                let wIdMatch = rawData.match(/WID;([^|]+)/);
                let widValue = wIdMatch ? wIdMatch[1] : '';

                const hBorbinMatch = rawData.match(/SPI;([^|]+)/);
                let hBorbinValue = hBorbinMatch ? hBorbinMatch[1] : '';

                const gBorbinMatch = rawData.match(/SPO;([^|]+)/);
                let gBorbinValue = gBorbinMatch ? gBorbinMatch[1] : '';

                if(widValue === ''){
                    setWidCheck(true);
                    setWorkNoCheck('비가동중');
                }else{
                    setWidCheck(false);
                    document.getElementById('workTicket_No').value = LOT;
                    document.getElementById('cust_Name').value = FD;
                    document.getElementById('work_Date').value = workDate;
                    document.getElementById('work_Type').value = PTE;
                    document.getElementById('part_No').value = PID;
                    document.getElementById('part_Type').value = PNM;
                    document.getElementById('plan_QTY').value = PLQ;
                    document.getElementById('work_User').value = combinedUserNames;

                    document.getElementById('hBorbin').value = hBorbinValue;
                    document.getElementById('gBorbin').value = gBorbinValue;
                    setHBorbinText(hBorbinValue);
                    setGBorbinText(gBorbinValue);
                }
                
                setEquipData(data.d);
            })
            .catch(error => {
                console.error('Error :', error.message);
                console.log(error);
            });
    }
    
    const handleWorkOrderFinish = () => {
        const workTicket = document.getElementById('workTicket_No').value;
        if(workTicket === '비가동중'){
            setErrorMessage('열처리기가 비가동중입니다.');
            setModalWarningOpen(true);
        }else{
        const url1 = `${REACT_APP_PROTOCOL}://dabom.acs.co.kr:8686/service.asmx/SetValueArrayListFormattedByJSON`;
        const url2 = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/workTicketFinish`;
        let data = [
            {
                VarID: "WID",
                Value: ''
            },
            {
                VarID: "PID",
                Value: ''
            },
            {
                VarID: "LOT",
                Value: ''
            },
            {
                VarId: "UI0",
                Value: ''
            },
            {
                VarId: "UI1",
                Value: ''
            },
            {
                VarId: "UI2",
                Value: ''
            },
            {
                VarId: "UI3",
                Value: ''
            },
            {
                VarId: "UN0",
                Value: ''
            },
            {
                VarId: "UN1",
                Value: ''
            },
            {
                VarId: "UN2",
                Value: ''
            },
            {
                VarId: "UN3",
                Value: ''
            },
            {
                VarId: "PNM",
                Value: ''
            },
            {
                VarId: "PLQ",
                Value: ''
            },
            {
                VarId: "PTE",
                Value: ''
            },
            {
                VarId: "SPI",
                Value: ''
            },
            {
                VarId: "SPO",
                Value: ''
            }    ,
            {
                VarId: "U0",
                Value: ''
            },
            {
                VarId: "FD",
                Value: ''
            },
            {
                VarId: "CUT",
                Value: ''
            },
            {
                VarId: "LTO",
                Value: ''
            },
            {
                VarId: "LTI",
                Value: ''
            }
      ]
    

      const fetch1 = fetch(url1, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pCommId: equipId, variableItems: data })
        });

        const formData = new FormData();
            formData.append('P_USER_ID', userIds);
            formData.append('P_CREATE_TYPE', 'A');
            formData.append('P_WORK_TICKET_ID', widData);

        const fetch2 = fetch(url2, {
            method: 'POST',
            body: formData,
        });

        Promise.all([fetch1, fetch2])
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            })
            .then(data => {
                setWidCheck(false);
                setModalWorkFinishOpen(true);
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
        }
    }


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


    const handleModalDateOpen = () => {
        setModalDateOpen(true);
        setTimeout(() => {
            setModalDateOpen(false);
        }, 2000);
    };

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
                    setEquipID(EQUIP_ID);
                    navigate('/LT_Pda_Ship_AN', { state: { equipId : EQUIP_ID, nameData: equipName } });
                    setSearchUser(false);
                    setSearchCheck(false);
                    setUserCheck([]);
                    setModalScanOpen(false);
                } else {
                    setModalWarningOpen(true);
                    setErrorMessage('일치하는 설비가 없습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('네트워크 오류 발생');
            });
    }

    const handleModalWorkFinish = () => {
        setModalWorkFinishOpen(false);
        window.location.reload();
    }

    const handleModalDateClose = () => {
        setModalDateOpen(false);
        setSearchUser(false);
        let userId = document.getElementById('user_id').value;
        userId == '';
    };

    const handleModalCheckUserClose = () => {
        setModalNoUserOpen(false);
    };

    const handleLogout = () => {
        setOpen(false);
        navigate('/');
    }

    const handleDateChange = (newDate) => {
        setIsSelectDate(true);
        const dateValue = newDate.format('YYYY-MM-DD');
        setSelectedDate(dateValue);
        setCustomerName('');
        setIsWorkTicket(true);
        workTicket(dateValue);
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
        const workTicket = document.getElementById('workTicket_No').value;
        if(workTicket != '비가동중'){
            setErrorMessage('열처리기가 작동중입니다.');
            setModalWarningOpen(true);
        }else{
            navigate('/LT_Pda_Ship_AN_WorkTicket', { state: { equipId : equipId, nameData: equipName } });
        }
    }

    const handleRowDoubleClick = (rowData) => {
        const now = new Date().getTime();
        const timesince = now - lastClickTime;
        if (timesince < 500) {
            navigate('/LT_Pda_Ship_RFID_Scan', { state: { selectedRowData: rowData } });
        } else {
            setLastClickTime(now);
        }

    };

    const columns = [
        { id: 'custName', label: '사원번호'},
        { id: 'partTypeName', label: '사원명'},
        { id: 'userPlus', label: '추가'}
    ];


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const workTicket = (startDate, custName) => {
        const formData = new FormData();
        formData.append('P_SHIP_DATE', startDate);
        formData.append('P_CUST_NAME', custName);
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CUSTOMER}/workTicket`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
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

    const handleWarningCancel = (index) => {
        setModalWarningOpen(false);
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

    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    const handleBorbinChange = () => {
        const workTicket = document.getElementById('workTicket_No').value;
        if(workTicket === '비가동중'){
            setErrorMessage('열처리기가 비가동중입니다.');
            setModalWarningOpen(true);
        }else{
            navigate('/LT_Pda_Ship_AN_Borbin', { state: { equipId : equipId, nameData: equipName, hBorbin : HborbinText, gBorbin : GborbinText } });
        }
        
    }

    const handleSearchUser = () => {
        const workTicket = document.getElementById('workTicket_No').value;
        if(workTicket === '비가동중'){
            setErrorMessage('열처리기가 비가동중입니다.');
            setModalWarningOpen(true);
        }else{
            setSearchUser(true);
        }
        
    }

    useEffect(() => {
        usersData();
    }, []);

    const usersData = () => {
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_EMP}`;
        fetch(url, {
            method: 'POST',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setUserData(data);
                setUserCount(data.length);
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
    }

    const handleuserSearch = () => {
        const formData = new FormData();
        let userId = document.getElementById('user_id').value;
        let userName = document.getElementById('user_name').value;
        userId = userId ? userId : 'undefined';
        userName = userName ? userName : 'undefined';
        formData.append('EMP_ID', userId);
        formData.append('EMP_NAME', userName);
        const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_EMP}/userSearch`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            setSearchCheck(true);
            setSearchUserData(data);
            setSearchUserCount(data.length);
        })
        .catch(error => {
            console.error('Error :', error.message);
        });
    }

    const handleUsersSave = () => {
        if(userCheck.length < 1){
            setModalNoUserOpen(true);
        }else{
            const concatenatedUsers = userCheck.join(', ');
            setModalDateOpen(true);
            setUserName(concatenatedUsers);
            setSelectedRowIndex(null);
        }
    }

    const handleUserSave = (index) => {
        if(userCheck.length > 3){
            alert('인원수를 초과하였습니다.');
            return;
        }

    const selectedUserData = userData[index];
    const selectedUserName = selectedUserData.emP_NAME;

    if (userCheck.includes(selectedUserName)) {
        setModalAleadyUserOpen(true);
    }else{

        setUserCheck(prevUserCheck => {
            const newUserCheck = [...prevUserCheck, selectedUserData.emP_NAME];
            return newUserCheck;
        });
    }
    }

    const handleUserCancel = (user) => {
        setUserCheck(prevUserCheck => {
            const newUserCheck = prevUserCheck.filter(item => item !== user);
            return newUserCheck;
        });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleBack = () => {
        setSearchUser(false);
        setSearchCheck(false);
        setSelectedRowIndex(null);
        setUserId('');
    }

    const handleUserId = (event) => {
        setUserId(event.target.value);
    }

    const handleAleadyUserClose = () => {
        setModalAleadyUserOpen(false);
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
                {!searchUser ? (
                    <div>
                        <div className={style.content}>
                            <div>
                                <TextField id="workTicket_No" label="LOT_NO" variant="outlined" focused style={{ marginLeft: 10, marginTop: 10 }} value={widCheck ? workNoCheck : lotData}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                                <TextField id="cust_Name" label="업체" variant="outlined" focused style={{ marginLeft: 10, marginTop: 16.5 }} value={widCheck ? '' : FD}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                                <TextField id="work_Date" label="일자" variant="outlined" focused style={{ marginLeft: 10, marginTop: 16.5 }} value={widCheck ? '' : workDate}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                                <TextField id="work_Type" label="제품유형" variant="outlined" focused style={{ marginLeft: 10, marginTop: 16.5 }} value={widCheck ? '' : PTE}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                                <TextField id="part_No" label="품번" variant="outlined" focused style={{ marginLeft: 10, marginTop: 16.5 }} value={widCheck ? '' : PID}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                                <TextField id="part_Type" label="규격" variant="outlined" focused style={{ marginLeft: 10, marginTop: 16.5 }} value={widCheck ? '' : PNM}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                                <TextField id="plan_QTY" label="계획수량" variant="outlined" focused style={{ marginLeft: 10, marginTop: 16.5 }} value={widCheck ? '' : PLQ}
                                    inputProps={{ style: { fontSize: 15, height: 10, width: 138 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 15 } }} />
                            </div>
                            <div className={style.contentContainer}>
                                <div>
                                    <h3 className={style.heText}>해선 보빈</h3>
                                    <TextField id='hBorbin' style={{ width: 120 }}
                                    inputProps={{ style: {textAlign:'center', fontSize:20}, readOnly: true }} value={widCheck? '' : HborbinText}></TextField>
                                    <DoubleArrowIcon style={{ marginTop: 30, fontSize: 50, transform: 'rotate(90deg)' }} />
                                    <h3>권선 보빈</h3>
                                    <TextField id='gBorbin' style={{ width: 120 }}
                                    inputProps={{  style: {textAlign:'center', fontSize:20}, readOnly: true }} value={widCheck? '' : GborbinText} ></TextField>
                                    <Button variant="contained" style={{ background: '#2E9AFE', marginTop: 10, width: 120, height: 50 }} onClick={handleBorbinChange}>보빈 교체</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <TextField id="work_User" label="작업자" variant="outlined" focused defaultValue={userName && userName} value={widCheck? '' : combinedUserNames} style={{ marginLeft: 10, marginTop: 10 }}
                                inputProps={{ style: { height: 20, width: 253 }, readOnly: true }} />
                            <div className={style.icon_container2}>
                                <SearchIcon style={{ fontSize: 40 }} onClick={handleSearchUser} />
                            </div>
                        </div>
                        <div className={style.btn}>
                            <div>
                                <Button variant="contained" style={{ width: 167, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} onClick={handleClick}>지시조회</Button>
                            </div>
                            <div>
                                <Button variant="contained" style={{ width: 167, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleWorkOrderFinish}>지시종료</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={style.bodyContent}>
                        <div>
                            <h2 className={style.worktitle}>
                                작업자 검색
                            </h2>
                        </div>
                        <div className={style.dateGubn1}>
                            <TextField id="user_id" label="사원번호" variant="outlined" style={{ marginLeft: 10, marginRight: 5 }} value={userId? userId : ''} onChange={handleUserId}
                                inputProps={{ style: { fontSize: 15, height: 10 } }} focused InputLabelProps={{ style: { fontSize: 15 } }} />
                            <TextField id="user_name" label="사원명" variant="outlined" style={{ marginRight: 10, marginLeft: 5 }}
                                inputProps={{ style: { fontSize: 15, height: 10 } }} focused InputLabelProps={{ style: { fontSize: 15 } }} />
                            <div className={style.icon_container3}>
                                <SearchIcon style={{ fontSize: 40 }} onClick={handleuserSearch} />
                            </div>
                        </div>
                        <div className={style.userInput}>
                            <div className={style.userInputDetail1}>
                                <FaceIcon style={{ marginTop: 3, float: 'left', marginLeft: 10, color: '0160ee' }} />
                                <p className={userCheck[0] ? style.userInputText1 : style.userInputText}>{userCheck[0] ? userCheck[0] : '작업자를 추가해주세요'}
                                    {userCheck[0] &&
                                        <div className={style.cancel_icon_container}>
                                            <ClearIcon style={{ fontSize: 12 }} onClick={() => handleUserCancel(userCheck[0])} />
                                        </div>
                                    }
                                </p>
                            </div>
                            <div className={style.userInputDetail2}>
                                <FaceIcon style={{ marginTop: 3, float: 'left', marginLeft: 10, color: '0160ee' }} />
                                <p className={userCheck[1] ? style.userInputText1 : style.userInputText}>{userCheck[1] ? userCheck[1] : '작업자를 추가해주세요'}
                                    {userCheck[1] &&
                                        <div className={style.cancel_icon_container}>
                                            <ClearIcon style={{ fontSize: 12 }} onClick={() => handleUserCancel(userCheck[1])} />
                                        </div>
                                    }
                                </p>
                            </div>
                        </div>
                        <div className={style.userInput}>
                            <div className={style.userInputDetail1}>
                                <FaceIcon style={{ marginTop: 3, float: 'left', marginLeft: 10, color: '0160ee' }} />
                                <p className={userCheck[2] ? style.userInputText1 : style.userInputText}>{userCheck[2] ? userCheck[2] : '작업자를 추가해주세요'}
                                    {userCheck[2] &&
                                        <div className={style.cancel_icon_container}>
                                            <ClearIcon style={{ fontSize: 12 }} onClick={() => handleUserCancel(userCheck[2])} />
                                        </div>
                                    }
                                </p>
                            </div>
                            <div className={style.userInputDetail2}>
                                <FaceIcon style={{ marginTop: 3, float: 'left', marginLeft: 10, color: '0160ee' }} />
                                <p className={userCheck[0] ? style.userInputText1 : style.userInputText}>{userCheck[3] ? userCheck[3] : '작업자를 추가해주세요'}
                                    {userCheck[3] &&
                                        <div className={style.cancel_icon_container}>
                                            <ClearIcon style={{ fontSize: 12 }} onClick={() => handleUserCancel(userCheck[3])} />
                                        </div>
                                    }
                                </p>
                            </div>
                        </div>
                        <div>
                        <Paper sx={{ width: '93.7%', marginLeft: 1.5, marginTop:1, overflow: 'hidden' }}>
                            <TableContainer className={style.tableContainer} sx={{ maxHeight: 210 }}>
                                <Table stickyHeader aria-label="sticky table" style={{ }}>
                                    <TableHead>
                                        <TableRow className={style.tableRow}>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={style.tableHeadCell}
                                                    style={{ fontSize: 10, width:'40px', height: 0, background: '#01DFA5', textAlign: 'center' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {searchCheck ? (
                                            searchUserData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <TableRow key={index} style={{ width:20, whiteSpace: 'break-spaces' }}
                                                    onDoubleClick={() => handleRowDoubleClick(item)}>
                                                    <TableCell style={{ width:'20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_ID}</TableCell>
                                                    <TableCell style={{ width:'20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_NAME}</TableCell>
                                                    <TableCell style={{ width:'20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>
                                                    <Button variant="contained" style={{ background:'#00bc5b', width: 50, height: 30, marginLeft: 10, fontSize: 10}} onClick={() => handleUserSave(index)}>추가</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                        userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((item, index) => (
                                                <TableRow key={index} style={{ width:20, whiteSpace: 'break-spaces' }}
                                                    onDoubleClick={() => handleRowDoubleClick(item)}>
                                                    <TableCell style={{ width:'20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_ID}</TableCell>
                                                    <TableCell style={{ width:'20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_NAME}</TableCell>
                                                    <TableCell style={{ width:'20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>
                                                    <Button variant="contained" style={{ background:'#00bc5b', width: 50, height: 30, marginLeft: 10, fontSize: 10}} onClick={() => handleUserSave(index)}>추가</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                count={searchCheck ? searchuserCount: userCount}
                                rowsPerPage={10}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[]}
                                sx={{ fontSize: '0.8rem', borderTop: !isWorkTicket && 'none' }}
                                labelRowsPerPage=""
                            />
                        </Paper>
                            </div>
                        <div className={style.btn}>
                            <div>
                                <Button variant="contained" style={{ width: 167, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} onClick={handleUsersSave}>저장</Button>
                            </div>
                            <div>
                                <Button variant="contained" style={{ width: 167, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleBack}>이전</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                open={modalWorkFinishOpen}
                onClose={handleModalWorkFinish}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    .   <h2 className={style.selectDateIcon}><BuildIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        작업이 종료되었습니다.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalWorkFinish}>확인</Button>
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
                    .   <h2 className={style.selectDateIcon}><GroupAddIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        작업자를 저장하였습니다.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalDateClose}>확인</Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalNoUserOpen}
                onClose={handleModalCheckUserClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                .   <h2 className={style.selectDateIcon}><ErrorIcon style={{ fontSize: 60, marginTop: 60, color:'red' }} /></h2>
                <p id="child-modal-description" className={style.selectDateText}>
                    선택한 작업자가 없습니다.
                </p>
                <div className={style.selectDateBtn}>
                    <Button onClick={handleModalCheckUserClose}>확인</Button>
                </div>
            </Box>         
            </Modal>
            <Modal
                open={modalAleadyUserOpen}
                onClose={handleAleadyUserClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                .   <h2 className={style.selectDateIcon}><ErrorIcon style={{ fontSize: 60, marginTop: 40, color:'red' }} /></h2>
                <p id="child-modal-description" className={style.selectDateText}>
                    선택한 작업자가 <br/>이미 추가되었습니다.
                </p>
                <div className={style.selectDateBtn}>
                    <Button onClick={handleAleadyUserClose}>확인</Button>
                </div>
            </Box>         
            </Modal>
            <Modal
                open={modalWarningOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 250, height: 150 }}>
                    <div className={style.modalText}>
                        <h4 className={style.modalAlime}></h4>
                        <ClearIcon onClick={handleWarningCancel} style={{ marginRight:0 }} />
                    </div>
                    <div className={style.modalContent}>
                        <ErrorIcon style={{fontSize:50, marginTop:-20, color:'red'}}/>
                        <p className={style.scanText}>{errorMessage}</p>
                    </div>
                    <div className={style.selectDateBtn}>
                        <Button variant="contained" onClick={handleWarningCancel} style={{ marginLeft:-180, marginTop:-5, width: 250, background: 'red' }}>확인</Button>
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
export default LT_Pda_Ship_AN;