// (() => {
let cachedBackgrounds = [];
const bgs = ['bg1.png', 'bg2.png', 'bg3.png', 'bg4.png', 'bg5.png'];
const e1 = document.querySelector("#bg1");
const e2 = document.querySelector("#bg2");

const init = () => {
    // shuffle the order of backgrounds
    for (let i = 0; i < bgs.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [bgs[i], bgs[j]] = [bgs[j], bgs[i]];
    }

    return fetch(`/img/${bgs[0]}`)
        .then(res => res.arrayBuffer())
        .then(buf => {
            const bytes = [].slice.call(new Uint8Array(buf));
            const b64 = window.btoa(bytes.reduce((a, c) => a += String.fromCharCode(c), ''));

            cachedBackgrounds[0] = `url('data:image/png;base64,${b64}')`;
            e1.style["background-image"] = cachedBackgrounds[0];

            document.querySelectorAll(".is-loading").forEach(e => e.classList.remove("is-loading"));
        });
};

const next = () => {
    let i = 1;
    let flag = true;

    return () => {
        new Promise((resolve, reject) => {
            if (!cachedBackgrounds[i]) {
                return fetch(`/img/${bgs[i]}`)
                    .then(res => res.arrayBuffer())
                    .then(buf => {
                        const bytes = [].slice.call(new Uint8Array(buf));
                        const b64 = window.btoa(bytes.reduce((a, c) => a += String.fromCharCode(c), ''));

                        cachedBackgrounds[i] = `url('data:image/png;base64,${b64}')`;
                        return resolve(cachedBackgrounds[i]);
                    });
            } else {
                return resolve(cachedBackgrounds[i]);
            }
        })
            .then(url => {
                const [bg1, bg2] = flag ? [e1, e2] : [e2, e1];
                bg1.style["opacity"] = 0;
                bg2.style["background-image"] = url;
                bg2.style["opacity"] = 1;
                flag = !flag;
                i = (i + 1) % bgs.length;
            });
    };
};

init();
window.setInterval(next(), 5000);
// })();
