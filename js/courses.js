CountDownTimer('12/19/2019, 20:37:00', '10thQuest'); // 월_일_년

CountDownTimer('12/12/2019, 17:30:00', '9thQuest'); // 월_일_년 , 시간

CountDownTimer('12/5/2019, 17:30:00', '8thQuest'); // 월_일_년 , 시간

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