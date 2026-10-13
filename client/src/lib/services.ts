export interface Service {
  id: string
  index: string
  title: string
  summary: string
  detail: string
  points: string[]
}

export const services: Service[] = [
  {
    id: 'luxury-home-sales',
    index: '01',
    title: 'Luxury Home Sales',
    summary: 'Representation for architecturally significant homes.',
    detail:
      'From first valuation to closing, we manage the full sale with discreet, off-market reach and a curated buyer list.',
    points: ['Private listings', 'Architectural photography', 'Qualified buyer network'],
  },
  {
    id: 'property-investment',
    index: '02',
    title: 'Property Investment',
    summary: 'Income-producing residential assets, selected with intent.',
    detail:
      'We model yield, holding costs and exit scenarios before recommending a single address to your portfolio.',
    points: ['Yield modelling', 'Portfolio strategy', 'Market timing reports'],
  },
  {
    id: 'property-marketing',
    index: '03',
    title: 'Property Marketing',
    summary: 'Editorial campaigns built around the architecture.',
    detail:
      'Cinematic photography, film, print placements and targeted digital campaigns that position the home as a masterwork.',
    points: ['Cinematic film', 'Print & digital', 'Global syndication'],
  },
  {
    id: 'real-estate-advisory',
    index: '04',
    title: 'Real Estate Advisory',
    summary: 'Independent counsel across acquisitions and disposals.',
    detail:
      'A single senior advisor works alongside your legal and financial team from mandate through completion.',
    points: ['Acquisition counsel', 'Due diligence', 'Negotiation strategy'],
  },
  {
    id: 'property-valuation',
    index: '05',
    title: 'Property Valuation',
    summary: 'Defensible valuations grounded in real comparables.',
    detail:
      'Detailed appraisal reports for owners, lenders and estates, delivered with the evidence behind every number.',
    points: ['Appraisal reports', 'Comparable analysis', 'Lender-ready files'],
  },
  {
    id: 'relocation-services',
    index: '06',
    title: 'Relocation Services',
    summary: 'End-to-end support for international moves.',
    detail:
      'Neighbourhood briefings, school introductions, staffing and interim housing — handled before you arrive.',
    points: ['Area briefings', 'Household setup', 'Interim residences'],
  },
]
