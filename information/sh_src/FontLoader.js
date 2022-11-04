function font_loader(font_list, cb) {
    let pchars = (() => {
        var AllChars = [];
        for (var i = 32; i < 127; i++) { AllChars.push(String.fromCharCode(i)); }
        return AllChars.join('')
    })();
    return (async () => {
        let body;
        let head;
        let pids = {};
        let fail_list = [];
        let succ_list = [];
        let sixteen = 1000 / 60;
        function kill_pid(name) {
            let pid = pids[name].pid;
            clearInterval(pid);
            delete pids[name];
        }
        while (!body) {
            body = document.querySelector('body');
            head = document.querySelector('head');
            if (body && head) { break; } else {
                await new Promise(r => { setTimeout(r, sixteen); });
            }
        }

        let cont = document.createElement('div');
        cont.style.position = 'absolute';
        cont.style.top = '0px';
        cont.style.left = '0px';
        cont.style.opacity = '0';
        cont.style.width = '0px';
        cont.style.height = '0px';
        cont.style.overflow = 'hidden';
        body.appendChild(cont);

        function generate_element() {
            let test = document.createElement('span');
            test.style.position = 'absolute';
            test.style.fontSize = '10000px';
            return test;
        }
        font_list.map(a => a.name).forEach((name) => {
            let test = generate_element();
            test.style.fontFamily = name;
            test.textContent = pchars;
            cont.appendChild(test);
            function check() {
                let { width, height } = test.getBoundingClientRect();
                return { width, height, name };
            }
            let first_size = check();
            pids[name] = {
                pid: setInterval(function () {
                    let size = check();
                    if (first_size.width !== size.width || first_size.height !== size.height) {
                        kill_pid(name);
                        if (cb) { cb(name); }
                        succ_list.push(name);
                    }
                }),
                element: test
            };
        });
        //---
        font_list.forEach(ob => {
            new FontFace(ob.name, `url(${ob.path})`).load().then(function () {
                let style = document.createElement('style');
                style.textContent = `
                @font-face {
                    font-family: '${ob.name}';
                    src: url('${ob.path}') format('${ob.path.split('.').slice(-1)[0]}');
                    font-weight: normal;
                    font-style: normal;
                }            
                `;
                head.appendChild(style);
            }).catch(function (e) {
                fail_list.push({ ob, e });
            })
        });
        while (true) {
            if (fail_list.length + succ_list.length === font_list.length) {
                break;
            } else {
                await new Promise(r => { setTimeout(r, sixteen); });
            }
        }
        Object.keys(pids).forEach(kill_pid);
        if (fail_list.length) {
            throw new Error(fail_list);
        }
        if (cont.parentElement) { cont.parentElement.removeChild(cont); }
        return true;
    })();
}