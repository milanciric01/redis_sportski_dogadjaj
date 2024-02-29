using System.ComponentModel.DataAnnotations;


public class MatchStats
{
    public int ShotsHome { get; set; }
    public  int ShotsOnGoalHome { get; set; }
    public  int PossesionHome { get; set; }
    public  int PassesHome { get; set; }
    public  int FoulsHome { get; set; }
    public  int YellowHome { get; set; }
    public  int RedHome { get; set; } 
    public  int OffsidesHome { get; set; }
    public  int CornersHome { get; set; }



    public  int ShotsAway { get; set; }
    public  int ShotsOnGoalAway { get; set; }
    public  int PossesionAway { get { return 100 - PossesionHome; } }
    public  int PassesAway { get; set; }
    public  int FoulsAway { get; set; } 
    public  int YellowAway { get; set; }
    public  int RedAway { get; set; }
    public  int OffsidesAway { get; set; }
    public  int CornersAway { get; set; }
    public string Stadium { get; set; }





}
