import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './LT_Pda_Ship_Insert.module.css';
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
import Drawer from '@mui/material/Drawer';
import DrawerModal from './DrawerModal';
import ModalScan from './ModalScan';

export const LT_Pda_Ship_Insert = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [shipData, setShipData] = useState([]);
    const [shipDataCount, setShipDataCount] = useState(0);
    const [rowData, setRowData] = useState('');
    const [baInsertData, setBaInsertData] = useState([]);
    const [barcodeCheck, setBarcodeCheck] = useState(false);
    const [baInsertDataCount, setBaInsertDataCount] = useState(0);
    const [selectedRowIndices, setSelectedRowIndices] = useState([]);
    const [barcodeData, setBarcodeData] = useState('');
    const { selectedRowData } = location.state || {};
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [modalCheckOpen, setModalCheckOpen] = useState(false);
    const [modalSpoolCheckOpen, setModalSpoolCheckOpen] = useState(false);
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
    const REACT_APP_SECOND_DOMAIN_CODE = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CODE;
    const [draweropen, setDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };

    useEffect(() => {
        if (selectedRowData) {
            const rowsDataArray = Array.isArray(selectedRowData) ? selectedRowData : [selectedRowData];
            console.log(rowsDataArray);
            shipDetailData(rowsDataArray);
        } else {
            console.log('선택된 행 데이터가 없습니다.');
        }
    }, [selectedRowData]);

    const rowsDataArray = Array.isArray(selectedRowData) ? selectedRowData : [selectedRowData];


    const shipDetailData = (rowsDataArray) => {
        const formData = new FormData();
        rowsDataArray.forEach((row) => {
            formData.append('P_SHIP_ID', row.shiP_ID);
            formData.append('P_SHIP_LINE_NO', row.shiP_LINE_NO);
        })

        const url = `http://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/shipDetail`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('datatatatat', data);
                setShipData(data);
                setShipDataCount(data.length);
            })
            .catch(error => {
                console.error('Error :', error.message);
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


    const [open, setOpen] = useState(false);
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

    const columns = [
        { id: 'num', label: '', minWidth: 170 },
        { id: 'gross_weight', label: '총 중량', minWidth: 170 },
        { id: 'spool', label: '스풀', minWidth: 170 },
        { id: 'net_weight', label: '제품중량', minWidth: 170 },
        { id: 'ship_qty', label: '출하길이', minWidth: 170 },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleRowClick = (index) => {
        if (selectedRowIndices.includes(index)) {
            setSelectedRowIndices(selectedRowIndices.filter(i => i !== index));
        } else {
            setSelectedRowIndices([...selectedRowIndices, index]);
        }
    }


    const handleCancel = () => {
        navigate('/LT_Pda_Ship')
    }

    const handleModalClose = () => {
        setModalCheckOpen(false);
    }


    const handleBarcodeModalClose = () => {
        setModalSpoolCheckOpen(false);
    }


    const handleModalCancel = () => {
        setModalScanOpen(false);
    }


    const onMessage = useCallback((event) => { ReadScan(event) }, []);

    useEffect(() => {
        document.addEventListener("message", onMessage);

        return () => {
            document.removeEventListener("message", onMessage);
        };
    }, []);

    const ReadScan = (event) => {
        const { scannedData, scannedLabelType, type } = JSON.parse(event.data);
        setBarcodeData(scannedData);
        bacoradData(scannedData);

    }

    const bacoradData = (scannedData) => {
        const formData = new FormData();
        rowsDataArray.forEach((row) => {
            formData.append('P_SHIP_ID', row.shiP_ID);
            formData.append('P_SHIP_LINE_NO', row.shiP_LINE_NO);
            formData.append('P_LOT_NO', row.loT_NO);
            formData.append('P_PART_ID', row.parT_ID);
            formData.append('P_CUST_ID', row.cusT_ID);
        })
        formData.append('P_SPOOL_ID', scannedData);
        const url = `http://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/shipBarcode`
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.some(item => item.spooL_ID === 'NO_SPOOL_ID')) {
                    setModalCheckOpen(true);
                } else if(data.some(item => item.spooL_ID === 'EXISTS_SPOOL_ID')){
                    setModalSpoolCheckOpen(true);
                } else {
                    shipDetailData(rowsDataArray);
                    setBaInsertDataCount(data.length);
                }
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
    }   
    const handleShipDataDelete = () => {
        const selectedRowsData = selectedRowIndices.map(index => {
            const { shiP_DETAIL_ID, loT_TRANS_ID } = shipData[index];
            return { shiP_DETAIL_ID, loT_TRANS_ID };
        });
        if (selectedRowsData.length > 0) {
            selectedRowsData.forEach(({ shiP_DETAIL_ID, loT_TRANS_ID }) => {
                const url = `http://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/shipDetailDelete?P_SHIP_DETAIL_ID=${shiP_DETAIL_ID}&P_LOT_TRANS_ID=${loT_TRANS_ID}`;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log('Delete Successful');
                        setSelectedRowIndices([]);
                        shipDetailData(rowsDataArray);

                    })
                    .catch(error => {
                        console.error('Error :', error.message);
                    });
            });
        }
    }

    const handleModalScanOpen = () => {
        setModalScanOpen(true);
    };

    const handleModalScanClose = () => {
        setModalScanOpen(false);
    };

    const handleWorkStart = () => {
        const formData = new FormData();
        const EQUIP_ID = document.getElementById('EQUIP_ID').value;
        formData.append('EQUIP_ID', EQUIP_ID);
        const apiUrl = `http://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_EMP}/equip_login`;
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
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} disabled={selectedRowIndices.length === 0} onClick={handleShipDataDelete}>삭제</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 167, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleCancel}>취소</Button>
                    </div>
                </div>
                <div className={style.bacodeField}>
                    <TextField id="filled-basic" label="Barcode" variant="filled" style={{ width: 340 }} focused value={barcodeData}
                        InputLabelProps={{
                            style: { color: '#0404B4', fontWeight: 'bold' }
                        }}
                    />
                </div>
                <div className={style.textFields}>
                    {rowsDataArray.map((item, index) => (
                        <div key={index}>
                            <div className={style.textField1}>
                                <TextField id="outlined-basic" label="LOT NO" variant="outlined" defaultValue={item.loT_NO} style={{ marginRight: 10 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="규격" variant="outlined" defaultValue={item.parT_NAME}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                            </div>
                            <div className={style.textField1} style={{ marginTop: 10 }}>
                                <TextField id="outlined-basic" label="업체" variant="outlined" defaultValue={item.cusT_NAME} style={{ marginRight: 10 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="제품유형" variant="outlined" defaultValue={item.parT_TYPE} style={{ marginRight: 10 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="스풀길이" variant="outlined" defaultValue={item.wD_SIZE_STD}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                            </div>
                            <div className={style.textField1} style={{ marginTop: 10 }}>
                                <TextField id="outlined-basic" label="주문수량" variant="outlined" defaultValue={item.ordeR_QTY} style={{ marginRight: 10 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="주문개수" variant="outlined" defaultValue={item.shiP_QTY} style={{ marginRight: 10 }}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                                <TextField id="outlined-basic" label="스캔" variant="outlined" value={shipDataCount}
                                    inputProps={{ style: { fontSize: 12, height: 0 }, readOnly: true }} InputLabelProps={{ style: { fontSize: 12 } }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <Paper sx={{ width: '93.7%', marginLeft: 1.5, overflow: 'hidden', marginTop: 1 }}>
                        <TableContainer className={style.tableContainer} sx={{ maxHeight: 222 }}>
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
                                    {shipData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item, index) => {
                                            const isSelected = selectedRowIndices.includes(index);
                                            const style = {
                                                fontSize: 10,
                                                textAlign: 'center',
                                                backgroundColor: isSelected ? '#f0f0f0' : '',
                                            };
                                            return (
                                                <TableRow key={index} style={{ maxWidth: 200, whiteSpace: 'break-spaces' }}>
                                                    <TableCell style={style} onClick={() => handleRowClick(index)}>
                                                        {!barcodeCheck ? shipDataCount - (page * rowsPerPage + index) : baInsertDataCount - (page * rowsPerPage + index)}
                                                    </TableCell>
                                                    <TableCell style={style} onClick={() => handleRowClick(index)}>{item.grosS_WEIGHT}</TableCell>
                                                    <TableCell style={style} onClick={() => handleRowClick(index)}>{item.spooL_ID}</TableCell>
                                                    <TableCell style={style} onClick={() => handleRowClick(index)}>{item.neT_WEIGHT}</TableCell>
                                                    <TableCell style={style} onClick={() => handleRowClick(index)}>{item.shiP_QTY}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={!barcodeCheck ? shipDataCount : baInsertDataCount}
                            rowsPerPage={10}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[]}
                            sx={{ fontSize: '0.8rem' }}
                            labelRowsPerPage=""
                        />
                    </Paper>
                </div>
            </div>
            <Modal
                open={modalCheckOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 220, height: 125 }}>
                    <div className={style.modalText}>
                        <h4 className={style.modalAlime}>알림</h4>
                        <ClearIcon onClick={handleModalClose} style={{ marginRight: -10 }} />
                    </div>
                    <div className={style.modalContent}>
                        <p className={style.scanText}>인수인계 안된 LOT, 스풀 : <br/>{barcodeData}</p>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 260, height: 32, marginLeft: -20, background: 'red', marginTop:10, fontSize: 15 }} onClick={handleModalClose}>닫기</Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalSpoolCheckOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 220, height: 125 }}>
                    <div className={style.modalText}>
                        <h4 className={style.modalAlime}>알림</h4>
                        <ClearIcon onClick={handleBarcodeModalClose} style={{ marginRight: -10 }} />
                    </div>
                    <div className={style.modalContent}>
                        <p className={style.scanText}>이미 존재하는 스풀입니다.<br/>{barcodeData}</p>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 260, height: 32, marginLeft: -20, background: 'red', marginTop:10, fontSize: 15 }} onClick={handleBarcodeModalClose}>닫기</Button>
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
export default LT_Pda_Ship_Insert;