import { getTeamNameAndTodoList } from "./server/AppServer.js";

const $teamId = window.location.href.slice(
  window.location.href.length - 9,
  window.location.href.length
);

getTeamNameAndTodoList($teamId);
