export interface SpritesMap {
  sprite: 'logo-small' | 'logo'
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string
        width: number
        height: number
      }
    >
  }
} = {
  sprite: {
    filePath: 'sprite.85b99ba3.svg',
    items: {
      'logo-small': {
        viewBox: '0 0 22 26',
        width: 22,
        height: 26,
      },
      logo: {
        viewBox: '0 0 120 26',
        width: 120,
        height: 26,
      },
    },
  },
}
