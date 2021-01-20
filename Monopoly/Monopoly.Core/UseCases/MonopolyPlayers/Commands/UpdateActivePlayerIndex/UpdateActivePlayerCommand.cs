using Domain.Entities;
using Domain.Entities.Game;
using Domain.Entities.Static_Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdateActivePlayerIndex
{
    public class UpdateActivePlayerIndexCommand : IRequest<Tuple<bool, bool>>
    {
        public int Index { get; set; }
    }
    public class UpdateActivePlayerIndexCommandHandler : IRequestHandler<UpdateActivePlayerIndexCommand, Tuple<bool, bool>>
    {
        private IApplicationDbContext _context;

        public UpdateActivePlayerIndexCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Tuple<bool,bool>> Handle(UpdateActivePlayerIndexCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.GameInfo.FirstOrDefaultAsync(cancellationToken);
            var players = await _context.Players.ToListAsync(cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(GameInfo), request.Index);
            }
            if (players == null)
            {
                throw new NotFoundException(nameof(Player), request.Index);
            }
            //Zerujemy kostki, ustawiamy indeks, sprawdzamy stan gry
            bool isGameOver = false;
            bool wasBotPlaying = false;
            entity.ActivePlayerIndex = request.Index + 1;
            foreach (var p in players)
            {
                p.ThrownDices = false;
            }
            if(entity.GameState == MonopolyGameData.GameStates[2])
            {
                isGameOver = true;
            }
            //Zapisujemy
           // await _context.SaveChangesAsync(cancellationToken);

            //Lokalne index nastepnego gracza w kolejce
            int nextPlayerIndex = (request.Index + 1) % 4;

            while (true)
            {
                //Sprawdzamy kolejnego gracza
                var player = await _context.Players.Where(p => p.Id == nextPlayerIndex+1).FirstOrDefaultAsync(cancellationToken);
                //Jezeli moze grac
                if (player.TurnsToWait == 0)
                {
                    //I jest graczem to gramy dalej
                    if (player.IsLogged == true)
                    {
                        var entityLoop = await _context.GameInfo.FirstOrDefaultAsync(cancellationToken);
                        entityLoop.ActivePlayerIndex = nextPlayerIndex;
                        await _context.SaveChangesAsync(cancellationToken);
                        return new Tuple<bool, bool>(wasBotPlaying, isGameOver);
                    }
                    //Jezeli jest botem
                    else
                    {
                        //To rozgrywamy ture botem AI:
                        //Tutaj wstawic bota:

                        //Ustawiamy flage, że grał bot:
                        wasBotPlaying = true;
                        //Podnosimy indeks
                        nextPlayerIndex = (nextPlayerIndex + 1) % 4;
                        //Zapisujemy go w bazie
                        


                        //Kolejna pętla
                        continue;
                    }
                }
                //Gracz siedzi w wiezeniu
                else
                {
                    //Zmiejszamy jego wyrok i sprawdzamy czy wychodzi
                    player.TurnsToWait -= 1;
                    if(player.TurnsToWait==0)
                    {
                        player.IsInJail = false;
                    }
                    //Podnosimy indeks
                    nextPlayerIndex = (nextPlayerIndex + 1) % 4;
                }
            }
        }
    }
}
