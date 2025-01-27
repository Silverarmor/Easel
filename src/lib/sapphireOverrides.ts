import { PaginatedMessage } from '@sapphire/discord.js-utilities'
import { userMention, ComponentType, ButtonStyle } from 'discord.js'

export function sapphireOverrides (): void {
  PaginatedMessage.wrongUserInteractionReply = (targetUser) => `This message is for ${userMention(targetUser.id)}. Please run the command yourself to use pagination.`
  PaginatedMessage.embedFooterSeparator = ' | '
  PaginatedMessage.pageIndexPrefix = 'Page'
  PaginatedMessage.defaultActions = [
    {
      customId: '@sapphire/paginated-messages.goToPage',
      type: ComponentType.StringSelect,
      run: ({ handler, interaction }) => interaction.isStringSelectMenu() && (handler.index = parseInt(interaction.values[0], 10))
    },
    {
      customId: '@sapphire/paginated-messages.firstPage',
      style: ButtonStyle.Primary,
      label: '<<',
      type: ComponentType.Button,
      run: ({ handler }) => (handler.index = 0)
    },
    {
      customId: '@sapphire/paginated-messages.previousPage',
      style: ButtonStyle.Primary,
      label: '<',
      type: ComponentType.Button,
      run: ({ handler }) => {
        if (handler.index === 0) {
          handler.index = handler.pages.length - 1
        } else {
          --handler.index
        }
      }
    },
    {
      customId: '@sapphire/paginated-messages.nextPage',
      style: ButtonStyle.Primary,
      label: '>',
      type: ComponentType.Button,
      run: ({ handler }) => {
        if (handler.index === handler.pages.length - 1) {
          handler.index = 0
        } else {
          ++handler.index
        }
      }
    },
    {
      customId: '@sapphire/paginated-messages.goToLastPage',
      style: ButtonStyle.Primary,
      label: '>>',
      type: ComponentType.Button,
      run: ({ handler }) => (handler.index = handler.pages.length - 1)
    },
    {
      customId: '@sapphire/paginated-messages.stop',
      style: ButtonStyle.Danger,
      label: 'Stop',
      type: ComponentType.Button,
      run: ({ collector }) => {
        collector.stop()
      }
    }
  ]
}
