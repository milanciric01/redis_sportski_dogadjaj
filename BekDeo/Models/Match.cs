using System.ComponentModel.DataAnnotations;

public class Match
{

    [Key]
    public int ID { get; set; }
    public required String HomeTeam { get; set; }
    public required String AwayTeam { get; set; }
    public DateTime MatchDate { get; set; }
    public int MatchTime { get; set; }
    public required string Score { get; set; }
    public required MatchStats Stats { get; set; }
    public required string Fixture { get; set; }
    
}
