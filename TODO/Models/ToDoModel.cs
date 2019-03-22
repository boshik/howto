using System;
using HOWTO.Abstractions;

namespace TODO.Models
{
    public class ToDoModel : IEntity<Guid>
    {
        public Guid Id { get; set; }

        public bool IsDone { get; set; }

        public string Description { get; set; }
    }
}