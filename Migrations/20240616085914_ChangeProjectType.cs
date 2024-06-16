using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace servis_automobila.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProjectType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 100);

            migrationBuilder.AddColumn<int>(
                name: "CarBodyId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CarBodies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarBodies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarBodyId",
                table: "Cars",
                column: "CarBodyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarBodies_CarBodyId",
                table: "Cars",
                column: "CarBodyId",
                principalTable: "CarBodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarBodies_CarBodyId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "CarBodies");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CarBodyId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarBodyId",
                table: "Cars");

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "Make", "Model", "UserId", "Year" },
                values: new object[,]
                {
                    { 1, "Toyota", "Corolla", 1, 2020 },
                    { 2, "Honda", "Civic", 2, 2019 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "PasswordSalt", "Role", "Username" },
                values: new object[,]
                {
                    { 99, "hash1", "salt1", "user", "user1" },
                    { 100, "hash2", "salt2", "user", "user2" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "CarId", "Date", "Status" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 6, 15, 17, 32, 40, 910, DateTimeKind.Utc).AddTicks(357), "Pending" },
                    { 2, 2, new DateTime(2024, 6, 15, 17, 32, 40, 910, DateTimeKind.Utc).AddTicks(366), "Done" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Services_CarId",
                table: "Services",
                column: "CarId");
        }
    }
}
