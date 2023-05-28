export const sixParticipantsTemplate = {
  'pairing_order': [2, 1, 2, 1],
  'brackets': [
    {
      "id": 1,
      "name": "Match - 1",
      "nextMatchId": 5, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "participants": []
    },
    {
      "id": 2,
      "name": "Match - 2",
      "nextMatchId": 5, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "state": "WALK_OVER",
      "participants": []
    },
    {
      "id": 3,
      "name": "Match - 3",
      "nextMatchId": 6, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "participants": []
    },
    {
      "id": 4,
      "name": "Match - 4",
      "nextMatchId": 6, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "state": "WALK_OVER",
      "participants": []
    },
    {
      "id": 5,
      "name": "Match - 5",
      "nextMatchId": 7, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "participants": []
    },
    {
      "id": 6,
      "name": "Match - 6",
      "nextMatchId": 7, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "participants": []
    },
    {
      "id": 7,
      "name": "Match - 7",
      "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      "participants": []
    }
  ]
}
