using Entites;
using Repository;
namespace Service

{
    public class GiftService
    {
        GiftRepository repository;

        public GiftService()
        {
            this.repository = new GiftRepository();
        }

        public IEnumerable<Gift> Get()
        {
            return repository.Get();
        }
        public Gift Post( Gift gift)
        {
          return repository.Post(gift);  
        }
        public void Put(int id,Gift gift)
        {
            repository.Put(id, gift);
        }
        public void Delete(int id)
        {
            repository.Delete(id);
        }
        public List<Gift> Post2(Gift[] arrGift)
        {
            return repository.Post2(arrGift);
        }
        public void Cart(List<GiftCart> arr, User user)
        {
            repository.Cart(arr, user);
        }
    }
}
