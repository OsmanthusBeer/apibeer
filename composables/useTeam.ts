import type { Team } from '~/types'

export function useTeam() {
  const currentTeam = useState<Team | null>('team', () => null)

  const teamList = useState<Team[]>('teamList', () => [])

  async function fetchTeamList() {
    const data = [{
      name: 'Team A',
    }, {
      name: 'Team B',
    }, {
      name: 'Team C',
    }]
    teamList.value = data
  }

  async function selectTeam(team: Team) {
    currentTeam.value = team
  }

  async function deleteTeam(team: Team) {
    teamList.value.splice(teamList.value.findIndex((item: Team) => item.name === team.name), 1)
  }

  return {
    currentTeam,
    teamList,
    fetchTeamList,
    selectTeam,
    deleteTeam,
  }
}
