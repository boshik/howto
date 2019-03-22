using System;

namespace TODO.Exceptions
{
    public class ItemNotFoundException : Exception
    {
        public ItemNotFoundException() : base("Item not found.")
        {
        }
    }
}