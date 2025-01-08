import { React, useState, useCallback, useEffect } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CropFreeIcon from '@mui/icons-material/CropFree';
import style from './LT_Pda_Ship_Insert.module.css';

const ModalScan = ({ modalScanOpen, handleModalScanClose, handleWorkStart }) => {
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
        pt: 2,
        px: 4,
        pb: 3,
    };

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
        <Modal
            open={modalScanOpen}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...m_style, width: 220, height: 250 }}>
                <div className={style.modalText}>
                    <h4 className={style.modalAlime1}>열처리 설비 변경</h4>
                    <ClearIcon onClick={handleModalScanClose} style={{ marginTop: 10 }} />
                </div>
                <div className={style.modalContent1}>
                    <p className={style.scanText}>열처리 장비를 스캔하세요</p>
                    <div className={style.icon_container2}>
                        <CropFreeIcon style={{ width: 80, height: 30, fontSize: 70 }} />
                    </div>
                    {/* <TextField id="EQUIP_ID" label="설비ID" variant="outlined" focused margin="normal" style={{ width: 180 }} value={barcodeData}
                        inputProps={{ style: { fontSize: 12, height: 5 }, readOnly : true }}
                    /> */}
                    <TextField id="EQUIP_ID" label="설비ID" variant="outlined" focused margin="normal" style={{ width: 180 }} onChange={handleBarcode}
                        inputProps={{ style: { fontSize: 12, height: 5 } }}
                        />
                </div>
                <div className={style.selectDateBtn}>
                    <Button variant="contained" onClick={handleWorkStart} style={{ marginLeft: 20, marginTop: 5, width: 180, background: '#0404B4' }}>작업시작</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalScan;