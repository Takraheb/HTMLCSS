export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  email: string
  phone: string
  bio: string
}

/**
 * Team and agent records share one source: every property references an
 * `agentId`, so the person shown on a detail page is the same record as the
 * team grid. Swap this module for a database query when a backend lands.
 */
export const team: TeamMember[] = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    photo: '1560250097-0b93528c311a',
    email: 'daniel.morgan@horizonproperties.com',
    phone: '(555) 246-7890',
    bio: 'Eighteen years guiding premium residential transactions, with a focus on architecturally significant homes.',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    photo: '1573496359142-b8d87734a5a2',
    email: 'olivia.carter@horizonproperties.com',
    phone: '(555) 246-7891',
    bio: 'Specialises in waterfront and glass-house architecture across the Californian coast.',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    photo: '1519085360753-af0119f7cbe7',
    email: 'james.wilson@horizonproperties.com',
    phone: '(555) 246-7892',
    bio: 'Advises private clients on income-producing residential assets and portfolio diversification.',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    photo: '1580489944761-15a19d654956',
    email: 'sophia.bennett@horizonproperties.com',
    phone: '(555) 246-7893',
    bio: 'Represents desert and hillside estates, pairing buyers with architects and interior studios.',
  },
]

export function getAgent(id: string): TeamMember {
  return team.find((member) => member.id === id) ?? team[0]
}
