using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinancialManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class IncomeController : ControllerBase
    {
        private readonly IIncomeService _incomeService;

        public IncomeController(IIncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        [HttpGet]
        public async Task<IActionResult> GetIncomes()
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var incomes = await _incomeService.GetIncomesByUserAsync(userId);
                return Ok(incomes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching incomes: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncome(int id)
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var income = await _incomeService.GetIncomeByIdAsync(id, userId);
                if (income == null) return NotFound("Income not found.");
                return Ok(income);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving income: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddIncome([FromBody] Income income)
        {
            if (income == null)
                return BadRequest("Income object is null.");

            // Model validation for required attributes like Amount, Category, Date
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validate Amount > 0
            if (income.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            // Validate Category enum
            if (!Enum.IsDefined(typeof(IncomeCategory), income.Category))
                return BadRequest("Invalid income category.");

            try
            {
                // Set UserId from authenticated user context (example method)
                income.UserId = Convert.ToInt32(GetUserId());

                // Save income asynchronously via service
                await _incomeService.AddIncomeAsync(income);

                // Return 201 Created with route to GetIncome action and new income id
                return CreatedAtAction(nameof(GetIncome), new { id = income.Id }, income);
            }
            catch (Exception ex)
            {
                // Log exception as needed (not shown here)
                return StatusCode(500, $"Error adding income: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncome(int id, [FromBody] Income income)
        {
            if (income == null) return BadRequest("Income object is null.");
            if (id != income.Id) return BadRequest("ID mismatch.");
            if (income.Amount <= 0) return BadRequest("Amount must be greater than zero.");

            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var existingIncome = await _incomeService.GetIncomeByIdAsync(id, userId);
                if (existingIncome == null) return NotFound("Income not found.");

                income.UserId = userId;
                await _incomeService.UpdateIncomeAsync(income);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating income: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var existingIncome = await _incomeService.GetIncomeByIdAsync(id, userId);
                if (existingIncome == null) return NotFound("Income not found.");

                await _incomeService.DeleteIncomeAsync(id, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting income: {ex.Message}");
            }
        }
    }
}
