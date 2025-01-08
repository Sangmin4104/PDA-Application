using Microsoft.EntityFrameworkCore;

namespace LT_MATAL_APP.Model;


public class LT_PDAContext : DbContext
{
    public LT_PDAContext(DbContextOptions<LT_PDAContext> options)
        : base(options)
    {
    }
    public DbSet<LT_PDA> TB_EMP { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<LT_PDA>()
                .HasKey(e => e.EMP_ID);
    }
}