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
    [ApiController]
    [Route("api/[Controller]")]
    public class TB_EmpController : Controller
    {
        private readonly LT_PDAContext _context;
        private readonly IConfiguration _configuration;

        public TB_EmpController(LT_PDAContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost]
        public IEnumerable<LT_PDA> GetTBEMP()
        {
            var EMP = _context.TB_EMP.ToList();

            return EMP;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            string LT_USER = request.LT_USER;
            string LT_PW = request.LT_PW;

            var user = _context.TB_EMP.FirstOrDefault(emp => emp.EMP_NAME == LT_USER && emp.PW == LT_PW);

            if (user != null)
            {
                return Ok(new { status = "success" });
            }
            else
            {
                return BadRequest(new { status = "failure" });
            }
        }

        [HttpPost("equip_login")]
        public IActionResult EquipLogin([FromForm] TB_EQUIP value)
        {
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new { @P_EQUIP_ID = value.EQUIP_ID };
            string query = "SELECT EQUIP_ID, EQUIP_NAME FROM TB_EQUIP WHERE EQUIP_ID = @P_EQUIP_ID";
            var result = db.QueryFirstOrDefault<TB_EQUIP_VALUES>(query, parameters);

            if (result != null)
            {
                return Ok(new { status = "success", equipId = result.EQUIP_ID, equipName = result.EQUIP_NAME });
            }   
            else
            {
                return BadRequest(new { status = "failure" });
            }
        }

        [HttpPost("spoolCheck")]
        public IActionResult SpoolCheck([FromForm] TB_SPOOL value)
        {
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var parameters = new { @P_SPOOL_ID = value.SPOOL_ID };
            string query = "SELECT SPOOL_ID FROM TB_SPOOL WHERE SPOOL_ID = @P_SPOOL_ID";
            var result = db.QueryFirstOrDefault<TB_SPOOL>(query, parameters);

            if (result != null)
            {
                return Ok(new { status = "success" });
            }
            else
            {
                return BadRequest(new { status = "failure" });
            }
        }

        [HttpPost("userSearch")]
        public IActionResult UserSearch([FromForm] TB_USER_SEARCH value)
        {
            // 프로시저 실행 로직 추가
            using IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            // 프로시저 호출
            if (value.EMP_ID == "undefined" || value.EMP_ID == null)
            {
                value.EMP_ID = "";
            }
            if (value.EMP_NAME == "undefined" || value.EMP_NAME == null)
            {
                value.EMP_NAME = "";
            }
            var parameters = new { @P_USER_ID = value.EMP_ID, @P_USER_NAME = value.EMP_NAME };
            string query = "EXEC SM_HAN_USER_SEARCH @P_USER_ID, @P_USER_NAME";
            IEnumerable<LT_PDA> result = db.Query<LT_PDA>(query, parameters).ToList();

            // 결과 반환
            return Ok(result);
        }

    }
}
    