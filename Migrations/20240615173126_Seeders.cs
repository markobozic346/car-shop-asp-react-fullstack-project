using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace servis_automobila.Migrations
{
    /// <inheritdoc />
    public partial class Seeders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "PasswordSalt", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "hash1", "salt1", "user", "user1" },
                    { 2, "hash2", "salt2", "user", "user2" }
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
                table: "Services",
                columns: new[] { "Id", "CarId", "Date", "Status" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 6, 15, 17, 31, 22, 967, DateTimeKind.Utc).AddTicks(2314), "Pending" },
                    { 2, 2, new DateTime(2024, 6, 15, 17, 31, 22, 967, DateTimeKind.Utc).AddTicks(2325), "Done" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 2);

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
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
