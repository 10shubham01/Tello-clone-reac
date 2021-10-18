import axios from "axios";
const API_KEY = "4298ca93f060af6da934044bfa1ab2b2";
const API_TOKEN =
  "530264e811c33c4aa41e9471743647bf78b1d4b3e2239ab9fa1c0c11fa7c26c1";
export function getBoards() {
  return axios
    .get(
      `https://api.trello.com/1/members/me/boards?url&key=${API_KEY}&token=${API_TOKEN}`
    )
    .then((resp) => resp.data);
}

export function getOneBoards(boardId) {
  return axios
    .get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${API_TOKEN}`
    )
    .then((resp) => resp.data);
}
export function createABoard(name) {
  return axios
    .post(
      `https://api.trello.com/1/boards/?name=${name}&key=${API_KEY}&token=${API_TOKEN}`
    )
    .then((resp) => resp.data);
}
