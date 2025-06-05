using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinancialManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]  // Secure all endpoints
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var expenses = await _expenseService.GetExpensesByUserAsync(userId);
                return Ok(expenses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving expenses: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            try
            {
                int userId = Convert.ToInt32(GetUserId());
                var expense = await _expenseService.GetExpenseByIdAsync(id, userId);
                if (expense == null) return NotFound("Expense not found.");
                return Ok(expense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the expense: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody] Expense expense)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                expense.UserId = Convert.ToInt32(GetUserId());

                if (expense.Amount <= 0)
                    return BadRequest("Amount must be greater than zero.");

                await _expenseService.AddExpenseAsync(expense);
                return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the expense: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense expense)
        {
            if (id != expense.Id) return BadRequest("Expense ID mismatch.");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var existingExpense = await _expenseService.GetExpenseByIdAsync(id, userId);
                if (existingExpense == null) return NotFound("Expense not found.");

                expense.UserId = userId;

                if (expense.Amount <= 0)
                    return BadRequest("Amount must be greater than zero.");

                await _expenseService.UpdateExpenseAsync(expense);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the expense: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                var userId = Convert.ToInt32(GetUserId());
                var existingExpense = await _expenseService.GetExpenseByIdAsync(id, userId);
                if (existingExpense == null) return NotFound("Expense not found.");

                await _expenseService.DeleteExpenseAsync(id, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the expense: {ex.Message}");
            }
        }
    }
}
