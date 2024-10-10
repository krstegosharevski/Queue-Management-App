using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QueueManagementSystem.Models;

namespace QueueManagementSystem.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Counter> Counters { get; set; }
    }
}
