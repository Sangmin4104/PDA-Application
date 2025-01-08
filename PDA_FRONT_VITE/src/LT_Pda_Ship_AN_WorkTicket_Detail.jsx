import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './LT_Pda_Ship_AN_WorkTicket_Detail.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
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
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FaceIcon from '@mui/icons-material/Face';
import DrawerModal from './DrawerModal';
import ModalScan from './ModalScan';
import Drawer from '@mui/material/Drawer';
import moment from 'moment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const LT_Pda_Ship_AN_WorkTicket_Detail = () => {
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const REACT_APP_SECOND_DOMAIN_CODE = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CODE;
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
    const REACT_APP_SECOND_DOMAIN_CUSTOMER = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CUSTOMER;
    const [userData, setUserData] = useState([]);
    const [searchUserData, setSearchUserData] = useState([]);
    const [workTicketData, setWorkTicketData] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [searchuserCount, setSearchUserCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [isWorkTicket, setIsWorkTicket] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalDateOpen, setModalDateOpen] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const location = useLocation();
    const { selectedRowData } = location.state || {};
    const [searchUser, setSearchUser] = useState(false);
    const [userCheck, setUserCheck] = useState([]);
    const [userNameCheck, setUserNameCheck] = useState([]);
    const [userName, setUserName] = useState('');
    const [searchCheck, setSearchCheck] = useState(false);
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [draweropen, setDrawerOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [userNames, setUserNames] = useState('');
    const [modalUserOpen, setModalUserOpen] = useState(false);



    const navigate = useNavigate();
    const equipName = location.state?.nameData;
    const equipId = location.state?.equipId;

    const rowsDataArray = Array.isArray(selectedRowData) ? selectedRowData : [selectedRowData];
    console.log(rowsDataArray);
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

    const handleModalDateClose = () => {
        setModalDateOpen(false);
        navigate('/LT_Pda_Ship_AN', { state: { equipId: equipId, nameData: equipName } })
    };

    const handleLogout = () => {
        setOpen(false);
        navigate('/');
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
        { id: 'custName', label: '사원번호' },
        { id: 'partTypeName', label: '사원명' },
        { id: 'userPlus', label: '추가' }
    ];


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchUser = () => {
        setSearchUser(true);
    }

    const handleModalUserClose = () => {
        setModalUserOpen(false);
        setSearchUser(false);
    }

    const handleUsersSave = () => {
        const concatenatedUsers = userCheck.join(', ');
        setUserName(concatenatedUsers);
        setModalUserOpen(true);
        setSelectedRowIndex(null);
    }

    const handleUserSave = (index) => {
        if (userCheck.length > 3) {
            alert('인원수를 초과하였습니다.');
            return;
        }

        const selectedUserData = userData[index];
        const selectedUserName = selectedUserData.emP_NAME;
        const selectedUserId = selectedUserData.emP_ID;

        if (userCheck.includes(selectedUserName)) {
            alert(`${selectedUserName}님은 이미 추가되었습니다.`);
            return;
        }

        setUserCheck(prevUserCheck => {
            const newUserCheck = [...prevUserCheck, selectedUserName];
            setUserId(newUserCheck);
            return newUserCheck;
        });

        setUserNameCheck(prevUserId => {
            const newUserCheckName = [...prevUserId, selectedUserId];
            setUserNames(newUserCheckName);
            return newUserCheckName;
        });
    }

    let worK_TICKET_ID = '';
    let parT_ID = '';
    let loT_NO = '';
    let cusT_ID = '';
    let shiP_DATE = '';
    let parT_NAME = '';
    let parT_TYPE = '';
    let shiP_QTY = '';

    rowsDataArray.forEach((item) => {
        worK_TICKET_ID = item.worK_TICKET_ID;
        parT_ID = item.parT_ID;
        loT_NO = item.loT_NO;
        cusT_ID = item.cusT_ID;
        shiP_DATE = item.shiP_DATE;
        parT_TYPE = item.parT_TYPE;
        parT_NAME = item.parT_NAME;
        shiP_QTY = item.shiP_QTY;
    });

    const handleClick = () => {
        if(userName == ''){
            alert('작업자를 선택해주세요.');
            return;
        }
        const url1 = `${REACT_APP_PROTOCOL}://dabom.acs.co.kr:8686/service.asmx/SetValueArrayListFormattedByJSON`;
        let data = [
            {
                VarID: "WID",
                Value: worK_TICKET_ID
            },
            {
                VarID: "PID",
                Value: parT_ID
            },
            {
                VarID: "LOT",
                Value: loT_NO
            },
            {
                VarId: "UI0",
                Value: userNames[0] ? userNames[0] : ''
            },
            {
                VarId: "UI1",
                Value: userNames[1] ? userNames[1] : ''
            },
            {
                VarId: "UI2",
                Value: userNames[2] ? userNames[2] : ''
            },
            {
                VarId: "UI3",
                Value: userNames[3] ? userNames[3] : ''
            },
            {
                VarId: "UN0",
                Value: userId[0] ? userId[0] : ''
            },
            {
                VarId: "UN1",
                Value: userId[1] ? userId[1] : ''
            },
            {
                VarId: "UN2",
                Value: userId[2] ? userId[2] : ''
            },
            {
                VarId: "UN3",
                Value: userId[3] ? userId[3] : ''
            },
            {
                VarId: "WORK_DATE",
                Value: shiP_DATE
            },
            {
                VarId: "PNM",
                Value: parT_NAME
            },
            {
                VarId: "PLQ",
                Value: shiP_QTY
            },
            {
                VarId: "PTE",
                Value: parT_TYPE
            },
            {
                VarId: "FD",
                Value: cusT_ID
            }

        ]

        fetch(url1, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pCommId: equipId, variableItems: data })
        }) .then(response => {
                return response.json();
        })
        .then(data => {
            console.log('data : ', data);
            setModalDateOpen(true);
        }).catch(error => {
            console.error('Error:', error.message);
        });
    }

    const handleUserCancel = (user) => {
        setUserCheck(prevUserCheck => {
            const newUserCheck = prevUserCheck.filter(item => item !== user);
            return newUserCheck;
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

    const handleModalScanOpen = () => {
        setModalScanOpen(true);
    };

    const handleModalScanClose = () => {
        setModalScanOpen(false);
    };

    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };

    const handleCancel = () => {
        navigate('/LT_Pda_Ship_AN_WorkTicket', { state: { nameData: equipName } });
    }

    const handleBack = () => {
        setSearchUser(false);
        setSearchCheck(false);
        setUserCheck([]);
        setUserNameCheck([]);
        setSelectedRowIndex(null);
    }

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
                    navigate('/LT_Pda_Ship_AN', { state: {nameData: equipName } });
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
                {!searchUser ? (
                    <div className={style.bodyContent}>
                        <div>
                            <h2 className={style.worktitle}>
                                작업지시 상세
                            </h2>
                            {rowsDataArray.map((item, index) => (
                                <div key={index} className={style.dateGubn}>
                                    <TextField id="workTicketId" label="작업지시명" variant="outlined" defaultValue={item.loT_NO}
                                        inputProps={{ style: { width: 312, height: 20 }, readOnly: true }} />
                                    <TextField id="partId" label="제품정보" variant="outlined" defaultValue={item.parT_ID} style={{ marginTop: 10 }}
                                        inputProps={{ style: { width: 312, height: 20 }, readOnly: true }} />
                                    <div className={style.textField33}>
                                        <TextField id="partType" label="제품유형" variant="outlined" defaultValue={item.parT_TYPE} style={{ marginTop: 10, marginLeft: 10 }}
                                            inputProps={{ style: { width: 140, height: 20 }, readOnly: true }} />
                                        <TextField id="custName" label="업체" variant="outlined" defaultValue={item.cusT_NAME} style={{ marginTop: 10, marginRight: 10 }}
                                            inputProps={{ style: { width: 140, height: 20 }, readOnly: true }} />
                                    </div>
                                    <div className={style.textField33}>
                                        <TextField id="workUser" label="작업자" variant="outlined" value={userName ? userName : ''} style={{ marginTop: 10, marginLeft: 10 }}
                                            inputProps={{ style: { width: 320, height: 20 }, readOnly: true }} />
                                        <div className={style.icon_container2}>
                                            <SearchIcon style={{ fontSize: 40 }} onClick={handleSearchUser} />
                                        </div>
                                    </div>
                                    <TextField id="shipDate" label="계획일자" variant="outlined" defaultValue={item.shiP_DATE} style={{ marginTop: 10 }}
                                        inputProps={{ style: { width: 312, height: 20 }, readOnly: true }} />
                                    <TextField id="shipQty" label="계획량" variant="outlined" defaultValue={item.shiP_QTY} style={{ marginTop: 10 }}
                                        inputProps={{ style: { width: 312, height: 20 }, readOnly: true }} />
                                </div>
                            ))}
                        </div>
                        <div className={style.btn}>
                            <div>
                                <Button variant="contained" style={{ width: 167, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} onClick={handleClick}>작업시작</Button>
                            </div>
                            <div>
                                <Button variant="contained" style={{ width: 167, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleCancel}>이전</Button>
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
                            <TextField id="user_id" label="사원번호" variant="outlined" style={{ marginLeft: 10, marginRight: 5 }}
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
                            <Paper sx={{ width: '93.7%', marginLeft: 1.5, marginTop: 1, overflow: 'hidden' }}>
                                <TableContainer className={style.tableContainer} sx={{ maxHeight: 210 }}>
                                    <Table stickyHeader aria-label="sticky table" style={{}}>
                                        <TableHead>
                                            <TableRow className={style.tableRow}>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        className={style.tableHeadCell}
                                                        style={{ fontSize: 10, width: '40px', height: 0, background: '#01DFA5', textAlign: 'center' }}
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
                                                        <TableRow key={index} style={{ width: 20, whiteSpace: 'break-spaces' }}
                                                            onDoubleClick={() => handleRowDoubleClick(item)}>
                                                            <TableCell style={{ width: '20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_ID}</TableCell>
                                                            <TableCell style={{ width: '20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_NAME}</TableCell>
                                                            <TableCell style={{ width: '20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>
                                                                <Button variant="contained" style={{ background: '#00bc5b', width: 50, height: 30, marginLeft: 10, fontSize: 10 }} onClick={() => handleUserSave(index)}>추가</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                            ) : (
                                                userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((item, index) => (
                                                        <TableRow key={index} style={{ width: 20, whiteSpace: 'break-spaces' }}
                                                            onDoubleClick={() => handleRowDoubleClick(item)}>
                                                            <TableCell style={{ width: '20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_ID}</TableCell>
                                                            <TableCell style={{ width: '20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>{item.emP_NAME}</TableCell>
                                                            <TableCell style={{ width: '20%', fontSize: 10, textAlign: 'center', backgroundColor: selectedRowIndex === index ? '#f0f0f0' : '' }} onClick={() => handleRowClick(index)}>
                                                                <Button variant="contained" style={{ background: '#00bc5b', width: 50, height: 30, marginLeft: 10, fontSize: 10 }} onClick={() => handleUserSave(index)}>추가</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    component="div"
                                    count={searchCheck ? searchuserCount : userCount}
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
                open={modalDateOpen}
                onClose={handleModalDateClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    .   <h2 className={style.selectDateIcon}><CalendarMonthIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        작업을 시작합니다.
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
            <Modal
                open={modalUserOpen}
                onClose={handleModalUserClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    .   <h2 className={style.selectDateIcon}><GroupAddIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        작업자를 저장하였습니다.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalUserClose}>확인</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
export default LT_Pda_Ship_AN_WorkTicket_Detail;