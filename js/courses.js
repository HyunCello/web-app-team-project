// CountDownTimer('12/23/2019, 20:37:00', '10thQuest'); // 월_일_년

// CountDownTimer('12/5/2019, 17:30:00', '8thQuest'); // 월_일_년 , 시간


function CountDownTimer(dt, id) 
{
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            // clearInterval(timer);
            // document.getElementById(id).innerHTML = 'EXPIRED!';

            return ;
        }

        document.getElementById(id).innerHTML = Date;
        // var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = 'It will be shown after ';
        document.getElementById(id).innerHTML += hours + ': ';
        document.getElementById(id).innerHTML += minutes + ': ';
        document.getElementById(id).innerHTML += seconds + '';
    }

    timer = setInterval(showRemaining, 1000);
    
}

document.addEventListener(`DOMContentLoaded`, async () => {
    // db에서 1% 문제 받아오기
    const data = await getQuestionData();
    createQuestionList(data);

    // db로 댓글 관련 데이터 보내기
    sendComment();

    // 버그 수정 (슬라이드 메뉴 다시 클릭시 보이던 버그)
    document.querySelectorAll(`#tab > div`).forEach(each => {
        each.addEventListener(`click`, event => {
            const questionSlide = document.querySelector(`#question`)
            if (event.target.dataset.tab !== `question`) {
                questionSlide.style.display = `none`
            }
        }, false)
    })

    // ADD 버튼 클릭했을 때
    document.querySelector(`#make_question`).addEventListener(`click`, event => {
        event.stopPropagation()
        const modal = document.querySelector(`.modal-make-question-wrap`)    
        
        modal.classList.remove(`hide`)
        modal.classList.add(`show`)
    })

    // ADD 모달창 종료시 (뒤 검은 배경 클릭했을 때)
    document.querySelector(`.modal-make-question-wrap`).addEventListener(`click`, event => {    
        if (event.target.classList.contains(`modal-make-question-wrap`)) {
            const modal = document.querySelector(`.modal-make-question-wrap`)    
        
            modal.classList.remove(`show`)
            modal.classList.add(`hide`)        
        }        
    }, true)

    // Register Button 클릭했을 때 (서버로 요청 보내기)
    document.querySelector(`.btn-quest-submit`).addEventListener(`click`, event => {
        // 민혁이에게 새로운 질문이 등록됨을 알려주고, 리스트 새로갱신
        const modal = document.querySelector(`.modal-make-question-wrap`)    
        const title = document.querySelector(".type-title").value;
        const content = document.querySelector(".type-quest-content").value;
        const duedate = document.querySelector("#type-quest-deadline").value;
        console.log(content, duedate, title)
        postQuestionData(content, duedate, title);

        modal.classList.remove(`show`)
        modal.classList.add(`hide`)        
    })
})

// db에서 문제 정보 가져옴, 댓글
function getQuestionData() {
    return new Promise(resolve => {
        const serverUrl = 'http://35.206.218.100:5000/graphql'
        const query = {
            query: `{
                problems {
                  id
                  title
                  content
                  dueDate
                }
                
                comments{
                    username
                    password
                    content
                    registeredDate
                    problemId
                  }
              }`
        };
    
    
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', serverUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            resolve(xhr.response)
        };
    
        xhr.send(JSON.stringify(query));
    })    
}

function createQuestionList(data) {
    const parent = document.querySelector(`#question`);
    
    console.log(data, data[`data`][`problems`][0][`title`])
    for (let i = 0;i < data[`data`][`problems`].length;i++) {
        parent.innerHTML += `
    <div class="wrap-subcontent" data-num="${data[`data`][`problems`].length - i}">
           <div class="question">
            <h3>${data[`data`][`problems`][i][`title`]}</h3>
            <p>${data[`data`][`problems`][i][`content`]}</p>
          </div>

          <div class="commentsect">
            <div class="comments">

              <div class="comment_format">
                  <div class="field"><input type="text" placeholder="Enter name" name="id">
                  <input type="password" placeholder="Enter password" name="password">
                <span>comments</span></div>
                  <textarea rows="4" cols="30" placeholder="Your comment" name="comment" id="comment"></textarea>
                  <div class="submit"><button type="submit" class="leave_comment">Leave comment</button></div>
              </div>

              <div class="comment_list">
                <ul>

                </ul>
              </div>

            </div>

          </div> 

        </div>
    `
    createCommentList(data);
    }
    
}

function createCommentList(data) {
    const parents = document.querySelectorAll(".comment_list ul");
    const lastParent = parents[parents.length - 1]
    for (let i = 0;i < data[`data`][`comments`].length;i++) {        
        if (data[`data`][`comments`][i][`problemId`] == lastParent.closest(`.wrap-subcontent`).dataset.num) {
            lastParent.innerHTML += `
            <li>${data[`data`][`comments`][i][`username`]}, ${data[`data`][`comments`][i][`content`]}, ${data[`data`][`comments`][i][`registeredDate`]}</li>
            `
        }        
    }
}

function sendComment(data) {
    document.querySelectorAll(`.wrap-subcontent`).forEach(quest => {
        quest.addEventListener(`click`, event => {
            const target = event.currentTarget;
            const id = target.querySelector("[name='id']").value;
            const password = target.querySelector("[name='password']").value;
            const comment = target.querySelector("[name='comment']").value;
            const pid = target.dataset.num
            if (event.target.classList.contains("leave_comment")){
                console.log("click");
                console.dir(target);
                postCommentData(comment, password, pid, id);
            }
        });
    })
}

function postCommentData(comment, password, pid, id) {
    console.log(comment, password, pid, id);
    return new Promise(resolve => {
        const serverUrl = 'http://35.206.218.100:5000/graphql'
        const query = {
            query: `mutation {
                createComment(
                  content: "${comment}", 
                  password: "${password}", 
                  problemId: ${pid}, 
                  username: "${id}"
                ){
                  id
                  username
                  password
                  content
                  registeredDate
                  problemId
                }
              }`
        };
    
    
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', serverUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            resolve(xhr.response)
        };
        
        xhr.send(JSON.stringify(query));
    })    
}

function postQuestionData(content, duedate, title) {
    return new Promise(resolve => {
        const serverUrl = 'http://35.206.218.100:5000/graphql'
        const query = {
            query: `mutation {
                createProblem(
                  accessToken: "yes",
                  content: "${content}", 
                  dueDate: "${duedate}", 
                  title: "${title}", 
                ){
                  title
                  dueDate
                  content
                }
              }`
        };
    
    
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', serverUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            resolve(xhr.response)
        };
        
        xhr.send(JSON.stringify(query));
    })    
}
