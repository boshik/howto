using System;
using TODO.Models;

namespace HOWTO.Abstractions
{
    public interface ITodoRepository : IRepository<ToDoModel, Guid>
    {
    }
}