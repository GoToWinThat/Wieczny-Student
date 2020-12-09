using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nick = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cash = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PropertyFieldInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EstatesBought = table.Column<int>(type: "int", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyFieldInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyFieldInfos_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MonopolyFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: true),
                    Mortage = table.Column<int>(type: "int", nullable: true),
                    EstatePrice = table.Column<int>(type: "int", nullable: true),
                    RentCosts = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyFieldInfoRef = table.Column<int>(type: "int", nullable: true),
                    Purschased = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonopolyFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MonopolyFields_PropertyFieldInfos_PropertyFieldInfoRef",
                        column: x => x.PropertyFieldInfoRef,
                        principalTable: "PropertyFieldInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MonopolyFields_PropertyFieldInfoRef",
                table: "MonopolyFields",
                column: "PropertyFieldInfoRef",
                unique: true,
                filter: "[PropertyFieldInfoRef] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFieldInfos_PlayerId",
                table: "PropertyFieldInfos",
                column: "PlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MonopolyFields");

            migrationBuilder.DropTable(
                name: "PropertyFieldInfos");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
