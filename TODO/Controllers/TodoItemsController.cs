using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HOWTO.Controllers
{
    [ApiController]
    [Route("api/todo-items")]
    public class TodoItemsController : Controller
    {
        [HttpGet]
        public Task<IActionResult> Get()
        {
            throw new NotImplementedException();
            return Task.FromResult((IActionResult) new EmptyResult());
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public void Post([FromBody]string value)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            throw new NotImplementedException();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}