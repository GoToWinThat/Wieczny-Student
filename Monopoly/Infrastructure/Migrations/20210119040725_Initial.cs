using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardIdNumber = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DiceValues = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GameInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivePlayerIndex = table.Column<int>(type: "int", nullable: false),
                    TurnClock = table.Column<int>(type: "int", nullable: false),
                    GameClock = table.Column<int>(type: "int", nullable: false),
                    GameState = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LogInfo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MonopolyFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MonopolyID = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Color = table.Column<int>(type: "int", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: true),
                    RentCosts = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstatePrice = table.Column<int>(type: "int", nullable: true),
                    Mortgage = table.Column<int>(type: "int", nullable: true),
                    PropertyFieldInfoId = table.Column<int>(type: "int", nullable: true),
                    Purchased = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonopolyFields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cash = table.Column<int>(type: "int", nullable: false),
                    Signature = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<int>(type: "int", nullable: false),
                    TurnsToWait = table.Column<int>(type: "int", nullable: false),
                    IsInJail = table.Column<bool>(type: "bit", nullable: false),
                    IsBankrupt = table.Column<bool>(type: "bit", nullable: false),
                    IsLogged = table.Column<bool>(type: "bit", nullable: false),
                    IsReady = table.Column<bool>(type: "bit", nullable: false),
                    ThrownDices = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CardPlayer",
                columns: table => new
                {
                    CardsId = table.Column<int>(type: "int", nullable: false),
                    PlayersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardPlayer", x => new { x.CardsId, x.PlayersId });
                    table.ForeignKey(
                        name: "FK_CardPlayer_Cards_CardsId",
                        column: x => x.CardsId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardPlayer_Players_PlayersId",
                        column: x => x.PlayersId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PropertyFieldInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EstateLevel = table.Column<int>(type: "int", nullable: false),
                    Mortgaged = table.Column<bool>(type: "bit", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: true),
                    PropertyFieldId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyFieldInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyFieldInfos_MonopolyFields_PropertyFieldId",
                        column: x => x.PropertyFieldId,
                        principalTable: "MonopolyFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyFieldInfos_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "Cards",
                columns: new[] { "Id", "CardIdNumber", "CardName", "Description", "Discriminator", "Type" },
                values: new object[,]
                {
                    { 1, 0, "Pierwszeństwo w dziekanacie", "Masz przy sobie bardzo ważne dokumenty. Przy użyciu tej karty możesz od razu wyjść z dziekanatu nie tracąc żadnej kolejki.", "GainCard", "Gain" },
                    { 19, 18, "Dziura w kieszeni", "Niedawno zarobione pieniądze wkładasz do kieszeni. Niestety ta okazuje się posiadać dziurę w sobie. Tracisz 5 ECTS.", "LossCard", "Loss" },
                    { 18, 17, "Gdybym był bogaty", "Uznałeś / Uznałaś, że masz za dużo ECTSów i oddajesz każdemu nietracącemu kolejki graczowi kwotę 5 ECTS.", "LossCard", "Loss" },
                    { 17, 16, "Spłata pożyczki", "W poprzednim semestrze znajomy pomógł Ci, pożyczając pewną sumę ECTSów. Teraz musisz mu wszystko oddać. Płacisz 20 ECTS.", "LossCard", "Loss" },
                    { 16, 15, "Głód", "Dopadł Cię głód. Niezwłocznie udajesz się na pole STOŁÓWKA STUDENCKA.", "LossCard", "Loss" },
                    { 15, 14, "Douczanie się", "Niestety materiał na wykładzie okazał się być zbyt trudny i musisz udać się na pole KONSULTACJE.", "LossCard", "Loss" },
                    { 14, 13, "Formalności", "Zaszła potrzeba wyjaśnienia przez Ciebie pewnej sytuacji. Niezwłocznie się udajesz się na pole DZIEKANAT.", "LossCard", "Loss" },
                    { 13, 12, "Warunek", "W tym semestrze nie szło Ci zbyt dobrze w nauce i musisz zapłacić za zaliczenie warunkowe. Płacisz 30 ECTS.", "LossCard", "Loss" },
                    { 12, 11, "Zapłata rachunków", "Musisz zapłacić za prąd, internet i licencje programów. Za każde posiadane pole płacisz 10 ECTS.", "LossCard", "Loss" },
                    { 20, 19, "Spóźnienie", "Zajęcia trwały zbyt długo i odjechał Ci autobus. Tracisz kolejkę.", "LossCard", "Loss" },
                    { 11, 10, "Zapomniany klucz", "Prowadzący zapomniał zabrać klucza z portierni. Poprosił Cię o zejście na dół i przyniesienie go. Wracasz na pole PORTIERNIA.", "LossCard", "Loss" },
                    { 9, 8, "Znajomości na stołówce", "Znajomy pracujący na stołówce studenckiej obiecał Ci, że obsłuży Cię bez kolejki, więc nie musisz tam czekać.", "GainCard", "Gain" },
                    { 8, 7, "Szczęśliwy traf", "Samorząd Wydziału zorganizował grę losową, w której do wygrania było 20 ECTS. Udało Ci się je wygrać!", "GainCard", "Gain" },
                    { 7, 6, "Wyróżnienie przez dziekana", "Za wyróżnianie się w nauce dziekan uznał, że zasługujesz na 100 ECTS - właśnie tyle wpływa na Twoje konto.", "GainCard", "Gain" },
                    { 6, 5, "Urodziny", "Masz urodziny i pozostali gracze życzą Ci zdania studiów. Dostajesz od każdego z nich 5 ECTS w prezencie.", "GainCard", "Gain" },
                    { 5, 4, "Miss RMS / Mister RMS", "Zyskałaś tytuł najpiękniejszej studentki / zyskałeś tytuł najprzystojniejszego studenta! Otrzymujesz w nagrodę 10 ECTS.", "GainCard", "Gain" },
                    { 4, 3, "ECTSobranie", "Grozi Ci warunek, więc jak zwykle wybierasz się na poszukiwanie ECTSów w lesie. Udaje Ci się znaleźć aż 30 ECTS!", "GainCard", "Gain" },
                    { 3, 2, "Wygrana w konkursie", "Reprezentujesz uczelnię na konkursie i wygrywasz go. Prowadzący postanowili zaliczyć Ci cały semestr. Otrzymujesz 50 ECTS.", "GainCard", "Gain" },
                    { 2, 1, "Oświecenie na konsultacjach", "Pokazujesz się z dobrej strony już na początku konsultacji. Przy użyciu tej karty możesz od razu z nich wyjść, nie tracąc żadnej kolejki.", "GainCard", "Gain" },
                    { 10, 9, "O, pinć ECTSów!", "Idziesz sobie po korytarzu aż nagle zauważasz, że na podłodze leży 5 ECTSów. Nikogo w pobliżu nie ma, więc bierzesz je dla siebie.", "GainCard", "Gain" }
                });

            migrationBuilder.InsertData(
                table: "Dices",
                columns: new[] { "Id", "DiceValues" },
                values: new object[] { 1, "1;1" });

            migrationBuilder.InsertData(
                table: "GameInfo",
                columns: new[] { "Id", "ActivePlayerIndex", "GameClock", "GameState", "TurnClock" },
                values: new object[] { 1, 0, 0, "waiting", 0 });

            migrationBuilder.InsertData(
                table: "Logs",
                columns: new[] { "Id", "LogInfo" },
                values: new object[] { 1, "Zaczynamy gre" });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "MonopolyID", "Name", "Type" },
                values: new object[] { 21, 8, "CornerField", 20, "Stołówka studencka", 2 });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "EstatePrice", "MonopolyID", "Mortgage", "Name", "Price", "PropertyFieldInfoId", "Purchased", "RentCosts", "Type" },
                values: new object[,]
                {
                    { 13, 2, "PropertyField", 20, 12, 15, "Laboratorium nr 409 (MS)", 35, 0, false, "3;10;25;70;125", 0 },
                    { 15, 3, "PropertyField", 20, 14, 14, "Laboratorium nr 412 (MS)", 35, 0, false, "1;12;22;100;120", 0 },
                    { 16, 10, "PropertyField", 0, 15, 20, "Toalety", 50, 0, false, "0", 3 },
                    { 18, 3, "PropertyField", 20, 17, 14, "Laboratorium nr 415 (MS)", 39, 0, false, "2;12;22;100;130", 0 },
                    { 19, 3, "PropertyField", 20, 18, 14, "Laboratorium nr 416 (MS)", 42, 0, false, "3;15;25;100;150", 0 },
                    { 20, 11, "PropertyField", 20, 19, 22, "Sala nr 507 (MS)", 42, 0, false, "3;15;45;110;180", 0 },
                    { 22, 11, "PropertyField", 20, 21, 22, "Laboratorium nr 510 (MS)", 42, 0, false, "3;15;45;110;180", 0 },
                    { 25, 4, "PropertyField", 20, 24, 25, "Sala nr 310 (LB)", 45, 0, false, "3;18;50;140;210", 0 },
                    { 26, 10, "PropertyField", 0, 25, 20, "Toalety", 50, 0, false, "0", 3 },
                    { 27, 4, "PropertyField", 20, 26, 25, "Sala nr 315 (LB)", 50, 0, false, "3;20;60;150;230", 0 },
                    { 28, 5, "PropertyField", 20, 27, 18, "Sala nr 425 (LB)", 50, 0, false, "3;14;40;110;150", 0 },
                    { 29, 5, "PropertyField", 20, 28, 18, "Sala nr 426 (LB)", 50, 0, false, "3;14;40;110;150", 0 },
                    { 30, 5, "PropertyField", 20, 29, 30, "Sala nr 427 (LB)", 60, 0, false, "3;15;45;120;170", 0 },
                    { 32, 6, "PropertyField", 40, 31, 30, "Aula C (CEK)", 60, 0, false, "5;30;90;200;280", 0 },
                    { 33, 6, "PropertyField", 40, 32, 27, "Aula A (CNT)", 60, 0, false, "6;38;92;190;250", 0 },
                    { 34, 6, "PropertyField", 40, 33, 27, "Pracownia fizyczna nr 2 (CNT)", 60, 0, false, "6;40;95;250;350", 0 },
                    { 36, 10, "PropertyField", 0, 35, 20, "Toalety", 50, 0, false, "0", 3 },
                    { 37, 13, "PropertyField", 0, 36, 20, "Winda", 40, 0, false, "0", 3 }
                });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "EstatePrice", "MonopolyID", "Mortgage", "Name", "Price", "PropertyFieldInfoId", "Purchased", "RentCosts", "Type" },
                values: new object[,]
                {
                    { 12, 2, "PropertyField", 10, 11, 12, "Sala wykładowa nr 408 (MS)", 30, 0, false, "2;8;20;60;100", 0 },
                    { 10, 2, "PropertyField", 10, 9, 10, "Laboratorium nr 406 (MS)", 22, 0, false, "1;6;18;54;90", 0 },
                    { 8, 1, "PropertyField", 20, 7, 20, "Sala wykładowa nr 402 (MS)", 35, 0, false, "3;16;44;160;200", 0 },
                    { 7, 1, "PropertyField", 20, 6, 15, "Laboratorium nr 401 (MS)", 20, 0, false, "3;12;35;90;150", 0 }
                });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "MonopolyID", "Name", "Type" },
                values: new object[,]
                {
                    { 31, 8, "CornerField", 30, "Dziekanat", 2 },
                    { 3, 9, "EventField", 2, "Karta zysku", 1 },
                    { 9, 9, "EventField", 8, "Karta straty", 1 },
                    { 14, 9, "EventField", 13, "Karta zysku", 1 },
                    { 17, 9, "EventField", 16, "Karta straty", 1 },
                    { 23, 9, "EventField", 22, "Karta zysku", 1 },
                    { 24, 9, "EventField", 23, "Karta straty", 1 },
                    { 35, 9, "EventField", 34, "Karta straty", 1 },
                    { 38, 9, "EventField", 37, "Karta zysku", 1 },
                    { 1, 8, "CornerField", 0, "Portiernia", 2 }
                });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "EstatePrice", "MonopolyID", "Mortgage", "Name", "Price", "PropertyFieldInfoId", "Purchased", "RentCosts", "Type" },
                values: new object[,]
                {
                    { 39, 7, "PropertyField", 40, 38, 35, "Biblioteka wydziałowa", 80, 0, false, "7;30;100;200;350", 0 },
                    { 2, 0, "PropertyField", 10, 1, 6, "Laboratorium nr 308 (MS)", 15, 0, false, "1;4;12;36;90", 0 },
                    { 4, 0, "PropertyField", 10, 3, 6, "Laboratorium nr 309 (MS)", 15, 0, false, "1;4;12;36;90", 0 },
                    { 5, 0, "PropertyField", 0, 4, 20, "Winda", 40, 0, false, "0", 3 },
                    { 6, 10, "PropertyField", 0, 5, 20, "Toalety", 50, 0, false, "0", 3 }
                });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "MonopolyID", "Name", "Type" },
                values: new object[] { 11, 8, "CornerField", 10, "Konsultacje", 2 });

            migrationBuilder.InsertData(
                table: "MonopolyFields",
                columns: new[] { "Id", "Color", "Discriminator", "EstatePrice", "MonopolyID", "Mortgage", "Name", "Price", "PropertyFieldInfoId", "Purchased", "RentCosts", "Type" },
                values: new object[] { 40, 6, "PropertyField", 40, 39, 45, "Pracownia fizyczna nr 2 (CNT)", 80, 0, false, "10;35;110;250;400", 0 });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "Id", "Cash", "Color", "IsBankrupt", "IsInJail", "IsLogged", "IsReady", "Name", "Position", "Signature", "ThrownDices", "TurnsToWait" },
                values: new object[,]
                {
                    { 1, 500, "", false, false, false, false, "", 0, "", null, 0 },
                    { 2, 500, "", false, false, false, false, "", 0, "", null, 0 },
                    { 3, 500, "", false, false, false, false, "", 0, "", null, 0 },
                    { 4, 500, "", false, false, false, false, "", 0, "", null, 0 }
                });

            migrationBuilder.InsertData(
                table: "PropertyFieldInfos",
                columns: new[] { "Id", "EstateLevel", "Mortgaged", "PlayerId", "PropertyFieldId" },
                values: new object[,]
                {
                    { 1, 0, false, null, 2 },
                    { 25, 0, false, null, 36 },
                    { 24, 0, false, null, 34 },
                    { 23, 0, false, null, 33 },
                    { 22, 0, false, null, 32 },
                    { 21, 0, false, null, 30 },
                    { 20, 0, false, null, 29 },
                    { 19, 0, false, null, 28 },
                    { 18, 0, false, null, 27 },
                    { 17, 0, false, null, 26 },
                    { 16, 0, false, null, 25 },
                    { 15, 0, false, null, 22 },
                    { 26, 0, false, null, 37 },
                    { 14, 0, false, null, 20 },
                    { 12, 0, false, null, 18 },
                    { 11, 0, false, null, 16 },
                    { 10, 0, false, null, 15 },
                    { 9, 0, false, null, 13 },
                    { 8, 0, false, null, 12 },
                    { 7, 0, false, null, 10 },
                    { 6, 0, false, null, 8 },
                    { 5, 0, false, null, 7 },
                    { 4, 0, false, null, 6 },
                    { 3, 0, false, null, 5 },
                    { 2, 0, false, null, 4 },
                    { 13, 0, false, null, 19 },
                    { 27, 0, false, null, 39 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardPlayer_PlayersId",
                table: "CardPlayer",
                column: "PlayersId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFieldInfos_PlayerId",
                table: "PropertyFieldInfos",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFieldInfos_PropertyFieldId",
                table: "PropertyFieldInfos",
                column: "PropertyFieldId",
                unique: true,
                filter: "[PropertyFieldId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardPlayer");

            migrationBuilder.DropTable(
                name: "Dices");

            migrationBuilder.DropTable(
                name: "GameInfo");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "PropertyFieldInfos");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "MonopolyFields");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
