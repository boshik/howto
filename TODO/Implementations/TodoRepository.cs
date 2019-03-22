using System;
using HOWTO.Abstractions;
using TODO.Models;

namespace TODO.Implementations
{
    public class TodoRepository : RepositoryBase<ToDoModel, Guid>, ITodoRepository
    {
        public TodoRepository()
        {
            AddItem("Update .NET Core version", true);
            AddItem("Implement API and DAL.", true);
            AddItem("Add Unit tests.");
            AddItem("Add Integration tests.");
            AddItem("Add Docker File");
        }

        private void AddItem(string description, bool isDone = false)
        {
            var id = Guid.NewGuid();

            var toDoModel = new ToDoModel
            {
                Id = id,
                Description = description,
                IsDone = isDone
            };

            Storage.Add(id, toDoModel);
        }
    }
}