using Entites;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class DonorService
    {
        DonorRepository repository = new();
        public IEnumerable<Donor> Get()
        {
            return repository.Get();
        }
        public Donor Get(int id)
        {
            return repository.Get(id);
        }
        public Donor Post(Donor donor)
        {
            return repository.Post(donor);
        }
        public void Put(int id,Donor donor)
        {
            repository.Put(id, donor);
        }
        public void Delete(int? id)
        {
            repository.Delete(id);
        }
    }
}
