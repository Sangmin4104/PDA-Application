import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import style from './LT_Login.module.css';
import LOGO from '../img/logo.gif';
import BusinessIcon from '@mui/icons-material/Business';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ModalScan from './ModalScan';


export const LT_Login = () => {
    const [selection, setSelection] = useState('');
    const navigate = useNavigate();
    const REACT_APP_PROTOCOL = import.meta.env.VITE_PROTOCOL;
    const REACT_APP_ADDRESS = import.meta.env.VITE_REACT_APP_ADDRESS;
    const REACT_APP_PORT = import.meta.env.VITE_REACT_APP_PORT;
    const REACT_APP_FIRST_DOMAIN = import.meta.env.VITE_REACT_APP_FIRST_DOMAIN;
    const REACT_APP_SECOND_DOMAIN_EMP = import.meta.env.VITE_REACT_APP_SECOND_DOMAIN_EMP;
    const [modalScanOpen, setModalScanOpen] = useState(false);
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [equidValue, setEquidValue] = useState('');
    const [barcodeData, setBarcodeData] = useState('');
    const [barcodeData1, setBarcodeData1] = useState('');

    const m_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleChange = (e) => {
        setSelection(e.target.value);
    };



    const LoginClick = () => {
        const LT_ITEM = selection;
        const LT_USER = document.getElementById('LT_USER').value;
        const LT_PW = document.getElementById('LT_PW').value;
        const apiUrl = `${REACT_APP_PROTOCOL}://${REACT_APP_ADDRESS}:${REACT_APP_PORT}/${REACT_APP_FIRST_DOMAIN}/${REACT_APP_SECOND_DOMAIN_EMP}/login`;
        if (!LT_ITEM) {
            alert('구분 입력해주세요');
        } else if (!LT_USER) {
            alert('사용자를 입력해주세요');
        } else if (!LT_PW) {
            alert('암호를 입력해주세요');
        } else {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ LT_USER, LT_PW }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 'success' && LT_ITEM === 'ship_insert') {
                        const str = `{"ITEM": "${LT_ITEM}", "USER": "${LT_USER}", "PW": "${LT_PW}"}`
                        const obj = JSON.parse(str);
                        console.log('obj :', obj.ITEM);
                        const str1 = JSON.stringify(obj);
                        console.log('str1 :', str1);

                        //navigate('/LT_Pda_Ship');
                    } else if (data.status === 'success' && LT_ITEM === 'ship_RFID') {
                        navigate('/LT_Pda_Ship_RFID')
                    } else if (data.status === 'success' && LT_ITEM === 'an') {
                        handleModalScanOpen();
                    } else {
                        handleModalLoginOpen();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('네트워크 오류 발생');
                });
        }
    }

    const handleModalScanOpen = () => {
        setModalScanOpen(true);
    };

    const handleModalScanClose = () => {
        setBarcodeData('');
        setModalScanOpen(false);
    };

    const handleModalLoginOpen = () => {
        setModalLoginOpen(true);
    };

    const handleModalLoginClose = () => {
        setModalLoginOpen(false);
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
                    const equipId = data.equipId;
                    navigate('/LT_Pda_Ship_AN', { state: {equipId : equipId, nameData : equipName}});
                } else {
                    alert('일치하는 설비가 없습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('네트워크 오류 발생');
            });
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
    }

    const handleBarcode = (event) => {
        setBarcodeData1(event.target.value);
    }


    return (
        <>
            <div className={style.container}>
                <div>
                    <img src={LOGO} className={style.logo} alt="Logo" />
                </div>
                <div className={style.loginText}>
                    <div className={style.icon_t_container}>
                        <LockOpenIcon style={{ fontSize: 35 }} />
                    </div>
                    <p className={style.LText}>로그인</p>
                </div>
                <div>
                    <div className={style.form_row}>
                        <div className={style.icon_container}>
                            <BusinessIcon style={{ fontSize: 35 }} />
                        </div>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="select-label">구분</InputLabel>
                            <Select
                                labelId="select-label"
                                id="LT_ITEM"
                                value={selection}
                                label="구분"
                                onChange={handleChange}
                            >
                                <MenuItem value="an">열처리</MenuItem>
                                <MenuItem value="ship_RFID">출하 RFID</MenuItem>
                                <MenuItem value="ship_insert">출하 등록</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={style.form_row}>
                        <div className={style.icon_container}>
                            <PersonIcon style={{ fontSize: 35 }} />
                        </div>
                        <TextField id="LT_USER" label="사용자" variant="outlined" fullWidth margin="normal" />
                    </div>
                    <div className={style.form_row}>
                        <div className={style.icon_container}>
                            <VpnKeyIcon style={{ fontSize: 35 }} />
                        </div>
                        <TextField type='password' id="LT_PW" label="암호" variant="outlined" fullWidth margin="normal" />
                    </div>
                </div>
                <div className={style.btn}>
                    <div>
                        <Button variant="contained" style={{ width: 290, height: 40 }} onClick={LoginClick}>로그인</Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ width: 290, height: 40, marginTop: 10, background: 'red' }}>종료</Button>
                    </div>
                </div>
            </div>
            <ModalScan
                modalScanOpen={modalScanOpen}
                handleModalScanClose={handleModalScanClose}
                handleWorkStart={handleWorkStart}
            />
            <Modal
                open={modalLoginOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...m_style, width: 220, height: 150 }}>
                    <div className={style.modalText}>
                        <h4 className={style.modalAlime}></h4>
                        <ClearIcon onClick={handleModalLoginClose} style={{ marginRight:-20 }} />
                    </div>
                    <div className={style.modalContent}>
                        <ErrorIcon style={{fontSize:50, marginTop:-20, color:'red'}}/>
                        <p className={style.scanText}>아이디 또는 비밀번호가 <br/> 일치하지 않습니다.</p>
                    </div>
                    <div className={style.selectDateBtn}>
                        <Button variant="contained" onClick={handleModalLoginClose} style={{ marginLeft:-15, marginTop:-5, width: 250, background: 'red' }}>확인</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
export default LT_Login;
