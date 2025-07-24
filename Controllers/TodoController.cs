using Microsoft.AspNetCore.Mvc;
using TodoApii.Data;
using TodoApii.Models;

namespace TodoApii.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // ✅ TÜM GÖREVLERİ GETİR
        [HttpGet]
        public IActionResult GetTodos()
        {
            var todos = _context.TodoItems.ToList();
            return Ok(todos);
        }

        // ✅ BELİRLİ BİR GÖREVİ ID İLE GETİR
        [HttpGet("{id}")]
        public IActionResult GetTodoById(int id)
        {
            var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound("Görev bulunamadı.");
            }
            return Ok(todo);
        }

        [HttpPost]
        public IActionResult Add(TodoModel newTodo)
        {
            newTodo.OlusturulmaTarihi = DateTime.Now;
            _context.TodoItems.Add(newTodo);
            _context.SaveChanges();
            return Ok("Görev başarıyla eklendi");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TodoModel updatedTodo)
        {
            var todo = _context.TodoItems.Find(id);
            if (todo == null) return NotFound();

            todo.Baslik = updatedTodo.Baslik;
            todo.Aciklama = updatedTodo.Aciklama;
            todo.Durum = updatedTodo.Durum;

            _context.SaveChanges();
            return Ok("Görev güncellendi");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.TodoItems.Find(id);
            if (todo == null) return NotFound();

            _context.TodoItems.Remove(todo);
            _context.SaveChanges();
            return Ok("Görev silindi");
        }
    }
}