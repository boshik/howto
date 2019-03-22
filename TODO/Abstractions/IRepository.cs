using System;
using System.Collections.Generic;

namespace HOWTO.Abstractions
{
    public interface IRepository<TEntity, in TId> where TEntity : IEntity<TId>
    {
        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> GetAll(Func<TEntity, bool> filter);

        TEntity GetById(TId id);

        TEntity Update(TEntity entity);

        bool Delete(TId id);

        TEntity Create(TEntity entity);
    }
}