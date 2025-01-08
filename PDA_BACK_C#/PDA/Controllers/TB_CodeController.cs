using LT_MATAL_APP.Model;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.AspNetCore.Cors;

namespace LT_MATAL_APP.Controllers
{
    [EnableCors("AllowMobileApp")]
    [ApiController]
    [Route("api/[Controller]")]
    public class TB_CodeController : Controller
    {
        private readonly LT_PDAContext _context;
        private readonly IConfiguration _configuration;

        public TB_CodeController(LT_PDAContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<TB_CODE> GetTBCode()
        {
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            string sql = "SELECT VALUE2 FROM TB_CODE WHERE GROUP_ID = 'LINE_GUBN'";
            return db.Query<TB_CODE>(sql).ToList();
        }

        [HttpPost("codeValue")]
        public IActionResult CodeValue([FromBody] string codeValue)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            var parameters = new { @P_LINE_GUBN = codeValue };
            string query = "EXEC SM_HAN_CUST_NAME_TEST @P_LINE_GUBN";
            IEnumerable<TB_CUST> result = db.Query<TB_CUST>(query, parameters);

            // 결과 반환
            return Ok(result);
        }

        [HttpPost("workTicket")]
        public IActionResult WorkTicket([FromForm] TB_WORK_TICKET_VALUE value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            if (value.P_CUST_NAME == "undefined" || value.P_CUST_NAME == null)
            {
                value.P_CUST_NAME = "";
            }
            var parameters = new { @P_WORK_DATE = value.P_WORK_DATE, @P_LINE_GUBN = value.P_LINE_GUBN, @P_CUST_NAME = value.P_CUST_NAME };
            string query = "EXEC SM_HAN_WOKR_TICKET_PDA_L_TEST @P_WORK_DATE, @P_LINE_GUBN, @P_CUST_NAME";
            IEnumerable<TB_WORK_TICKET> result = db.Query<TB_WORK_TICKET>(query, parameters).ToList();

            // 결과 반환
            return Ok(result);
        }

        [HttpPost("workTicketFinish")]
        public IActionResult WorkTicketFinish([FromForm] TB_WORK_TICKET_FINISH_VALUE value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            if (value.P_USER_ID == "undefined" || value.P_USER_ID == null)
            {
                value.P_USER_ID = "";
            }
            var parameters = new { @P_USER_ID = value.P_USER_ID, @P_CREATE_TYPE = value.P_CREATE_TYPE, @P_WORK_TICKET_ID = value.P_WORK_TICKET_ID };
            string query = "EXEC EIF010_WO_PROC_START_END_STD_S @P_USER_ID, @P_CREATE_TYPE, @P_WORK_TICKET_ID";
            db.Execute(query, parameters);

            // 결과 반환
            return Ok(new { message = "Finish Success" });
        }

        [HttpPost("spoolCheck")]
        public IActionResult SpoolLotTransId([FromForm] TB_SPOOL_VALUE value)
        {
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new { @P_PART_ID = value.PART_ID, @P_CUST_ID = value.CUST_ID, @P_SPOOL_ID = value.SPOOL_ID, @p_LOAD_TYPE = value.LOAD_TYPE, @P_EQUIP_ID = value.EQUIP_ID, @p_WORK_TICKET_ID = value.WORK_TICKET_ID };
            string query = "EXEC TPA160_SPOOL_ID_CHK_L @@P_PART_ID, @@P_CUST_ID, @P_SPOOL_ID, @p_LOAD_TYPE, @P_EQUIP_ID, @p_WORK_TICKET_ID";
            return Ok(new { status = "success" });

        }

        [HttpPost("shipDetail")]
        public IActionResult ShipDetail([FromForm] TB_SHIP_DETAIL_VALUE value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            var parameters = new { @P_SHIP_ID = value.P_SHIP_ID, @P_LINE_NO = value.P_SHIP_LINE_NO };
            string query = "EXEC SM_HAN_SHIP_ORDER_DETAIL_L @P_SHIP_ID, @P_LINE_NO";
            IEnumerable<TB_SHIP_DETAIL> result = db.Query<TB_SHIP_DETAIL>(query, parameters).ToList();

            // 결과 반환
            return Ok(result);
        }

        [HttpPost("shipBarcode")]
        public IActionResult ShipBarcode([FromForm] TB_SHIP_BARCODE_VALUE value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            var parameters = new { @P_SHIP_ID = value.P_SHIP_ID, @P_LINE_NO = value.P_SHIP_LINE_NO, @P_LOT_NO = value.P_LOT_NO, @P_PART_ID = value.P_PART_ID, @P_CUST_ID = value.P_CUST_ID, @P_SPOOL_ID = value.P_SPOOL_ID };
            string query = "EXEC SM_HAN_SHIP_ORDER_DETAIL_S @P_SHIP_ID, @P_LINE_NO, @P_LOT_NO, @P_PART_ID, @P_CUST_ID, @P_SPOOL_ID ";
            IEnumerable<TB_SHIP_DETAIL> result = db.Query<TB_SHIP_DETAIL>(query, parameters).ToList();

            // 결과 반환
            return Ok(result);
        }

        [HttpDelete("shipDetailDelete")]
        public IActionResult ShipDetailDelete([FromQuery] string P_SHIP_DETAIL_ID, [FromQuery] int P_LOT_TRANS_ID)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            var parameters = new { @P_SHIP_DETATIL_ID = P_SHIP_DETAIL_ID, @P_LOT_TRANS_ID = P_LOT_TRANS_ID };
            string query = "EXEC SM_HAN_SHIP_ORDER_DETAIL_D @P_SHIP_DETATIL_ID, @P_LOT_TRANS_ID";
            db.Execute(query, parameters);

            // 결과 반환
            return Ok(new { message = "Delete Success" });
        }

        [HttpPost("shipLotTransId")]
        public IActionResult lotTransId([FromForm] TB_SPOOL value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            var parameters = new {P_SPOOL_ID = value.SPOOL_ID };
            string query = "SELECT LOT_TRANS_ID FROM TB_SPOOL WHERE SPOOL_ID = @P_SPOOL_ID";
            var result = db.QueryFirstOrDefault<TB_SPOOL_VALUES>(query, parameters);

            if(result != null)
            {
                return Ok(new { message = "Data Success", lotTransId = result.LOT_TRANS_ID });
            }
            else
            {
                return BadRequest(new { status = "fail" });
            }
            
            
        }

        [HttpPost("Lot_Prod_Spool_Complite")]
        public IActionResult LOTProdManual([FromForm] SPOOL_COMPLITE value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            
            // 프로시저 호출
            var parameters = new { @P_LOT_TRANS_ID = value.P_LOT_TRANS_ID, @P_EQUIP_ID = value.P_EQUIP_ID };
            string query = "EXEC TPA171_LOT_PROD_SPOOL_COMPLITE @P_LOT_TRANS_ID, @P_EQUIP_ID";
            var result = db.Execute(query, parameters);

            if(result == 1)
            {
                return Ok(new { message = "Success" });
            }
            else
            {
                return BadRequest(new { status = "fail" });
            }
            // 결과 반환
            
        }

        [HttpPost("Lot_Prod_Manual_STD")]
        public IActionResult LOTProdSpool([FromForm] GBORBIN_VALUE value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            if (value.P_TIME_ID == "undefined")
            {
                value.P_TIME_ID = "";
            }
            if (value.P_START_DTTM == "undefined")
            {
                value.P_START_DTTM = "";
            }
            if (value.P_END_DTTM == "undefined")
            {
                value.P_END_DTTM = "";
            }
            // 프로시저 호출
            var parameters = new { @P_LOAD_TYPE = value.P_LOAD_TYPE, @P_LOT_TRANS_ID = value.P_LOT_TRANS_ID, @P_SPOOL_ID = value.P_SPOOL_ID, @P_WORK_TICKET_ID = value.P_WORK_TICKET_ID, @P_PART_ID = value.P_PART_ID, @P_WORK_DATE = value.P_WORK_DATE, @P_EQUIP_ID = value.P_EQUIP_ID, @P_LOT_NO = value.P_LOT_NO, @P_START_DTTM = value.P_START_DTTM, @P_END_DTTM = value.P_END_DTTM, @P_TIME_ID = value.P_TIME_ID, @P_CUST_ID = value.P_CUST_ID };
            string query = "EXEC TPA170_LOT_PROD_MANUAL_STD_S @P_LOAD_TYPE, @P_LOT_TRANS_ID, @P_SPOOL_ID, @P_WORK_TICKET_ID, @P_PART_ID, @P_WORK_DATE, @P_EQUIP_ID, @P_LOT_NO, @P_START_DTTM, @P_END_DTTM, @P_TIME_ID, @P_CUST_ID = @P_CUST_ID";
            db.Execute(query, parameters);

            // 결과 반환
            return Ok(new { message = "Success" });
        }

    }
}
    