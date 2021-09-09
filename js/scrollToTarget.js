window.addEventListener('load', event => {
    var hash = window.location.hash;

    if (hash) {
        var name = hash.substring(1);
        var target = document.querySelector(`[name=${name}]`);

        target.click();

        var rect = target.getBoundingClientRect();

        window.scrollBy(0, rect.top - window.innerHeight / 2);
    }
})

window.addEventListener('popstate', event => {
    var hash = window.location.hash;

    if (hash) {
        var name = hash.substring(1);
        var target = document.querySelector(`[name=${name}]`);

        target.click();

        var rect = target.getBoundingClientRect();

        window.scrollBy(0, rect.top - window.innerHeight / 2);
    }
})