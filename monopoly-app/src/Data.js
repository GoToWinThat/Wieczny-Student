// Corner fields and event fields consist only of the name and color. Other ones
// - property fields - have names, colors, prices for buying them and prices
// for buying a house on it. They also have list of rents which means how much
// money other player has to pay if he stand on it while the field:
// a. is with no houses,
// b. belongs to player and all other fields with the same color belongs to him,
// c. has one house,
// d. has two houses,
// e. has three houses,
// f. has a hotel.

// IMPORTANT: Some of the properties - "TOALETY" and "WINDA" cannot be improved 
// so they don't have oneHousePrice and Rent attributes. In this update there 
// is a new type for them: companies. The player has to roll the dice and pay as much
// money as the result of this roll (multiplied by something).

// IMPORTANT (2): The rooms in the university can't have "houses", so this name is temporary. 
// It will probably become "computers", "desks" or something like this.

// IMPORTANT (3): The colors need to be changed - to nicer ones, probably with using HEX codes.
// Prices for properties and houses will also be changed.

let data = [
    {
        fieldID: 0,
        type: "corner",
        name: "Portiernia",
        color: "green"
    },
    {
        fieldID: 1,
        type: "property",
        name: "Laboratorium nr 308 (MS)",
        color: "lightpink",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 2,
        type: "event",
        name: "Karta zysku",
        color: "white"
    },
    {
        fieldID: 3,
        type: "property",
        name: "Laboratorium nr 309 (MS)",
        color: "lightpink",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 4,
        type: "company",
        name: "Winda",
        color: "orange",
        price: 100,
    },
    {
        fieldID: 5,
        type: "company",
        name: "Toalety",
        color: "yellow",
        price: 100
    },
    {
        fieldID: 6,
        type: "property",
        name: "Laboratorium nr 401 (MS)",
        color: "lightblue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 7,
        type: "property",
        name: "Sala wykładowa nr 402 (MS)",
        color: "lightblue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 8,
        type: "event",
        name: "Karta straty",
        color: "white"
    },
    {
        fieldID: 9,
        type: "property",
        name: "Laboratorium nr 406 (MS)",
        color: "lightgreen",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 10,
        type: "corner",
        name: "Konsultacje",
        color: "green"
    },
    {
        fieldID: 11,
        type: "property",
        name: "Sala wykładowa nr 408 (MS)",
        color: "lightgreen",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 12,
        type: "property",
        name: "Laboratorium nr 409 (MS)",
        color: "lightgreen",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 13,
        type: "event",
        name: "Karta zysku",
        color: "white"
    },
    {
        fieldID: 14,
        type: "property",
        name: "Laboratorium nr 412 (MS)",
        color: "lightgray",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 15,
        type: "company",
        name: "Toalety",
        color: "yellow",
        price: 100
    },
    {
        fieldID: 16,
        type: "event",
        name: "Karta straty",
        color: "white"
    },
    {
        fieldID: 17,
        type: "property",
        name: "Laboratorium nr 415 (MS)",
        color: "lightgrey",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 18,
        type: "property",
        name: "Laboratorium nr 416 (MS)",
        color: "lightgrey",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 19,
        type: "property",
        name: "Sala nr 507 (MS)",
        color: "brown",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 20,
        type: "corner",
        name: "Stołówka studencka",
        color: "green"
    },
    {
        fieldID: 21,
        type: "property",
        name: "Laboratorium nr 510 (MS)",
        color: "brown",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 22,
        type: "event",
        name: "Karta zysku",
        color: "white"
    },
    {
        fieldID: 23,
        type: "event",
        name: "Karta straty",
        color: "white"
    },
    {
        fieldID: 24,
        type: "property",
        name: "Sala nr 310 (LB)",
        color: "purple",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 25,
        type: "company",
        name: "Toalety",
        color: "yellow",
        price: 100
    },
    {
        fieldID: 26,
        type: "property",
        name: "Sala nr 315 (LB)",
        color: "purple",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 27,
        type: "property",
        name: "Sala nr 425 (LB)",
        color: "violet",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 28,
        type: "property",
        name: "Sala nr 426 (LB)",
        color: "violet",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 29,
        type: "property",
        name: "Sala nr 427 (LB)",
        color: "violet",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 30,
        type: "corner",
        name: "Dziekanat",
        color: "green"
    },
    {
        fieldID: 31,
        type: "property",
        name: "Sala wykładowa: Aula C (CEK)",
        color: "blue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 32,
        type: "property",
        name: "Sala wykładowa: Aula A (CNT)",
        color: "blue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 33,
        type: "property",
        name: "Pracownia fizyczna nr 2 (CNT)",
        color: "blue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 34,
        type: "event",
        name: "Karta straty",
        color: "white"
    },
    {
        fieldID: 35,
        type: "company",
        name: "Toalety",
        color: "yellow",
        price: 100
    },
    {
        fieldID: 36,
        type: "company",
        name: "Winda",
        color: "orange",
        price: 100,
    },
    {
        fieldID: 37,
        type: "event",
        name: "Karta zysku",
        color: "white"
    },
    {
        fieldID: 38,
        type: "property",
        name: "Biblioteka wydziałowa",
        color: "lightblue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    },
    {
        fieldID: 39,
        type: "property",
        name: "Biblioteka główna",
        color: "lightblue",
        price: 100,
        rents: [10, 20, 30, 40, 50, 60],
        oneHousePrice: 10
    }
]

  export {data};
