using Microsoft.EntityFrameworkCore;
using TodoApii.Models;

namespace TodoApii.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoModel> TodoItems { get; set; }

        public DbSet<User> Users { get; set; }

    }
}