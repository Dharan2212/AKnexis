export type HeritageVariant = 'mahabalipuram' | 'thiruvalluvar' | 'valluvarKottam' | 'tajMahal'

export const heritageConfig: Record<HeritageVariant, {
  label: string
  svgFile: string
  opacity: number
  position: string
}> = {
  mahabalipuram: {
    label: 'Mahabalipuram Temple',
    svgFile: 'mahabalipuram',
    opacity: 0.05,
    position: 'right',
  },
  thiruvalluvar: {
    label: 'Thiruvalluvar Statue',
    svgFile: 'thiruvalluvar',
    opacity: 0.04,
    position: 'right',
  },
  valluvarKottam: {
    label: 'Valluvar Kottam',
    svgFile: 'valluvar-kottam',
    opacity: 0.05,
    position: 'right',
  },
  tajMahal: {
    label: 'Taj Mahal',
    svgFile: 'taj-mahal',
    opacity: 0.04,
    position: 'center',
  },
}
