﻿namespace HOWTO.Abstractions
{
    public interface IEntity<TId>
    {
        TId Id { get; }
    }
}