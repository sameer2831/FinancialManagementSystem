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
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        [HttpGet]
        public async Task<IActionResult> GetBudgets()
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var budgets = await _budgetService.GetBudgetsByUserAsync(userId);
                return Ok(budgets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching budgets: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBudget(int id)
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var budget = await _budgetService.GetBudgetByIdAsync(id);

                if (budget == null || budget.UserId != userId)
                    return NotFound("Budget not found.");

                return Ok(budget);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving budget: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBudget([FromBody] Budget budget)
        {
            if (budget == null)
                return BadRequest("Budget object is null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (budget.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            if (string.IsNullOrEmpty(budget.Category))
                return BadRequest("Category is required.");

            if (string.IsNullOrEmpty(budget.PeriodType))
                return BadRequest("Period type is required.");

            try
            {
                budget.UserId = Convert.ToInt32(GetUserId());
                await _budgetService.AddBudgetAsync(budget);
                return CreatedAtAction(nameof(GetBudget), new { id = budget.Id }, budget);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding budget: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, [FromBody] Budget budget)
        {
            if (budget == null)
                return BadRequest("Budget object is null.");

            if (id != budget.Id)
                return BadRequest("ID mismatch.");

            if (budget.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var existing = await _budgetService.GetBudgetByIdAsync(id);

                if (existing == null || existing.UserId != userId)
                    return NotFound("Budget not found.");

                budget.UserId = userId;
                await _budgetService.UpdateBudgetAsync(budget);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating budget: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var existing = await _budgetService.GetBudgetByIdAsync(id);

                if (existing == null || existing.UserId != userId)
                    return NotFound("Budget not found.");

                await _budgetService.DeleteBudgetAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting budget: {ex.Message}");
            }
        }
    }
}
