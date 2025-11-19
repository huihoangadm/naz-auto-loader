
(async () => {
    try {
        const correctPass = "nazbetavip";

        const pass = prompt("Nhập mật khẩu để sử dụng NAZ AUTO:");
        if (pass === null) return;

        if (pass !== correctPass) {
            alert("Sai mật khẩu!");
            return;
        }

        const PAYLOAD_URL = "REPLACE_WITH_RAW_URL_TO_ai_obf.js";

        const res = await fetch(PAYLOAD_URL, { cache: "no-store" });
        if (!res.ok) { alert("Không thể tải payload!"); return; }

        const text = await res.text();
        const match = /window\.__NAZ_PAYLOAD\s*=\s*"([^"]+)"/.exec(text);
        if (!match) { alert("Payload lỗi!"); return; }

        const decoded = atob(match[1]);
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.text = decoded;
        document.body.appendChild(s);

    } catch (err) {
        alert("Lỗi hệ thống: " + err);
        console.error(err);
    }
})();
