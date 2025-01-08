using LT_MATAL_APP.Model;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;

namespace LT_MATAL_APP.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class TB_RFIDController(LT_PDAContext context, IConfiguration configuration) : Controller
    {
        private readonly LT_PDAContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        [HttpPost]
        public IEnumerable<TB_CUSTOMER> GetTBCustomer()
        {
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            string sql = "SELECT CUST_ID, CUST_NAME FROM TB_CUSTOMER WHERE CUST_NAME ='*' OR CUST_ID LIKE 'C5%' AND CUST_NAME LIKE '%ED' OR CUST_NAME LIKE 'JUN%' OR CUST_NAME = 'AVM' OR CUST_NAME LIKE 'HYNIX%'";
            return db.Query<TB_CUSTOMER>(sql).ToList();
        }

        [HttpPost("workTicket")]
        public IActionResult WorkTicket([FromForm] TB_CUST_RFID value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            if (value.P_CUST_NAME == "undefined")
            {
                value.P_CUST_NAME = "";
            }
            var parameters = new { @P_SHIP_DATE = value.P_SHIP_DATE, @P_CUST_NAME = value.P_CUST_NAME };
            string query = "EXEC SM_HAN_SHIP_RFID_STD_L @P_SHIP_DATE, @P_CUST_NAME";
            IEnumerable<TB_WORK_TICKET_RFID> result = db.Query<TB_WORK_TICKET_RFID>(query, parameters).ToList();

            // 결과 반환
            return Ok(result);
        }

    }
}
    