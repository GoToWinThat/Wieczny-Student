using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MonopolyFieldLists",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonopolyFieldLists", x => x.Id);
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
                    MonopolyFieldListId = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Color = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: true),
                    Mortage = table.Column<int>(type: "int", nullable: true),
                    EstatePrice = table.Column<int>(type: "int", nullable: true),
                    RentCosts = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Purschased = table.Column<bool>(type: "bit", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonopolyFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MonopolyFields_MonopolyFieldLists_MonopolyFieldListId",
                        column: x => x.MonopolyFieldListId,
                        principalTable: "MonopolyFieldLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MonopolyFields_MonopolyFieldListId",
                table: "MonopolyFields",
                column: "MonopolyFieldListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MonopolyFields");

            migrationBuilder.DropTable(
                name: "MonopolyFieldLists");
        }
    }
}
