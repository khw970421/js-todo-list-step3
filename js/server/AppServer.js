import {
  loadMemberList,
  makeAddList,
  addMemberEvent,
} from "../App/AddMemberEvent.js";
import { $baseUrl, kanbanHeader } from "../content/shape.js";

let $domTodoAppListContainer;

function responseMemberApi($teamId) {
  fetch(`${$baseUrl}api/teams/${$teamId}`)
    .then((response) => response.json())
    .then((data) => {
      document.body.innerHTML += kanbanHeader(data.name);
      $domTodoAppListContainer = document.querySelector(
        ".todoapp-list-container"
      );
      makeAddList($domTodoAppListContainer);
      addMemberEvent($teamId);
      let but = document.querySelector(".add-user-button-container");
      data.members.forEach((arr) => {
        loadMemberList(arr.name, but, arr.todoList, $teamId, arr._id);
      });
    });
}

function addMember(teamName, teamId) {
  fetch(`${$baseUrl}api/teams/${teamId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `${teamName}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(() => "오류 발생");
}

// 삭제버튼 클릭시 해당 TODOLIST의 item삭제하는 DELETE_TODOLIST함수 실행
function getUserIdAndDeleteTodolist(teamId, memberId, itemId) {
  fetch(`${$baseUrl}api/teams/${teamId}/members/${memberId}/items/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function putServerIsCompleted(teamId, memberId, itemId, IsCompleted) {
  fetch(
    `${$baseUrl}api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isCompleted: IsCompleted,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export {
  addMember,
  responseMemberApi,
  getUserIdAndDeleteTodolist,
  putServerIsCompleted,
};
