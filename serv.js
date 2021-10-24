var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(script);
let question = document.getElementById("quest");

import { quiz } from "./questions.js";
var testQz = function () {
    this.atmd = 0;
    this.mrk = 0;
    this.qnmbr = 1;
    this.cquest = 0;
    var tquest = quiz.JS.length;
    var edn = 0;

    this.showQz = function (cque) {
        this.cquest = cque;
        if (this.cquest < tquest) {
            $("#tque").html(tquest);
            $("#perv").attr("disabled", false);
            $("#nxt").attr("disabled", false);
            $("#nbr").html(quiz.JS[this.cquest].id + '.');
            $("#attempted").html(this.atmd);


            $("#quest").html(quiz.JS[this.cquest].question);
            $("#options").html("");
            for (var key in quiz.JS[this.cquest].options[0]) {
                if (quiz.JS[this.cquest].options[0].hasOwnProperty(key)) {

                    $("#options").append(
                        "<div class='form-check border border-info bg-light p-2 mb-3'>" +
                        "<label class='form-check-label'>" +
                        "<input type='radio' class='ms-3 form-check-input' name='option'   id='q" + key + "' value='" + quiz.JS[this.cquest].options[0][key] + "'><span class='ms-2' id='optionval'>" +
                        quiz.JS[this.cquest].options[0][key] +
                        "</span></label>"
                    );
                }
            }
        }
        if (this.cquest <= 0) {
            $("#perv").attr("disabled", true);
        }
        if (this.cquest >= tquest) {
            $('#nxt').attr('disabled', true);
            $("#perv").attr("disabled", true);
            for (var i = 0; i < tquest; i++) {
                this.mrk = this.mrk + quiz.JS[i].score;
            }
            // $("#quw").hide(1000);
            // $("#quw").css('display', 'none');
            return this.disRes(this.mrk);
        }
    }

    this.disRes = function (scr) {

        $("#res").html("<h1 class='pb-4 mb-4 border-bottom border-secondary'>Total Score: &nbsp;" + scr + '/' + tquest + "</h1>");
        for (var j = 0; j < tquest; j++) {
            var res;
            if (quiz.JS[j].score == 0) {
                res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="far fa-times-circle fa-lg text-danger ms-1"></i></i>';
            } else {
                res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="far fa-check-circle fa-lg text-success ms-1"></i>';
            }
            $("#res").append(
                '<div class="font-weight-bold"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
                '<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
                '<div class="pb-3 mb-3 border-bottom border-secondary"><b>Score:</b> &nbsp;' + res +

                '</div>'

            );

        }
        edn = 1;
    }

    this.chkAns = function (option) {
        option = option.replace(/\</g, "&lt;")   //for <
        option = option.replace(/\>/g, "&gt;")   //for >
        option = option.replace(/"/g, "&quot;")

        if (option == quiz.JS[this.cquest].answer) {
            if (quiz.JS[this.cquest].score == "") {
                quiz.JS[this.cquest].score = 1;
                quiz.JS[this.cquest].status = "correct";
            }
        } else {
            quiz.JS[this.cquest].status = "wrong";
        }

    }

    this.chngQuest = function (cque) {
        this.atmd += 1
        this.cquest = this.cquest + cque;
        this.showQz(this.cquest);
        if (edn)
            $("#quw").hide(1000);
    }

}


var qfs = new testQz();

var selectedopt;
$(document).ready(function () {
    qfs.showQz(0);

    $('#options').on('change', 'input[type=radio][name=option]', function (e) {

        $(this).prop("checked", true);
        selectedopt = $(this).val();
    });



});




$('#nxt').click(function (e) {
    e.preventDefault();
    if (selectedopt) {
        qfs.chkAns(selectedopt);
    }
    qfs.chngQuest(1);
});

$('#perv').click(function (e) {
    e.preventDefault();
    if (selectedopt) {
        qfs.chkAns(selectedopt);
    }
    qfs.chngQuest(-1);
});