/* access_controller.js
 * Version: 1.0
 * Password: nazbetavip
 */

(async () => {
    try {
        const correctPass = "nazbetavip";

        const pass = prompt("Nhập mật khẩu để sử dụng NAZ AUTO:");
        if (pass === null) return;

        if (pass !== correctPass) {
            alert("Sai mật khẩu!");
            return;
        }

        // 🔥 RAW link CHUẨN của ai_obf.js (đã sửa)
        const PAYLOAD_URL = "https://raw.githubusercontent.com/huihoangadm/naz-auto-loader/main/ai_obf.js";

        const res = await fetch(PAYLOAD_URL, { cache: "no-store" });
        if (!res.ok) {
            alert("Không thể tải payload!");
            return;
        }

        const text = await res.text();
        const match = /window\.__NAZ_PAYLOAD\s*=\s*"([^"]+)"/.exec(text);

        if (!match) {
            alert("Payload lỗi hoặc không tìm thấy.");
            return;
        }

        const decoded = atob(match[1]);

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.text = decoded;
        document.body.appendChild(script);

    } catch (err) {
        alert("Lỗi hệ thống: " + err);
        console.error(err);
    }
})();
