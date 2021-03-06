/****************************************
 *
 *   Help: Command for Suzu
 *   Copyright (C) 2019 Designed and Programed by Ree and ServerLion
 *   Command brought from AleeBot
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * *************************************/
const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message) => {
  const categories = [];
  const commands = Array.from(client.commands.keys());
  const settings = require('../settings.json')
  commands.forEach(function(x) {
    if (!categories.includes(client.commands.get(x).help.category)) {
      categories.push(client.commands.get(x).help.category);
    }
  });

  if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.reply('ERROR: AleeBot doesn\'t have the permission to send embed links please enable them to use the full help.');
  const embed = new Discord.RichEmbed()
    .setAuthor(`Suzu Help and on ${client.guilds.size} servers`, client.user.avatarURL)
    .setDescription('Every command you input into Suzu is `' + require('../settings.json').prefix + '`')
    .setColor(0x16ff00)
    .setFooter('Designed and Programed by Swingin30, Alee and ServerLion Copyright 2019, Licensed with GPL-3.0');

  categories.forEach(function(x) {
    let cat = '';
    commands.forEach(function(command) {
      if (client.commands.get(command).help.category == x) {
        cat = cat + command + '\n';
      }
    });
    embed.addField(x, cat, true);
  });

  await message.channel.send({ embed });
};

exports.conf = {
  aliases: ['h'],
  guildOnly: false,
};
exports.help = {
  name: 'help',
  description: 'Displays all the commands or a page with information for 1 command.',
  usage: 'help (command:command-name)',
  category: '- Utility Commands',
};
