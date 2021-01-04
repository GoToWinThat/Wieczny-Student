// rentCosts: no computers, 1 computer, 2 computers, 3 computers, 1 server
// all properties (without computers) from one color => rentcost = no_computers_cost * 2
// NOTE: all prices and costs base on one of the versions of monopoly (but are divided by 10)

// PLAYERS have own name and signature, position (on which field they are staying at the moment),
// amount of cash, list of bought properties (each property consists of fieldID and amount of
// bought estates (0 is no estates, 1, 2, 3 are "houses", 4 is a "hotel")) and list of collected event
// cards (only their ids, such as id of "Oświecenie na konsultacjach"). There are also attributes
// for knowing if player can make a move in this turn.

export const staticData = {
    "monopolyFields": [
        {
            "fieldID": 0,
            "type": "corner",
            "name": "Portiernia",
            "color": "seagreen"
        },
        {
            "fieldID": 1,
            "type": "property",
            "name": "Laboratorium nr 308 (MS)",
            "color": "lightpink",
            "price": 15,
            "rentCosts": [1, 4, 12, 36, 90],
            "estatePrice": 10,
            "mortgage": 6
        },
        {
            "fieldID": 2,
            "type": "event",
            "name": "Karta zysku",
            "color": "white"
        },
        {
            "fieldID": 3,
            "type": "property",
            "name": "Laboratorium nr 309 (MS)",
            "color": "lightpink",
            "price": 15,
            "rentCosts": [1, 4, 12, 36, 90],
            "estatePrice": 10,
            "mortgage": 6
        },
        {
            "fieldID": 4,
            "type": "company",
            "name": "Winda",
            "color": "orange",
            "price": 40,
            "mortgage": 20
        },
        {
            "fieldID": 5,
            "type": "company",
            "name": "Toalety",
            "color": "yellow",
            "price": 50,
            "mortgage": 20
        },
        {
            "fieldID": 6,
            "type": "property",
            "name": "Laboratorium nr 401 (MS)",
            "color": "lightblue",
            "price": 20,
            "rentCosts": [3, 12, 35, 90, 150],
            "estatePrice": 20,
            "mortgage": 15
        },
        {
            "fieldID": 7,
            "type": "property",
            "name": "Sala wykładowa nr 402 (MS)",
            "color": "lightblue",
            "price": 35,
            "rentCosts": [3, 16, 44, 160, 200],
            "estatePrice": 20,
            "mortgage": 20
        },
        {
            "fieldID": 8,
            "type": "event",
            "name": "Karta straty",
            "color": "white"
        },
        {
            "fieldID": 9,
            "type": "property",
            "name": "Laboratorium nr 406 (MS)",
            "color": "lightgreen",
            "price": 22,
            "rentCosts": [1, 6, 18, 54, 90],
            "estatePrice": 10,
            "mortgage": 10
        },
        {
            "fieldID": 10,
            "type": "corner",
            "name": "Konsultacje",
            "color": "seagreen"
        },
        {
            "fieldID": 11,
            "type": "property",
            "name": "Sala wykładowa nr 408 (MS)",
            "color": "lightgreen",
            "price": 30,
            "rentCosts": [2, 8, 20, 60, 100],
            "estatePrice": 10,
            "mortgage": 12
        },
        {
            "fieldID": 12,
            "type": "property",
            "name": "Laboratorium nr 409 (MS)",
            "color": "lightgreen",
            "price": 35,
            "rentCosts": [3, 10, 25, 70, 125],
            "estatePrice": 10,
            "mortgage": 15
        },
        {
            "fieldID": 13,
            "type": "event",
            "name": "Karta zysku",
            "color": "white"
        },
        {
            "fieldID": 14,
            "type": "property",
            "name": "Laboratorium nr 412 (MS)",
            "color": "lightgray",
            "price": 35,
            "rentCosts": [1, 12, 22, 100, 120],
            "estatePrice": 20,
            "mortgage": 14
        },
        {
            "fieldID": 15,
            "type": "company",
            "name": "Toalety",
            "color": "yellow",
            "price": 50,
            "mortgage": 20
        },
        {
            "fieldID": 16,
            "type": "event",
            "name": "Karta straty",
            "color": "white"
        },
        {
            "fieldID": 17,
            "type": "property",
            "name": "Laboratorium nr 415 (MS)",
            "color": "lightgray",
            "price": 39,
            "rentCosts": [2, 12, 22, 100, 130],
            "estatePrice": 20,
            "mortgage": 14
        },
        {
            "fieldID": 18,
            "type": "property",
            "name": "Laboratorium nr 416 (MS)",
            "color": "lightgray",
            "price": 42,
            "rentCosts": [3, 15, 25, 100, 150],
            "estatePrice": 20,
            "mortgage": 14
        },
        {
            "fieldID": 19,
            "type": "property",
            "name": "Sala nr 507 (MS)",
            "color": "brown",
            "price": 42,
            "rentCosts": [3, 15, 45, 110, 180],
            "estatePrice": 20,
            "mortgage": 22
        },
        {
            "fieldID": 20,
            "type": "corner",
            "name": "Stołówka studencka",
            "color": "seagreen"
        },
        {
            "fieldID": 21,
            "type": "property",
            "name": "Laboratorium nr 510 (MS)",
            "color": "brown",
            "price": 42,
            "rentCosts": [3, 15, 45, 110, 180],
            "estatePrice": 20,
            "mortgage": 22
        },
        {
            "fieldID": 22,
            "type": "event",
            "name": "Karta zysku",
            "color": "white"
        },
        {
            "fieldID": 23,
            "type": "event",
            "name": "Karta straty",
            "color": "white"
        },
        {
            "fieldID": 24,
            "type": "property",
            "name": "Sala nr 310 (LB)",
            "color": "darkorchid",
            "price": 45,
            "rentCosts": [3, 18, 50, 140, 210],
            "estatePrice": 20,
            "mortgage": 25
        },
        {
            "fieldID": 25,
            "type": "company",
            "name": "Toalety",
            "color": "yellow",
            "price": 50,
            "mortgage": 20
        },
        {
            "fieldID": 26,
            "type": "property",
            "name": "Sala nr 315 (LB)",
            "color": "darkorchid",
            "price": 50,
            "rentCosts": [3, 20, 60, 150, 230],
            "estatePrice": 20,
            "mortgage": 25
        },
        {
            "fieldID": 27,
            "type": "property",
            "name": "Sala nr 425 (LB)",
            "color": "indianred",
            "price": 50,
            "rentCosts": [3, 14, 40, 110, 150],
            "estatePrice": 20,
            "mortgage": 18
        },
        {
            "fieldID": 28,
            "type": "property",
            "name": "Sala nr 426 (LB)",
            "color": "indianred",
            "price": 50,
            "rentCosts": [3, 14, 40, 110, 150],
            "estatePrice": 20,
            "mortgage": 18
        },
        {
            "fieldID": 29,
            "type": "property",
            "name": "Sala nr 427 (LB)",
            "color": "indianred",
            "price": 60,
            "rentCosts": [3, 15, 45, 120, 170],
            "estatePrice": 20,
            "mortgage": 30
        },
        {
            "fieldID": 30,
            "type": "corner",
            "name": "Dziekanat",
            "color": "seagreen"
        },
        {
            "fieldID": 31,
            "type": "property",
            "name": "Aula C (CEK)",
            "color": "steelblue",
            "price": 60,
            "rentCosts": [5, 30, 90, 200, 280],
            "estatePrice": 40,
            "mortgage": 30
        },
        {
            "fieldID": 32,
            "type": "property",
            "name": "Aula A (CNT)",
            "color": "steelblue",
            "price": 60,
            "rentCosts": [6, 38, 92, 190, 250],
            "estatePrice": 40,
            "mortgage": 27
        },
        {
            "fieldID": 33,
            "type": "property",
            "name": "Pracownia fizyczna nr 2 (CNT)",
            "color": "steelblue",
            "price": 60,
            "rentCosts": [6, 40, 95, 250, 350],
            "estatePrice": 40,
            "mortgage": 27
        },
        {
            "fieldID": 34,
            "type": "event",
            "name": "Karta straty",
            "color": "white"
        },
        {
            "fieldID": 35,
            "type": "company",
            "name": "Toalety",
            "color": "yellow",
            "price": 50,
            "mortgage": 20
        },
        {
            "fieldID": 36,
            "type": "company",
            "name": "Winda",
            "color": "orange",
            "price": 40,
            "mortgage": 20
        },
        {
            "fieldID": 37,
            "type": "event",
            "name": "Karta zysku",
            "color": "white"
        },
        {
            "fieldID": 38,
            "type": "property",
            "name": "Biblioteka wydziałowa",
            "color": "lightblue",
            "price": 80,
            "rentCosts": [7, 30, 100, 200, 350],
            "estatePrice": 40,
            "mortgage": 35
        },
        {
            "fieldID": 39,
            "type": "property",
            "name": "Biblioteka główna",
            "color": "lightblue",
            "price": 80,
            "rentCosts": [10, 35, 110, 250, 400],
            "estatePrice": 40,
            "mortgage": 45
        }
    ],
    "gainCards": [
        {
            "cardID": 0,
            "cardName": "Pierwszeństwo w dziekanacie",
            "description": "Przy użyciu tej karty możesz od razu wyjść z dziekanatu nie tracąc żadnej kolejki. Zachowaj tę kartę lub sprzedaj za 10 ECTS."
        },
        {
            "cardID": 1,
            "cardName": "Oświecenie na konsultacjach",
            "description": "Pokazujesz się z dobrej strony już na początku konsultacji. Przy użyciu tej karty możesz od razu z nich wyjść, nie tracąc żadnej kolejki. Zachowaj tę kartę lub sprzedaj za 10 ECTS."
        },
        {
            "cardID": 2,
            "cardName": "Wygrana w konkursie",
            "description": "Reprezentujesz uczelnię na konkursie i wygrywasz go. Prowadzący postanowili zaliczyć Ci cały semestr. Otrzymujesz 50 ECTS."
        },
        {
            "cardID": 3,
            "cardName": "ECTSobranie",
            "description": "Grozi Ci warunek, więc jak zwykle wybierasz się na poszukiwanie ECTSów w lesie. Udaje Ci się znaleźć aż 30 ECTS!"
        },
        {
            "cardID": 4,
            "cardName": "Miss RMS / Mister RMS",
            "description": "Zyskałaś tytuł najpiękniejszej studentki / zyskałeś tytuł najprzystojniejszego studenta! Otrzymujesz w nagrodę 10 ECTS."
        },
        {
            "cardID": 5,
            "cardName": "Urodziny",
            "description": "Masz urodziny i pozostali gracze życzą Ci zdania studiów. Dostajesz od każdego z nich 5 ECTS w prezencie."
        },
        {
            "cardID": 6,
            "cardName": "Wyróżnienie przez dziekana",
            "description": "Za wyróżnianie się w nauce dziekan uznał, że zasługujesz na 100 ECTS - właśnie tyle wpływa na Twoje konto."
        },
        {
            "cardID": 7,
            "cardName": "Szczęśliwy traf",
            "description": "Samorząd Wydziału zorganizował grę losową, w której do wygrania było 20 ECTS. Udało Ci się je wygrać!"
        },
        {
            "cardID": 8,
            "cardName": "Znajomości na stołówce",
            "description": "Znajomy pracujący na stołówce studenckiej obiecał Ci, że obsłuży Cię bez kolejki, więc nie musisz tam czekać. Zachowaj tę kartę lub sprzedaj za 5 ECTS."
        },
        {
            "cardID": 9,
            "cardName": "O, pinć ECTSów!",
            "description": "Idziesz sobie po korytarzu aż nagle zauważasz, że na podłodze leży 5 ECTSów. Nikogo w pobliżu nie ma, więc bierzesz je dla siebie."
        }
    ],
    "lossCards": [
        {
            "cardID": 10,
            "cardName": "Zapomniany klucz",
            "description": "Prowadzący zapomniał zabrać klucza z portierni. Poprosił Cię o zejście na dół i przyniesienie go. Wracasz na pole PORTIERNIA."
        },
        {
            "cardID": 11,
            "cardName": "Zapłata rachunków",
            "description": "Musisz zapłacić za prąd, internet i licencje programów. Za każde posiadane pole płacisz 10 ECTS."
        },
        {
            "cardID": 12,
            "cardName": "Warunek",
            "description": "W tym semestrze nie szło Ci zbyt dobrze w nauce i musisz zapłacić za zaliczenie warunkowe. Płacisz 30 ECTS."
        },
        {
            "cardID": 13,
            "cardName": "Formalności",
            "description": "Zaszła potrzeba wyjaśnienia przez Ciebie pewnej sytuacji. Niezwłocznie się udajesz się na pole DZIEKANAT."
        },
        {
            "cardID": 14,
            "cardName": "Douczanie się",
            "description": "Niestety materiał na wykładzie okazał się być zbyt trudny i musisz udać się na pole KONSULTACJE."
        },
        {
            "cardID": 15,
            "cardName": "Głód",
            "description": "Dopadł Cię głód. Niezwłocznie udajesz się na pole STOŁÓWKA STUDENCKA."
        },
        {
            "cardID": 16,
            "cardName": "Spłata pożyczki",
            "description": "W poprzednim semestrze znajomy pomógł Ci, pożyczając pewną sumę ECTSów. Teraz musisz mu wszystko oddać. Płacisz 20 ECTS."
        },
        {
            "cardID": 17,
            "cardName": "Gdybym był bogaty",
            "description": "Uznałeś / Uznałaś, że masz za dużo ECTSów i oddajesz każdemu nietracącemu kolejki graczowi kwotę 5 ECTS."
        },
        {
            "cardID": 18,
            "cardName": "Dziura w kieszeni",
            "description": "Niedawno zarobione pieniądze wkładasz do kieszeni. Niestety ta okazuje się posiadać dziurę w sobie. Tracisz 5 ECTS."
        },
        {
            "cardID": 19,
            "cardName": "Spóźnienie",
            "description": "Zajęcia trwały zbyt długo i odjechał Ci autobus. Tracisz kolejkę."
        }
    ]
}

export const dynamicData = {
    "players": [
        {
            "name": "Artur",
            "cash": 1000,
            "signature": "9772",
            "color": "blue",
            "properties": [
                { "fieldID": 39, "estateLevel": 3, "mortgaged": false },
                { "fieldID": 3, "estateLevel": 4, "mortgaged": false }
            ],
            "eventCards": [],
            "position": 0,
            "isInJail": false,
            "turnsToWait": 0
        },
        {
            "name": "Łukasz",
            "cash": 1000,
            "signature": "9762",
            "color": "red",
            "properties": [
                { "fieldID": 4, "estateLevel": 0, "mortgaged": false },
                { "fieldID": 6, "estateLevel": 1, "mortgaged": false }
            ],
            "eventCards": [],
            "position": 0,
            "isInJail": false,
            "turnsToWait": 0
        },
        {
            "name": "Kamil",
            "cash": 1000,
            "signature": "9823",
            "color": "orange",
            "properties": [
                { "fieldID": 21, "estateLevel": 1, "mortgaged": false },
                { "fieldID": 19, "estateLevel": 3, "mortgaged": false }
            ],
            "eventCards": [
                { "cardID": 0 },
                { "cardID": 1 }
            ],
            "position": 0,
            "isInJail": false,
            "turnsToWait": 0
        },
        {
            "name": "Dariusz",
            "cash": 1000,
            "signature": "9784",
            "color": "green",
            "properties": [],
            "eventCards": [],
            "position": 0,
            "isInJail": false,
            "turnsToWait": 0
        }
    ],
    "dices": [1,1],
    "activePlayerIndex": 0,
    "logs": []
}