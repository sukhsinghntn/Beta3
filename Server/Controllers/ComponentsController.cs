using DynamicFormsApp.Server.Services;
using DynamicFormsApp.Shared;
using DynamicFormsApp.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace DynamicFormsApp.Server.Controllers
{
    [ApiController]
    [Route("api/components")]
    public class ComponentsController : ControllerBase
    {
        private readonly ComponentService _service;
        public ComponentsController(ComponentService service)
        {
            _service = service;
        }

        [HttpGet("{department}")]
        public async Task<IEnumerable<CustomComponent>> GetByDepartment(string department)
        {
            return await _service.GetByDepartmentAsync(department);
        }

        public class SaveComponentRequest
        {
            public string Name { get; set; } = string.Empty;
            public DesignerField Field { get; set; } = new();
            public string Department { get; set; } = string.Empty;
            public string CreatedBy { get; set; } = string.Empty;
        }

        [HttpPost]
        public async Task<ActionResult<CustomComponent>> Save([FromBody] SaveComponentRequest req)
        {
            var comp = await _service.SaveAsync(req.Name, req.Field, req.Department, req.CreatedBy);
            return Ok(comp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, [FromQuery] string user)
        {
            await _service.DeleteAsync(id, user);
            return NoContent();
        }
    }
}
