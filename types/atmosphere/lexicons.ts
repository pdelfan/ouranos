/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
  FyiUnravelFrontpagePost: {
    lexicon: 1,
    id: 'fyi.unravel.frontpage.post',
    defs: {
      main: {
        type: 'record',
        description: 'Record containing a Frontpage post.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['title', 'url', 'createdAt'],
          properties: {
            title: {
              type: 'string',
              maxLength: 3000,
              maxGraphemes: 300,
              description: 'The title of the post.',
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'The URL of the post.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this post was originally created.',
            },
          },
        },
      },
    },
  },
  BlueLinkatBoard: {
    lexicon: 1,
    id: 'blue.linkat.board',
    defs: {
      main: {
        type: 'record',
        description: 'Record containing a cards of your profile.',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['cards'],
          properties: {
            cards: {
              type: 'array',
              description: 'List of cards in the board.',
              items: {
                type: 'ref',
                ref: 'lex:blue.linkat.board#card',
              },
            },
          },
        },
      },
      card: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'URL of the link',
          },
          text: {
            type: 'string',
            description: 'Text of the card',
          },
          emoji: {
            type: 'string',
            description: 'Emoji of the card',
          },
        },
      },
    },
  },
  ComWhtwndBlogDefs: {
    lexicon: 1,
    id: 'com.whtwnd.blog.defs',
    defs: {
      blogEntry: {
        type: 'object',
        required: ['content'],
        properties: {
          content: {
            type: 'string',
            maxLength: 100000,
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      comment: {
        type: 'object',
        required: ['content', 'entryUri'],
        properties: {
          content: {
            type: 'string',
            maxLength: 1000,
          },
          entryUri: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
      ogp: {
        type: 'object',
        required: ['url'],
        properties: {
          url: {
            type: 'string',
            format: 'uri',
          },
          width: {
            type: 'integer',
          },
          height: {
            type: 'integer',
          },
        },
      },
      blobMetadata: {
        type: 'object',
        required: ['blobref'],
        properties: {
          blobref: {
            type: 'blob',
            accept: ['*/*'],
          },
          name: {
            type: 'string',
          },
        },
      },
    },
  },
  ComWhtwndBlogEntry: {
    lexicon: 1,
    id: 'com.whtwnd.blog.entry',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of a post.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['content'],
          properties: {
            content: {
              type: 'string',
              maxLength: 100000,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            title: {
              type: 'string',
              maxLength: 1000,
            },
            ogp: {
              type: 'ref',
              ref: 'lex:com.whtwnd.blog.defs#ogp',
            },
            theme: {
              type: 'string',
              enum: ['github-light'],
            },
            blobs: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:com.whtwnd.blog.defs#blobMetadata',
              },
            },
            isDraft: {
              type: 'boolean',
              description:
                '(DEPRECATED) Marks this entry as draft to tell AppViews not to show it to anyone except for the author',
            },
            visibility: {
              type: 'string',
              enum: ['public', 'url', 'author'],
              default: 'public',
              description: 'Tells the visibility of the article to AppView.',
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict)
export const lexicons: Lexicons = new Lexicons(schemas)
export const ids = {
  FyiUnravelFrontpagePost: 'fyi.unravel.frontpage.post',
  BlueLinkatBoard: 'blue.linkat.board',
  ComWhtwndBlogDefs: 'com.whtwnd.blog.defs',
  ComWhtwndBlogEntry: 'com.whtwnd.blog.entry',
}
