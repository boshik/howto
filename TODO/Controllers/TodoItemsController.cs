using System;
using System.Collections.Generic;
using HOWTO.Abstractions;
using Microsoft.AspNetCore.Mvc;
using TODO.Models;

namespace HOWTO.Controllers
{
    [ApiController]
    [Route("api/todo-items")]
    public class TodoItemsController : Controller
    {
        private readonly ITodoRepository _todoRepository;

        public TodoItemsController(ITodoRepository todoRepository) => _todoRepository = todoRepository;

        [HttpGet]
        public IEnumerable<ToDoModel> Get() => _todoRepository.GetAll();

        [HttpGet("{id}")]
        public ToDoModel Get(Guid id) => _todoRepository.GetById(id);

        [HttpPost]
        public ToDoModel Post([FromBody]ToDoModel model) => _todoRepository.Create(model);

        [HttpPut]
        public ToDoModel Put([FromBody]ToDoModel model) => _todoRepository.Update(model);

        [HttpDelete("{id}")]
        public bool Delete(Guid id) => _todoRepository.Delete(id);
    }
}