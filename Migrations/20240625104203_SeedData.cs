using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace servis_automobila.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CarBodies",
                columns: new[] { "Id", "Type" },
                values: new object[,]
                {
                    { 1, "Sedan" },
                    { 2, "SUV" },
                    { 3, "Hatchback" },
                    { 4, "Convertible" },
                    { 5, "Coupe" },
                    { 6, "Minivan" },
                    { 7, "Truck" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "PasswordSalt", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "1UcUVC5NV3Euto38TfEbaRU2kPScg1KAw73gGDS24T6ARQpadCDpUiuq+316WhEnG9Syup3g0KGRELOPrO5RHA==", "ALYtzOOPem91efI4FbuANpjLObUz8o8LqWhVoQoTusO52Az2kpjzcUNI6kWOb4Lz8tDYyP+/HAhCQWToDb+VBcZiVG/8HgbADEcZWsyLuu590OqLXOppdfVJEfDpDvuSqDdUlq1aBQWho0jWbq+3dDVfX2u8S8tx/la8eTsYjxw=", "admin", "admin" },
                    { 2, "stMKNq4siUCe7v9fALrcvKB2RY8JWuMbzErkXb67kCjS7KZk2h7lJvrcyhBPaDB1qBqoHT5PxqbJu2mRqi1+oQ==", "WioXQvTn/82pBmi4rfiFgRBvNJ7M1bNoM8u29GGwKqYONKNK0TCr2MN6VxN+jpzGsGfYGr5dKtCrN2NSJ3Qzc45rj+AiRcymTUkefv4iwX9n0aPZyc9I3+dNH2RDMItKODwo4DWUid86Kp1bMO37pZp5XsNRCn0GMCiKaWzyovU=", "user", "user1" },
                    { 3, "ivg6aegMVKCAisVY42zFDxv29iHZQfC3F5+DI69h5uZT3aSzFH4H9h+EkAp76BxAb9dU7xUh6hKnsD/usgWJDg==", "SDurcqhKFPJnLMapQ/cVl9kbkhiTwkNOQ1p39Zb6d0w5rXXoikKCDRxgmuwZAjAeEfAC1cNvvw8WWH25CXTaxRCojQm6IH0zvib8gvaw3WN/wMJ7+YB1MRXsh6ICaVsUHKIDgPUEwDgrL/jf85xLn3bNhH0i85ja6Kvv1JiHtSQ=", "user", "user2" },
                    { 4, "HKsweH16LOZWmcgDO7EBFZ74aEBGhLHuGOFPeRzNo3D9Bq41g1SRXaixYuMms+YDqAZovtoU8jvJxVLbHQaFAA==", "Kbsa4ZPnvRNweAEW7iGPSjtDD54oToLLucO8uWRlxHq6gwgGv0URR7IiBG7VJE5c/XmWVMqBTo5C9u9gmOZkZ2q2gDaEblkgZ9Mr/cB0Xe3MBSlYGrWrmw6ROFkN7RmxVoJV9elwnAvd9YObXATrLn+LLMD2HYW15GNCoiBVyK8=", "user", "user3" },
                    { 5, "+zTxF3hecYcVAoqhB+nxhnIwMNlH96EOrJDsnr6KB90kJiuAUi6HoyFmIgjaDF0rKrWFedTNBahXLtZAy3bQ+Q==", "BkEhmjDV16UbkKr6FXkNdK7jrmIyZnvhmqbKT8T5TsdcJmCbHp+8UbJD/k20r0K5g8XT9kcJ1zIvLQ7/PuGpr4t0lyROmdL1uJXdFDMbmnw/s2l4RI1rEJ/46wMKoUJIMGjG1HM/NpvhvniHJestdrqsmpzQmzONaF6+3de0J6c=", "user", "user4" },
                    { 6, "f+/LERpS/2UeSUaIMNZttifNEPgh541Cs6K/2nZ/sAFuoQutUtUq2wkw1DOSM6jCzG7Irp3Z/a63COmG87mRbQ==", "FomNjziNeURCUgnflzdbTZfhbWp0EfwU0NHYHUIdEnuOG4yvwoiigAZYYPbV7V9o+Uzy+pqUzv/8xA7fnfqbFyLxCf8bCX2Pjfwpo30Pi9LFqKGIbsDjzXk2fjFoyRyFN4HLjnyK71Q5oq6BnT3wr7f1gukGP416gt8g8qlGJLE=", "user", "user5" },
                    { 7, "W1SWVMig9ULVQe/GLNV+SYeu5X2q1tqxxSCl7epIwyUqkc3u1QLaNripRsszA1k/WIXSVfCn3fTRCcdx9yGhKg==", "C1xKFaFrRs8vIbj2K9EfdMpbW4+5OBYkkPO8wo7eG/JS7uAQjcO2iKHWzMALtwuTPQu4J6JFXGMip4h1aP6Jd6tF4KxrwnXY6ZK2yL1apIGedCPhaXVA6rjHyapLwf8iimtMQEUxZPLubZxFBPt+XOGI8GEjU8BTas9yU0xmlHk=", "user", "user6" },
                    { 8, "3Zi0boFzYUjlOrKFWy9lo6dwClgYLwCzS2L62LVB9pJG4RU58itURxVBg6IB//i93I8DLkni3QY7AcjOgiMNqA==", "dZB28uAiyX4in3/l8ilMyJm8cqfP/HKd4kapfQ3s4BPHbu2cQ2NKmLk45GH3Ifi0Ci3j1PYIdAqkIXNK+EQX69CcSNFtdRNDJphFsNPCnV+JJg8XC0kZbVmZb72AuYc3E+NhVw4VdZcs/7Ht6k1CumP/GDpSvmkH+fyseeIV3J0=", "user", "user7" }
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "CarBodyId", "Make", "Model", "Price", "UserId", "Year" },
                values: new object[,]
                {
                    { 1, 1, "Toyota", "Camry", 24000m, 2, 2020 },
                    { 2, 2, "Honda", "CR-V", 30000m, 2, 2021 },
                    { 3, 1, "Ford", "Fusion", 22000m, 3, 2019 },
                    { 4, 1, "Chevrolet", "Malibu", 20000m, 4, 2018 },
                    { 5, 1, "Nissan", "Altima", 23000m, 5, 2020 },
                    { 6, 2, "Toyota", "Rav4", 31000m, 6, 2021 },
                    { 7, 1, "Honda", "Accord", 28000m, 7, 2022 },
                    { 8, 1, "Hyundai", "Elantra", 21000m, 8, 2020 }
                });

            migrationBuilder.InsertData(
                table: "SavedCars",
                columns: new[] { "Id", "CarId", "UserId" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 2, 3 },
                    { 3, 3, 4 },
                    { 4, 4, 5 },
                    { 5, 5, 6 },
                    { 6, 6, 7 },
                    { 7, 7, 8 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SavedCars",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CarBodies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
