using Entites;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class DonorRepository
    {
        static List<Donor> donors = new ();
        static int COUNT = 1;
        static DonorRepository()
        {
            donors = new()
            {
                new Donor(){Id=COUNT++,Name="Reuven Levi",Phone="025879654",Email="Reuven@Reuven.il"},
                new Donor(){Id=COUNT++,Name="Shimon Coen",Phone="0548579632",Email="Shimon@Shimon.il"},
                new Donor(){Id=COUNT++,Name="Osnat Lorents",Phone="0548579632",Email="Osnat@Osnat.il"},
                new Donor(){Id=COUNT++,Name="Michal Tvito",Phone="084562563",Email="Michal@Michal.il"},
                new Donor(){Id=COUNT++,Name="Teila Weiss",Phone="02587934",Email="Teila@Teila.il"},
                new Donor(){Id=COUNT++,Name="Moti Edri",Phone="039874563",Email="Moti@Moti.il"},
                new Donor(){Id=COUNT++,Name="Lior Goldberg",Phone="0549783265",Email="Lior@Lior.il"},
                new Donor(){Id=COUNT++,Name="Keila Ben Shalom",Phone="025711984",Email="Keila@Keila.il"},
            };
        }
        public IEnumerable<Donor> Get()
        {
            return donors;
        }
        public Donor Get(int id)
        {
            Donor donor = donors.Find(d => d.Id == id);
            return donor;
        }
        public Donor Post(Donor donor)
        {
            if (donors.Find(d => d.Name == donor.Name) == null)
            {
                donor.Id = COUNT++;
                donors.Add(donor);
                return donor;
            }
            return null;
        }
        public void Put(int id, Donor donor)
        {
            Donor updateDonor = donors.Find(d => d.Id == id);
            donors[donors.IndexOf(updateDonor)] = donor;
        }
        public void Delete(int? id)
        {
            Donor deleteDonor = donors.Find(g => g.Id == id);
            donors.Remove(deleteDonor);
        }
    }
}
