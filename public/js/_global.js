$(document).ready(function() {
    $(".datatable")
        .DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
        })
        .destroy();
});

function loading(isLoading) {
    if (isLoading) {
        $(".loader-container").removeClass("loader-inactive");
        $(".loader-container").addClass("loader-active");
    } else {
        $(".loader-container").removeClass("loader-active");
        $(".loader-container").addClass("loader-inactive");
    }
}

function isEmpty(str) {
    return str.trim() == null || str.trim() == "" ? true : false;
}

function setDatatable(element) {
    $(element).DataTable({
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
    });
}

function post(
    opt = { url, data, isLoading },
    onSuccess = function(response) {}
) {
    if (opt.isLoading) {
        loading(true);
    }

    $.ajax({
        url: opt.url,
        method: "POST",
        data: opt.data,
        cache: false,
        success: onSuccess,
        error: function() {
            if (opt.isLoading) {
                loading(false);
            }

            alert("Error");
        },
    });
}

function get(opt = { url, isLoading }, onSuccess = function(response) {}) {
    if (opt.isLoading) {
        loading(true);
    }

    $.ajax({
        url: opt.url,
        method: "GET",
        cache: false,
        success: onSuccess,
        error: function() {
            if (opt.isLoading) {
                loading(false);
            }

            alert("Error");
        },
    });
}