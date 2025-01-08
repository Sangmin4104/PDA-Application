import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './LT_Pda_Ship_AN_Borbin.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DrawerModal from './DrawerModal';
import ModalScan from './ModalScan';
import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ClearIcon from '@mui/icons-material/Clear';
import CropFreeIcon from '@mui/icons-material/CropFree';
import moment from 'moment';
import BuildIcon from '@mui/icons-material/Build';

export const LT_Pda_Ship_AN = () => {
    const REACT_APP_PROTOCOL = import.meta.env.VITE_REACT_APP_PROTOCOL;
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const [open, setOpen] = useState(false);
    const [modalDateOpen, setModalDateOpen] = useState(false);
    const [modalBorbinCheckOpen, setModalBorbinCheckOpen] = useState(false);
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
    const REACT_APP_SECOND_DOMAIN_CODE = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_CODE;
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [modalScanningOpen, setModalScanningOpen] = useState(false);
    const [draweropen, setDrawerOpen] = useState(false);
    const [HborbinText, setHBorbinText] = useState('스캔');
    const [GborbinText, setGBorbinText] = useState('스캔');
    const [barcodeData, setBarcodeData] = useState('');
    const [currentBorbin, setCurrentBorbin] = useState(null);
    const [barcodeData1, setBarcodeData1] = useState('');
    const [hBorbinLotId, setHBorbinLotId] = useState('');
    const [gBorbinLotId, setGBorbinLotId] = useState('');
    const [partId, setPartId] = useState('');
    const [custId, setCustId] = useState('');
    const [workTicket, setWorkTicket] = useState('');
    const [workDate, setWorkDate] = useState('');
    const [lotNO, setLotNO] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const equipId = location.state?.equipId;
    const equipName = location.state?.nameData;
    const hBorbin = location.state?.hBorbin;
    const gBorbin = location.state?.gBorbin;

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

    const handleBarcode = (event) => {
        setBarcodeData1(event.target.value);
    }

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

    const handleModalBorbinCheckClose = () => {
        setBarcodeData1('');
        setModalBorbinCheckOpen(false);
    }

    useEffect(() => {
        equipFetchData(equipId);
    }, []);

    const equipFetchData = (equipId) => {
        const getUrl = `${REACT_APP_PROTOCOL}://dabom.acs.co.kr:8686/service.asmx/GetValuesFilterFormattedByJSON`;
        fetch(getUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pCommId: equipId, pCurEQ: 'Y', pEvMode: 'E' }),
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
                setWorkTicket(workTicket);

                const workDateMatch = rawData.match(/WORK_DATE;([^|]+)/);
                const workDate = workDateMatch ? workDateMatch[1] : '';
                const Date = moment().format('YYYY-MM-DD');
                setWorkDate(Date);
                console.log('Date :', Date);

                const PIDMatch = rawData.match(/PID;([^|]+)/);
                const PID = PIDMatch ? PIDMatch[1] : '';
                setPartId(PID);

                const LOTMatch = rawData.match(/LOT;([^|]+)/);
                const LOT = LOTMatch ? LOTMatch[1] : '';
                setLotNO(LOT);

                const WIDMatch = rawData.match(/WID;([^|]+)/);
                const WID = WIDMatch ? WIDMatch[1] : '';

                const FDMatch = rawData.match(/FD;([^|]+)/);
                const FD = FDMatch ? FDMatch[1] : '';
                setCustId(FD);

                const PNMMatch = rawData.match(/PNM;([^|]+)/);
                const PNM = PNMMatch ? PNMMatch[1] : '';

                const PLQMatch = rawData.match(/PLQ;([^|]+)/);
                const PLQ = PLQMatch ? PLQMatch[1] : '';

                const PTEMatch = rawData.match(/PTE;([^|]+)/);
                const PTE = PTEMatch ? PTEMatch[1] : '';

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

                const UI1Match = rawData.match(/UI1;([^|]+)/);
                const UI1 = UI1Match ? UI1Match[1] : '';

                const UI2Match = rawData.match(/UI2;([^|]+)/);
                const UI2 = UI2Match ? UI2Match[1] : '';

                const UI3Match = rawData.match(/UI3;([^|]+)/);
                const UI3 = UI3Match ? UI3Match[1] : '';

                let wIdMatch = rawData.match(/WID;([^|]+)/);
                let widValue = wIdMatch ? wIdMatch[1] : '';

            })
            .catch(error => {
                console.error('Error :', error.message);
                console.log(error);
            });
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
                    navigate('/LT_Pda_Ship_AN', { state: { equipId: equipId, nameData: equipName } });
                } else {
                    alert('일치하는 설비가 없습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('네트워크 오류 발생');
            });
    }

    const handleModalDateClose = () => {
        setModalDateOpen(false);
        navigate('/LT_Pda_Ship_AN', { state: { equipId: equipId, nameData: equipName } })
    };

    const handleLogout = () => {
        setOpen(false);
        navigate('/');
    }
    // console.log('hBorbin', hBorbin, 'HborbinText', HborbinText, 'gBorbin', gBorbin, 'GborbinText', GborbinText);
    const handleClick = () => {
        console.log('hborbinText ::', HborbinText);
        if(HborbinText === '스캔' || GborbinText === '스캔'){
            setModalBorbinCheckOpen(true);
        }else{
        const url1 = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/spoolCheck`;
        const url2 = `${REACT_APP_PROTOCOL}://dabom.acs.co.kr:8686/service.asmx/SetValueArrayListFormattedByJSON`;
        const url3 = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/Lot_Prod_Manual_STD`;
        const url4 = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/Lot_Prod_Spool_Complite`;

        const formData = new FormData();
            formData.append('PART_ID', partId);
            formData.append('CUST_ID', custId);
            formData.append('SPOOL_ID', HborbinText);
            formData.append('LOAD_TYPE', 'I');
            formData.append('EQUIP_ID', equipId);
            formData.append('WORK_TICKET_ID', workTicket);

        const fetch1 = fetch(url1, {
            method: 'POST',
            body: formData,
        })

        let fetch2 = null;
        let fetch3 = null;
        console.log('hBorbin', hBorbin, 'HborbinText', HborbinText, 'gBorbin', gBorbin, 'GborbinText', GborbinText);
        const formData1 = new FormData();
        const formData2 = new FormData();

        formData1.append('P_LOAD_TYPE', 'P');
        formData1.append('P_LOT_TRANS_ID', 0);
        formData1.append('P_SPOOL_ID', gBorbin);
        formData1.append('P_WORK_TICKET_ID', workTicket);
        formData1.append('P_PART_ID', partId);
        formData1.append('P_WORK_DATE', workDate);
        formData1.append('P_EQUIP_ID', equipId);
        formData1.append('P_LOT_NO', lotNO);
        formData1.append('P_START_DTTM', 'undefined');
        formData1.append('P_END_DTTM', 'undefined');
        formData1.append('P_TIME_ID', 'undefined');
        formData1.append('P_CUST_ID', custId);

        formData2.append('P_LOT_TRANS_ID', 0);
        formData2.append('P_EQUIP_ID', equipId);

        if (hBorbin == HborbinText) {
            fetch2 = fetch(url3, {
                method: 'POST',
                body: formData1,
            });
        } else if (hBorbin != '' && hBorbin != HborbinText) { 
            fetch2 = fetch(url3, {
                method: 'POST',
                body: formData1,
            });

            fetch3 = fetch(url4, {
                method: 'POST',
                body: formData2,
            });
        }

        let data = [
            {
                VarID: "SPI",
                Value: HborbinText
            },
            {
                VarID: "SPO",
                Value: GborbinText
            },
            {
                VarId: "LTI",
                Value: hBorbinLotId
            }
        ]
        const fetch4 = fetch(url2, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pCommId: equipId, variableItems: data })
        }).then(data => {
            console.log('data1 :', data);
        })

        Promise.all([fetch1, fetch2, fetch3, fetch4])
            .then(response => {
                console.log(response);
            })
            .then(data => {
                console.log('data : ', data);
                setModalDateOpen(true);
            })
            .catch(error => {
                console.error('Error :', error.message);
            });
        }
    }

    const columns = [
        { id: 'lotNo', label: 'Lot No', minWidth: 170 },
        { id: 'custName', label: '업체명', minWidth: 200 },
        { id: 'orderQTY', label: '주문수량', minWidth: 170 },
        { id: 'partTypeName', label: '제품유형', minWidth: 170 },
        { id: 'wdSizeRep', label: '규격', minWidth: 170 }
    ];

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleBorbinCancel = () => {
        navigate('/LT_Pda_Ship_AN', { state: { equipId: equipId, nameData: equipName } });
    }

    const handleClearChange = () => {
        setHBorbinText('CLEAR');
        setGBorbinText('CLEAR');
    }

    const onMessage = useCallback((event) => { ReadScan(event) }, []);

    useEffect(() => {
        document.addEventListener("message", onMessage);

        return () => {
            document.removeEventListener("message", onMessage);
        };
    }, []);

    const ReadScan = (event) => {
        const { scannedData } = JSON.parse(event.data);
        setBarcodeData(scannedData);
    }

    const handleModalScanningOpen = (borbin) => () => {
        setCurrentBorbin(borbin);
        setModalScanningOpen(true);
    }

    const handleModalScanningClose = () => {
        setModalScanningOpen(false);
        setBarcodeData('');
    }

    const handleBorbinInsert = () => {
        if (currentBorbin === 'H') {
            const url = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_EMP}/spoolCheck`;
            const formData1 = new FormData();
            formData1.append('SPOOL_ID', barcodeData);
            fetch(url, {
                method: 'POST',
                body: formData1,
            }).then(response => response.json())
            .then(data => {
                if(data.status == 'failure'){
                    setModalBorbinCheckOpen(true);
                    setBarcodeData('');
                }else{
                    setHBorbinText(barcodeData);
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('네트워크 오류 발생');
            });
            
            // setHBorbinText(barcodeData1);
            const apiUrl = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/shipLotTransId`;
            const formData = new FormData();
            // formData.append('SPOOL_ID', barcodeData);
            formData.append('SPOOL_ID', barcodeData);
            formData.append('EQUIP_ID', equipId);
            fetch(apiUrl, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    setModalScanningOpen(false);
                    setBarcodeData('');
                    setHBorbinLotId(data.lotTransId);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('네트워크 오류 발생');
                });
        } else if (currentBorbin === 'G') {
            if (barcodeData == HborbinText) {
                setModalBorbinCheckOpen(true);
            } else {
                setGBorbinText(barcodeData);
                // setGBorbinText(barcodeData1);
                const apiUrl = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_CODE}/shipLotTransId`;
                const formData = new FormData();
                formData.append('SPOOL_ID', barcodeData);
                // formData.append('SPOOL_ID', barcodeData1);
                formData.append('EQUIP_ID', equipId);
                fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                    .then(data => {
                        setModalScanningOpen(false);
                        setBarcodeData('');
                        setGBorbinLotId(data.lotTransId);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('네트워크 오류 발생');
                    });
            }
        }

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
                <div>
                    <div className={style.headerContainer}>
                        <h2>보빈 확인 / 교체</h2>
                    </div>
                    <div className={style.middleContainer}>
                        <div>
                            <Button variant="contained" style={{ width: 140, height: 60, marginLeft: -15, background: '#0404B4', marginRight: 60, fontSize: 20 }}>단선</Button>
                        </div>
                        <div>
                            <Checkbox {...label} defaultChecked sx={{ color: pink[800], '& .MuiSvgIcon-root': { color: pink[600], fontSize: 28, marginTop: 0.5, marginLeft: -5 } }} />
                        </div>
                        <div className={style.borbinOk}>
                            <h3>해선보빈완료</h3>
                        </div>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.contentContainer1}>
                        <div>
                            <div className={style.headerBody1}>
                                <h3 className={style.heText2}>현재</h3>
                            </div>
                            <h3 className={style.heText1}>해선 보빈</h3>
                            <TextField style={{ width: 120 }} value={hBorbin ? hBorbin : ''}
                                inputProps={{ style: { fontSize: 18, textAlign: 'center', color: '#0404B4' }, readOnly: true }} />
                            <DoubleArrowIcon style={{ marginTop: 10, fontSize: 50, transform: 'rotate(90deg)' }} />
                            <h3 className={style.heText1}>권선 보빈</h3>
                            <TextField style={{ marginTop: -10, width: 120 }} value={gBorbin ? gBorbin : ''}
                                inputProps={{ style: { fontSize: 18, textAlign: 'center', color: '#0404B4' }, readOnly: true }} />
                        </div>
                    </div>
                    <div>
                        <ReplyAllIcon style={{ fontSize: 40, marginLeft: -20, marginTop: 160, transform: 'scaleX(-1)' }} />
                    </div>
                    <div className={style.contentContainer2}>
                        <div>
                            <div className={style.headerBody2}>
                                <h3 className={style.heText2}>교체</h3>
                            </div>
                            <h3 className={style.heText2}>해선 보빈</h3>
                                <TextField id='HBorbin' style={{ width: 120, textAlign: 'center' }} value={HborbinText}
                                inputProps={{ style: { fontSize: 18, textAlign: 'center', color: '#0404B4' }, readOnly: true }} onClick={handleModalScanningOpen('H')} />
                            <DoubleArrowIcon style={{ marginTop: 10, fontSize: 50, transform: 'rotate(90deg)' }} />
                            <h3 className={style.heText2}>권선 보빈</h3>
                            <TextField id='GBorbin' style={{ marginTop: -10, width: 120 }} value={GborbinText}
                                inputProps={{ style: { fontSize: 18, textAlign: 'center', color: '#0404B4' }, readOnly: true }} onClick={handleModalScanningOpen('G')} />
                        </div>
                    </div>
                </div>
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 110, height: 70, background: '#2E9AFE', marginTop: 10, marginLeft: 10, fontSize: 20 }} onClick={handleClick}>저장</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 110, height: 70, background: '#0404B4', marginTop: 10, marginLeft: 5, marginRight: 5, fontSize: 20 }} onClick={handleClearChange}>CLEAR</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 110, height: 70, background: 'red', marginTop: 10, marginRight: 10, fontSize: 20 }} onClick={handleBorbinCancel}>취소</Button>
                    </div>
                </div>
            </div>
            <Modal
                open={modalDateOpen}
                onClose={handleModalDateClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    <h2 className={style.selectDateIcon}><BuildIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        보빈이 변경되었습니다.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalDateClose}>확인</Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalBorbinCheckOpen}
                onClose={handleModalBorbinCheckClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 240, height: 200 }}>
                    <h2 className={style.selectDateIcon}><BuildIcon style={{ fontSize: 60, marginTop: 60 }} /></h2>
                    <p id="child-modal-description" className={style.selectDateText}>
                        보빈을 다시 스캔해주세요.
                    </p>
                    <div className={style.selectDateBtn}>
                        <Button onClick={handleModalBorbinCheckClose}>확인</Button>
                    </div>
                </Box>
            </Modal>
            <ModalScan
                modalScanOpen={modalScanOpen}
                handleModalScanClose={handleModalScanClose}
                handleWorkStart={handleWorkStart}
            />

            <Modal
                open={modalScanningOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 220, height: 250 }}>
                    <div className={style.modalText}>
                        <h4 className={style.modalAlime1}>보빈 변경</h4>
                        <ClearIcon onClick={handleModalScanningClose} style={{ marginTop: 10 }} />
                    </div>
                    <div className={style.modalContent1}>
                        <p className={style.scanText}>보빈을 스캔하세요</p>
                        <div className={style.icon_container2}>
                            <CropFreeIcon style={{ width: 80, height: 30, fontSize: 70 }} />
                        </div>
                        <TextField id="EQUIP_ID" label="설비ID" variant="outlined" focused margin="normal" style={{ width: 180 }} value={barcodeData}
                            inputProps={{ style: { fontSize: 12, height: 5 }, readOnly: true }}
                        />
                        {/* <TextField id="EQUIP_ID" label="보빈ID" variant="outlined" focused margin="normal" style={{ width: 180 }} onChange={handleBarcode}
                            inputProps={{ style: { fontSize: 12, height: 5 } }}
                        /> */}
                    </div>
                    <div className={style.selectDateBtn}>
                        <Button variant="contained" onClick={handleBorbinInsert} style={{ marginLeft: -160, marginTop: 5, width: 180, background: '#0404B4' }}>등록</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default LT_Pda_Ship_AN;