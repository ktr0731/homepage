const f = () => {
    fetch('/img/bg.png')
        .then(res => res.arrayBuffer())
        .then(buf => {
            let binary = '';
            var bytes = [].slice.call(new Uint8Array(buf));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            const b64 = window.btoa(binary);

            const e = document.querySelector("body");
            e.style["background-image"] = `url('data:image/png;base64,${b64}')`;
            e.classList.remove("is-loading");
            document.querySelector("main").classList.remove("is-loading");
            document.querySelector("#profile").classList.remove("is-loading");
        });
}

window.setTimeout(f, 1000);
