using System.ComponentModel.DataAnnotations;

public class Team
{
  

    [StringLength(20, ErrorMessage = "Team name must have at least 5 characters")]
    [Key]
    public required string Name { get; set; }

    public required int Played_Games { get; set; }
    public required int Wins { get; set; }
    public required int Draws { get; set; }
    public required int Loses { get; set; }
    public required int Position { get; set; }
    public required int Goals_Foward { get; set; }
    public required int Goals_Concided { get; set; }
    public int Goals_Difference { get { return Goals_Foward - Goals_Concided;} }

    public required List<Player> players { get; set;}

    public required int Points { get; set; } = 0;

}
