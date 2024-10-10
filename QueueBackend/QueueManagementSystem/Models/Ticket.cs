using Microsoft.AspNetCore.Identity;
using QueueManagementSystem.Models.Enums;

namespace QueueManagementSystem.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public int DisplayNumber { get; set; }  

        public string NameService { get; set; }

        public DateTime GeneratedAt { get; set; }

        public StatusEnum Status { get; set; }

        public User CreatedBy { get; set; }
    }
}
