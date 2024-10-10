using System.ComponentModel.DataAnnotations;

namespace QueueManagementSystem.Models
{
    public class Counter
    {
       // [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public Ticket CurentTicket { get; set; }
        
        public List<Service> AvailableServices { get; set; }
    }
}
