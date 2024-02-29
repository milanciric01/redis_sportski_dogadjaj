using System.ComponentModel.DataAnnotations;

public class Stadium
{
    
    [Key]
    public int ID { get; set; }

    [MaxLength(100)]
    public required string Name { get; set; }

    [MaxLength(100)]
    public required string Location { get; set; }

    public required int Capacity{ get; set; }

   // public required int BrojSedista { get; set; }
    

}
