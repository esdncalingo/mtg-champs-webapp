export type Team = {
  id: string;
  resultText: string;
  isWinner: boolean;
  name: string;
};

export type Matchup = {
  id: number;
  name: string;
  nextMatchId?: number | null;
  participants: Team[];
};

export type EventProps = {
  id: string
  title: string
  description: string
  game_format: string
  schedule: string
  finished: boolean
}
