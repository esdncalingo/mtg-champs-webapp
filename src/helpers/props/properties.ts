export type Team = {
  id: string;
  resultText: string;
  isWinner: boolean;
  name: string;
};

export type Matchup = {
  id: number | null;
  name: string;
  nextMatchId?: number | null;
  participants: Team[];
};

export type ParticipantProps = {
  event_id: number | null
  status: string
  name: string
  cards: any
  game_format: string
}

export type EventProps = {
  id: string
  title: string
  description: string
  game_format: string
  schedule: string
  finished: boolean
}

export type TemplateBracketsProps = {
  four_participants: any,
  six_participants: any,
  eight_participants: any,
  sixteen_participants: any
}

export type PopupMessage = {
  message: string;
  fail: boolean;
};

export type isLogInProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}