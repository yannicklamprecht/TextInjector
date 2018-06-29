const language = "de_de";
const fallbackLanguage = "en_us";

window.onload = () => {
    $(document).ready(function () {
        $.getScript("/l18n/en_us.js", () => {

            $.getScript("/l18n/de_de.js", () => {


                let dir = "/parts/";
                let fileextension = ".html";

                loopFiles(dir, fileextension, (data) => {
                    $("#content").append(data);
                    inject(data);
                });
            });
        });
    });
};


let loopFiles = (dir, fileextension, callback) => {
    jQuery.ajaxSetup({async: false}); //if order matters

    $.ajax({
        url: dir,
        success: function (data) {
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                let filename = this.href.replace(window.location.host, "").replace("http:///", "");
                $.get(filename, '', function (data) {
                    callback(data);
                });
            });
        }
    });
    jQuery.ajaxSetup({async: true});  //if order matters
};

let getTextForId = (id) => {
    return (eval("messages_" + language)[id] !== undefined) ? eval("messages_" + language)[id] : eval("messages_" + fallbackLanguage)[id];
};

let inject = (subContent) => {
    $(subContent).find(".inject_text").each(function () {
        $("#" + this.id).text(getTextForId(this.id + "_text"));
    });

    $(subContent).find(".inject_placeholder").each(function () {
        $("#" + this.id).attr("placeholder", getTextForId(this.id + "_placeholder"));
    });
};

