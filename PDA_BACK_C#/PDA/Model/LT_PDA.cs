namespace LT_MATAL_APP
{
    public class LT_PDA
    {
        public string EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
        public string PW { get; set; }
    }

    public class TB_CODE
    {
        public string VALUE2 { get; set; }
    }

    public class TB_EQUIP
    {
        public string EQUIP_ID { get; set; }
    }

    public class TB_EQUIP_VALUES
    {
        public string EQUIP_ID { get; set; }
        public string EQUIP_NAME { get; set; }
    }

    public class TB_USER_SEARCH
    {
        public string EMP_ID { get; set; }
        public string EMP_NAME { get; set; }
    }
    public class TB_CUST
    { 
        public string CUST_ID { get; set; }
        public string CUST_NAME { get; set;}
        public string PART_SECT_ID { get; set;}
    }
    public class TB_WORK_TICKET
    {
        public string LOT_NO { get; set; }
        public string CUST_NAME { get; set; }
        public string WORK_TICKET_ID { get; set; }
        public int WORK_ORDER_ID { get; set; }
        public string WORK_ORDER_NAME { get; set; }
        public string PART_ID { get; set; }
        public string PART_TYPE { get; set; }
        public string PART_TYPE_NAME { get; set; }
        public string PART_NAME { get; set; }
        public decimal ORDER_QTY { get; set; }
        public decimal SHIP_QTY { get; set; }
        public string PART_SECT_ID { get; set; }
        public string SHIP_ID { get; set; }
        public string SHIP_LINE_NO { get; set; }
        public string CUST_ID { get; set; }
        public decimal WD_SIZE_STD { get; set; }
        public string SHIP_DATE { get; set; }
    }

    public class TB_WORK_TICKET_VALUE
    {
        public string P_WORK_DATE { get; set; }
        public string P_LINE_GUBN { get; set; }
        public string P_CUST_NAME { get; set; }
    }

    public class TB_SHIP_DETAIL
    {
        public string SPOOL_ID { get; set; }
        public string SHIP_DETAIL_ID { get; set; }
        public string LOT_TRANS_ID { get; set; }
        public decimal GROSS_WEIGHT {  get; set; }
        public decimal NET_WEIGHT { get; set; }
        public decimal SHIP_QTY { get; set; }
        public string SHIP_ID { get; set; }
        public int SHIP_LINE_NO { get; set; }

    }

    public class TB_SHIP_DETAIL_VALUE
    {
        public int P_SHIP_ID { get; set; }
        public int P_SHIP_LINE_NO { get; set; }
    }

    public class TB_SHIP_BARCODE_VALUE
    {
        public int P_SHIP_ID { get; set; }
        public int P_SHIP_LINE_NO { get; set; }
        public string P_LOT_NO { get; set; }
        public string P_PART_ID { get; set; }
        public string P_CUST_ID { get; set; }
        public string P_SPOOL_ID { get; set; }
    }

    public class TB_SHIP_DETAIL_DELETE
    {
        public int P_SHIP_ID { get; set; }
        public int P_SHIP_LINE_NO { get; set; }
        public int P_LOT_TRANS_ID { get; set; }
    }

    public class TB_CUSTOMER
    {
        public string CUST_ID { get; set; }
        public string CUST_NAME { get; set; }
    }
    public class TB_CUST_RFID
    {
        public string P_SHIP_DATE { get; set; }
        public string P_CUST_NAME { get; set; }
    }
    public class TB_WORK_TICKET_RFID
    {
        public string SHIP_ID { get; set; }
        public string LOT_NO { get; set; }
        public string SHIP_LINE_NO { get; set; }
        public string WORK_ORDER_NAME { get; set; }
        public string CUST_ID { get; set; }
        public string CUST_NAME { get; set; }
        public string PART_ID { get; set; }
        public string PART_TYPE { get; set; }
        public string WD_SIZE_REP { get; set; }
        public string PART_NAME { get; set; }
        public string SHIP_DATE { get; set; }
        public decimal ORDER_QTY { get; set; }
        public decimal SHIP_QTY { get; set; }
    }

    public class TB_WORK_TICKET_FINISH_VALUE
    {
        public string P_USER_ID { get; set; }
        public string P_CREATE_TYPE { get; set; }
        public int P_WORK_TICKET_ID { get; set; }
    }

    public class TB_SPOOL_VALUE
    {
        public string PART_ID { get; set;}
        public string CUST_ID { get; set;}
        public string SPOOL_ID { get; set; }
        public string LOAD_TYPE { get; set; }
        public string EQUIP_ID { get; set; }
        public string WORK_TICKET_ID { get; set; }
    }

    public class TB_SPOOL_VALUES
    {
        public int LOT_TRANS_ID { get; set;}
    }

    public class TB_SPOOL
    {
        public string SPOOL_ID { get; set; }
    }

    public class GBORBIN_VALUE
    {
        public string P_LOAD_TYPE { get; set;}
        public int P_LOT_TRANS_ID { get; set; }
        public string P_SPOOL_ID { get; set; }
        public string P_WORK_TICKET_ID { get; set; }
        public string P_PART_ID { get; set; }
        public string P_WORK_DATE { get; set; }
        public string P_EQUIP_ID { get; set; }
        public string P_LOT_NO { get; set; }
        public string P_START_DTTM { get; set; }
        public string P_END_DTTM { get; set; }
        public string P_TIME_ID { get; set; }
        public string P_CUST_ID { get; set; }
    }

    public class SPOOL_COMPLITE
    {
        public int P_LOT_TRANS_ID { get; set; }
        public string P_EQUIP_ID { get; set; }
    }
}
