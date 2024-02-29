public class TeamStats
{
    public int Wins { get; set; } = 0;
    public int Losses { get; set; } = 0;
    public int Draws { get; set; } = 0;
    public int GoalsScored { get; set; } = 0;
    public int GoalsConceded { get; set; } = 0;
    public int CleanSheets { get; set; } = 0;
    public int MatchesPlayed { get { return Wins + Losses + Draws; } }
    public int Points { get { return Wins * 3 + Draws; } }

    public void RecordWin(int goalsScored, int goalsConceded)
    {
        Wins++;
        GoalsScored += goalsScored;
        GoalsConceded += goalsConceded;
        if (goalsConceded == 0) CleanSheets++;
    }

    public void RecordLoss(int goalsScored, int goalsConceded)
    {
        Losses++;
        GoalsScored += goalsScored;
        GoalsConceded += goalsConceded;
    }

    public void RecordDraw(int goalsScored, int goalsConceded)
    {
        Draws++;
        GoalsScored += goalsScored;
        GoalsConceded += goalsConceded;
        if (goalsConceded == 0) CleanSheets++;
    }

    // Potencijalno dodatne funkcije koje su potrebne
}
