fetch('/img/bg.png')
    .then(res => res.arrayBuffer())
    .then(buf => {
        const bytes = [].slice.call(new Uint8Array(buf));
        const b64 = window.btoa(bytes.reduce((a, c) => a += String.fromCharCode(c), ''));

        const e = document.querySelector("body");
        e.style["background-image"] = `url('data:image/png;base64,${b64}')`;

        document.querySelectorAll(".is-loading").forEach(e => e.classList.remove("is-loading"));
    });
