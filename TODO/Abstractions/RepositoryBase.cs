using System;
using System.Collections.Generic;
using System.Linq;
using TODO.Exceptions;

namespace HOWTO.Abstractions
{
    public abstract class RepositoryBase<TEntity, TId> : IRepository<TEntity, TId>
        where TEntity : IEntity<TId>
    {
        protected RepositoryBase() => Storage = new Dictionary<TId, TEntity>();

        protected Dictionary<TId, TEntity> Storage { get; }

        public IEnumerable<TEntity> GetAll() => Storage.Values;

        public IEnumerable<TEntity> GetAll(Func<TEntity, bool> filter) => Storage.Values.Where(filter).ToList();

        public TEntity GetById(TId id)
        {
            if (!Storage.ContainsKey(id))
            {
                throw new ItemNotFoundException();
            }

            return Storage[id];
        }

        public TEntity Update(TEntity entity)
        {
            if (!Storage.ContainsKey(entity.Id))
            {
                throw new ItemNotFoundException();
            }

            Storage[entity.Id] = entity;
            return entity;
        }

        public bool Delete(TId id)
        {
            if (!Storage.ContainsKey(id))
            {
                throw new ItemNotFoundException();
            }

            return Storage.Remove(id);
        }

        public TEntity Create(TEntity entity)
        {
            Storage.Add(entity.Id, entity);
            return entity;
        }
    }
}