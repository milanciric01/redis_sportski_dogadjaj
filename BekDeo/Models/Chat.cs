using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Chat
{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public required String Email { get; set; }
    public required String Poruka { get; set; }
    public required int IDMeca { get; set; }

}
