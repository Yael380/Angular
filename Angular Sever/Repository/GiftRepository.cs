using Entites;
using System.IO;
using System.Net.NetworkInformation;
using System.Reflection.PortableExecutable;
using System.Text;

namespace Repository
{
    public class GiftRepository
    {
        static int COUNT = 1;
        static List<Gift> gifts { get; set; }
        static GiftRepository()
        {
            gifts = new List<Gift>()
            {
                new Gift(){Id = COUNT++,Name="Computer",Image = "1.webp",Category = "man",Price=10,Donor = 1},
                new Gift(){Id = COUNT++,Name="Vocation",Image = "2.jpg",Category = "General",Price=10,Donor = 2},
                new Gift(){Id = COUNT++,Name="Baby stroller",Image = "3.webp",Category = "General",Price=10,Donor = 3},
                new Gift(){Id = COUNT++,Name="Shabbat Table Set",Image = "4.jpg",Category = "Man",Price=10,Donor = 4},
                new Gift(){Id = COUNT++,Name="Half-Cash",Image = "5.jpg",Category = "General",Price=10,Donor = 5},
                new Gift(){Id = COUNT++,Name="Jewelry Set",Image = "6.jpg",Category = "Woman",Price=10,Donor = 6},
                new Gift(){Id = COUNT++,Name="Kitchen Set",Image = "7.jpg",Category = "Woman",Price=10,Donor = 7},
                new Gift(){Id = COUNT++,Name="Flight in the Sky of Israel",Image = "8.jpg",Category = "General",Price=10,Donor = 5},
                new Gift(){Id = COUNT++,Name="Pair of Flight Tickets",Image = "9.jpg",Category = "General",Price=10,Donor = 6},
                new Gift(){Id = COUNT++,Name="Dream Vacation",Image = "10.jpg",Category = "General",Price=10,Donor = 7},
                new Gift(){Id = COUNT++,Name="Coffee Machine",Image = "11.jpg",Category = "Man",Price=10,Donor = 3},
                new Gift(){Id = COUNT++,Name="Fruit Arrangement",Image = "12.jpg",Category = "General",Price=10,Donor = 1},
                new Gift(){Id = COUNT++,Name="Car",Image = "13.jpg",Category = "General",Price=10,Donor = 6},
                new Gift(){Id = COUNT++,Name="Amusement Park Tickets",Image = "14.jpg",Category = "General",Price=10,Donor = 5},
                new Gift(){Id = COUNT++,Name="Year - Round Trips",Image = "15.jpg",Category = "General",Price=10,Donor = 6},
                new Gift(){Id = COUNT++,Name="Dream Room Design",Image = "16.jpg",Category = "General",Price=10,Donor = 2},
                new Gift(){Id = COUNT++,Name="Sofa",Image = "17.jpg",Category = "General",Price=10,Donor = 3},
                new Gift(){Id = COUNT++,Name="Menorah",Image = "18.jpg",Category = "Man",Price=10,Donor = 1},
                new Gift(){Id = COUNT++,Name="Musical Set",Image = "19.jpg",Category = "General",Price=10,Donor = 5},
                new Gift(){Id = COUNT++,Name="Kitchen Design",Image = "20.jpg",Category = "Woman",Price=10,Donor = 3},
                new Gift(){Id = COUNT++,Name="Sports for the Bullion",Image = "22.jpg",Category = "Man",Price=10,Donor = 4},
                new Gift(){Id = COUNT++,Name="Diamond Ring",Image = "26.jpg",Category = "Woman",Price=10,Donor = 6},

            };
        }
        public IEnumerable<Gift> Get()
        {
            return gifts;
        }
        public Gift Post(Gift gift)
        {
            if (gifts.Find(g => g.Name == gift.Name) == null)
            {
                gift.Id = COUNT++;
                gifts.Add(gift);
                return gift;
            }
            return null;
        }
        public void Put(int id,Gift gift)
        {
            Gift updateGift = gifts.Find(g => g.Id == gift.Id);
            if(updateGift != null) 
                gifts[gifts.IndexOf(updateGift)] = gift;
        }
        public void Delete(int? id)
        {   
            Gift deleteGift = gifts.Find(g => g.Id == id);
            gifts.Remove(deleteGift);
        }
        public List<Gift> Post2(Gift[] arrGift)
        {
            for (int i = 0; i < arrGift.Length; i++)
            {
                Delete(arrGift[i]?.Id);
            }
            return gifts;
        }
        public void Cart(List<GiftCart> arr, User user)
        {
            for (int i = 0; i < arr.Count; i++)
            {
                Gift gift = gifts.Find(g => g.Id == arr[i].Id);
                for (int j = 0; j < arr[i].Amount; j++)
                {    
                    if (gift.Users == null)
                        gift.Users=new List<User>();
                    if(gift != null && gift?.Users!=null)
                        gift.Users.Add(user);
                }
            }
        }

    }
}