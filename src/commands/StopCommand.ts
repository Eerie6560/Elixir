import {Client, CommandInteraction, GuildMember} from "discord.js";
import {ICommand} from "../interfaces/ICommand";
import {Queue} from "discord-player";
import {player} from "../Elixir";
import EmbedUtil from "../utils/EmbedUtil";
import Logger from "../Logger";
import MusicPlayer from "../utils/MusicPlayer";
import Utilities from "../utils/Utilities";

export default class StopCommand implements ICommand {

    public name: string = "stop";
    public description: string = "Stop the queue & remove Elixir from the voice channel.";
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<any> {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            try {
                const queue: Queue = player.getQueue(interaction.guild);
                const member = interaction.member;
                if (member instanceof GuildMember) {
                    if (!queue) {
                        const embed = EmbedUtil.getErrorEmbed("There's no queue in this server.");
                        return void await interaction.reply({embeds: [embed]});
                    } else if (!member.voice.channel) {
                        const embed = EmbedUtil.getErrorEmbed("You must be in a voice channel.");
                        return void await interaction.reply({embeds: [embed]});
                    } else {
                        MusicPlayer.setPlaying(queue, false);
                        queue.connection.voiceConnection.disconnect();
                        queue.stop();
                        const embed = EmbedUtil.getDefaultEmbed("Cleared the queue and left the voice channel.");
                        return void await interaction.reply({embeds: [embed]});
                    }
                } else {
                    return void await interaction.reply({content: "This command must be run in a guild."});
                }
            } catch (error: any) {
                Logger.error(error);
                //Utilities.sendWebhookMessage(error, true, interaction.guild.id);
                const embed = EmbedUtil.getErrorEmbed("An error occurred while running this command.");
                return void await interaction.reply({embeds: [embed]});
            }
        }
    }

    public getSlashData(): object {
        return this.slashData;
    }

    public slashData: object = {
        name: this.name,
        description: this.description
    };
}