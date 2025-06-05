using FinancialManagementSystem.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinancialManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SummaryController : ControllerBase
    {
        private readonly ISummaryService _summaryService;

        public SummaryController(ISummaryService summaryService)
        {
            _summaryService = summaryService;
        }

        private int GetUserId() => Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthlySummary()
        {
            var result = await _summaryService.GetMonthlySummaryAsync(GetUserId());
            return Ok(result);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategorySummary()
        {
            var result = await _summaryService.GetCategoryBreakdownAsync(GetUserId());
            return Ok(result);
        }

        [HttpGet("trends")]
        public async Task<IActionResult> GetMonthlyTrends()
        {
            var result = await _summaryService.GetMonthlyTrendsAsync(GetUserId());
            return Ok(result);
        }
    }
}
