export const runtime = 'edge';

const questions = [
  {
    id: 1,
    text: "HTML에서 \\n의 의미는 무엇인가요?",
    options: ["줄바꿈을 의미합니다", "새로운 단락을 의미합니다", "이름을 의미합니다"],
    correctAnswer: 0,
    explanation: "HTML에서 \\n은 줄바꿈(새 줄)을 의미하는 이스케이프 문자입니다. 텍스트에서 다음 줄로 이동할 때 사용됩니다.",
    category: "HTML"
  },
  {
    id: 2,
    text: "웹 페이지에서 'hover'는 어떤 상태를 의미하나요?",
    options: ["클릭된 상태", "마우스가 올라간 상태", "선택된 상태"],
    correctAnswer: 1,
    explanation: "hover는 마우스 커서가 특정 요소 위에 올라간 상태를 의미합니다. CSS에서 :hover 선택자로 이 상태를 스타일링할 수 있습니다.",
    category: "CSS"
  },
  {
    id: 3,
    text: "브라우저 탭에 표시되는 작은 아이콘인 'Favicon'은 무엇인가요?",
    options: ["웹사이트의 대표 아이콘", "즐겨찾기 버튼", "새로고침 아이콘"],
    correctAnswer: 0,
    explanation: "Favicon은 웹사이트를 대표하는 작은 아이콘으로, 브라우저 탭이나 즐겨찾기 목록에 표시됩니다.",
    category: "HTML"
  },
  {
    id: 4,
    text: "CSS에서 margin과 padding의 차이는 무엇인가요?",
    options: ["margin은 내부 여백, padding은 외부 여백", "margin은 외부 여백, padding은 내부 여백", "둘 다 같은 의미"],
    correctAnswer: 1,
    explanation: "margin은 요소의 외부 여백(요소와 다른 요소 사이의 간격)이고, padding은 요소의 내부 여백(요소의 내용과 테두리 사이의 간격)입니다.",
    category: "CSS"
  },
  {
    id: 5,
    text: "JavaScript에서 alert() 함수는 어떤 역할을 하나요?",
    options: ["경고 메시지를 표시합니다", "페이지를 새로고침합니다", "콘솔에 메시지를 출력합니다"],
    correctAnswer: 0,
    explanation: "alert() 함수는 브라우저에서 경고 대화상자를 표시하여 사용자에게 메시지를 전달합니다.",
    category: "JavaScript"
  },
  {
    id: 6,
    text: "웹 개발에서 '클라이언트'와 '서버'는 각각 어떤 역할을 하나요?",
    options: ["클라이언트는 서비스를 제공하고, 서버는 요청을 합니다", "클라이언트는 요청을 하고, 서버는 서비스를 제공합니다", "둘 다 같은 역할을 합니다"],
    correctAnswer: 1,
    explanation: "클라이언트는 서비스를 요청하는 쪽(브라우저, 앱 등)이고, 서버는 요청을 받아 서비스를 제공하는 쪽입니다.",
    category: "Web Development"
  },
  {
    id: 7,
    text: "div 태그는 어떤 용도로 사용되나요?",
    options: ["이미지를 삽입할 때", "영역을 나누거나 그룹화할 때", "링크를 만들 때"],
    correctAnswer: 1,
    explanation: "div 태그는 HTML에서 영역을 나누거나 요소들을 그룹화하는 컨테이너 역할을 합니다.",
    category: "HTML"
  },
  {
    id: 8,
    text: "HTML 문서에서 <head>와 <body>의 차이는 무엇인가요?",
    options: ["head는 화면에 표시되는 내용, body는 메타 정보", "head는 메타 정보, body는 화면에 표시되는 내용", "둘 다 같은 역할"],
    correctAnswer: 1,
    explanation: "<head>는 문서의 메타 정보(제목, 스타일, 스크립트 등)를 포함하고, <body>는 실제로 화면에 표시되는 내용을 포함합니다.",
    category: "HTML"
  },
  {
    id: 9,
    text: "console.log()는 언제 사용하나요?",
    options: ["사용자에게 메시지를 표시할 때", "디버깅을 위해 콘솔에 정보를 출력할 때", "페이지를 새로고침할 때"],
    correctAnswer: 1,
    explanation: "console.log()는 개발자가 디버깅을 위해 브라우저의 개발자 도구 콘솔에 정보를 출력하는 함수입니다.",
    category: "JavaScript"
  },
  {
    id: 10,
    text: "웹 페이지에서 링크를 걸 때 사용하는 태그는 무엇인가요?",
    options: ["<link> 태그", "<a> 태그", "<url> 태그"],
    correctAnswer: 1,
    explanation: "<a> 태그는 anchor의 줄임말로, 웹 페이지에서 다른 페이지나 위치로 이동하는 링크를 만들 때 사용합니다.",
    category: "HTML"
  }
];

export default function handler(req: Request) {
  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 