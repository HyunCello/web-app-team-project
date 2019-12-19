CountDownTimer('12/23/2019, 20:37:00', '10thQuest'); // 월_일_년

CountDownTimer('12/5/2019, 17:30:00', '8thQuest'); // 월_일_년 , 시간

window.onload = function() {
    MakeQuestion();
}

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

function MakeQuestion() {

}

function CommentSection() {

}


document.addEventListener(`DOMContentLoaded`, () => {
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
        console.log(`click`)
        // 민혁이에게 새로운 질문이 등록됨을 알려주고, 리스트 새로갱신

    })
})    