
// Основные скрипты

var param = {
    windowWidth: 0,
    windowHeight: 0,
    minheaderHeight: 600
};
var block = {
    header: $('header')
};

function setDynamicParams() {
    param.windowWidth = $(window).width();
    param.windowHeight = $(window).height();
}

$(document).ready(function () {
    setDynamicParams();
});

$(window).resize(function () {
    setDynamicParams();
});