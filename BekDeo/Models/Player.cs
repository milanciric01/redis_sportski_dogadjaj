using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Player
{
    
    [Key]
    public int ID { get; set; }

    //[Range(1 , 99 , ErrorMessage = " Broj dresa mora biti neki broj izmedju 1 i 99!")]
    public int Jersey_number {get; set;}

    [MaxLength(30)]
    public required string Full_Name { get; set; }
    public required string Position {get; set;}
    public required int GoalsScored { get; set; }
    public required int Shots { get; set; }
    public required int Assists { get; set; }
    public int YellowCards { get; set; }
    public int RedCards { get; set; }
    public required string Tim { get; set; }

}
