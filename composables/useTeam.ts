import type { Team } from '~/types'

export function useTeam() {
  const currentTeam = useState<Team | null>('team', () => null)

  const teamList = useState<Team[]>('teamList', () => [])

  async function fetchTeamInfo(id: string) {
    currentTeam.value = teamList.value.find((team: Team) => team.id === id) || null
  }

  async function fetchTeamList() {
    const data = [{
      id: '1',
      name: 'Team A',
    }, {
      id: '2',
      name: 'Team B',
    }, {
      id: '3',
      name: 'Team C',
    }]
    teamList.value = data
  }

  async function deleteTeam(team: Team) {
    teamList.value.splice(teamList.value.findIndex((item: Team) => item.name === team.name), 1)
  }

  return {
    currentTeam,
    teamList,
    fetchTeamInfo,
    fetchTeamList,
    deleteTeam,
  }
}
