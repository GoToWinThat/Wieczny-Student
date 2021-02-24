#   Wieczny Student - Monopoly Game
Wieczny Student is monopoly game created under university project related to our faculty. 

## Table of contents
* [General info](#general-info)
    * [Screenshotss](#screenshots)
* [Technologies and libraries](#technologies-and-libraries)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Status](#status)
* [License](#license)
* [Contact](#contact)

## General info
Online Monopoly game created using .NET 5.0 and React 17 and other libraries. Current version is available to launch on localhost, both server and client, but we launched it on portal.azure.com (not available now)

### Screenshots
<img src="/screenshots/Logging.png" alt="First screenshot"> <img src="/screenshots/Board.png" alt="Second screenshot">
## Technologies and libraries
* ASP.NET Core 5
* Entity Framework Core 5
* React 17
* SignalR
* MediatR
* AutoMapper
* FluentValidation
* NUnit, FluentAssertions & Moq
* Newtonsoft.Json
* SQL Server

## Getting Started
The easiest way to get started is to follow few step to install all dependencies and run the projects

### Prerequisites
* npm
```sh
npm install npm@latest -g
```
* .net 5.0
[dotnet](https://dotnet.microsoft.com/download)

### Installation

1. Clone the repo
```sh
git clone https://github.com/your_username_/Project-Name.git
```
2. Install NPM packages in monopoly-app directory
```sh
npm install
```
3. Install Nuget packages in Monopoly directory
```sh
dotnet restore
```
4. Run server 
```sh
dotnet run
```
5. Run clients
```sh
npm start
```

## Usage
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 

## Features
List of features ready and TODOs for future development
* Posibility to play in four
* Typical monopoly features like buying, selling, mortage and more
* Online gameplay

To-do list:
* Code testing and improvement
* Permanently hosting on azure 
* Docker configuration
* Addnig AI to play against real players

## Status
Project is in project. We already created first version but we need to improve both client and server code for better performence and add more features from actuall game.

## License
Distributed under the MIT License.

## Contact
Created by [@mazela](artur.mazela@gmail.com) - feel free to contact me!
