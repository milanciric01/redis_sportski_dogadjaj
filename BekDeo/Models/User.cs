using System.ComponentModel.DataAnnotations;

public class User
{
    
    [StringLength(20, ErrorMessage = "First name must be less than 20 characters!")]
    public required string First_Name { get; set; }

    [StringLength(25, ErrorMessage = "Last name must be less than 25 characters!")]
    public required string Last_Name { get; set; }

    [EmailAddress(ErrorMessage = "Invalid Email Address!")]
    public required string Email { get; set; }

    [StringLength(30, MinimumLength = 8, ErrorMessage = "Password must have at least 8 characters!")]
    public required string Password { get; set; } 

    [Compare("Password", ErrorMessage = "Passwords don't match!")]
    public required string PasswordVerification { get; set; }

}
