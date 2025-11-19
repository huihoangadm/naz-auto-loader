// access_controller_PRO.js
// PRO loader with password-based decryption and integrity check
// Password: (kept by you) - current password used to encrypt payload: nazbetavip
(async () => {
    try {
        const PASS_PROMPT = "Nhập mật khẩu để sử dụng NAZ AUTO (PRO):";
        const pass = prompt(PASS_PROMPT);
        if (pass === null) return;

        // compute key = sha256(password)
        const enc = new TextEncoder().encode(pass);
        const keyBuf = await crypto.subtle.digest('SHA-256', enc);
        const key = new Uint8Array(keyBuf);

        // Update this PAYLOAD_URL to the raw URL where you host payload_PRO.js
        const PAYLOAD_URL = "REPLACE_WITH_RAW_URL_TO_payload_PRO.js";

        const res = await fetch(PAYLOAD_URL, { cache: "no-store" });
        if (!res.ok) {
            alert("Không thể tải payload: " + res.status);
            return;
        }
        const text = await res.text();
        const m = /window\.__NAZ_PAYLOAD\s*=\s*"([^"]+)"/.exec(text);
        const check = /window\.__NAZ_PAYLOAD_CHECK\s*=\s*"([^"]+)"/.exec(text);
        if (!m || !check) {
            alert("Payload không hợp lệ.");
            return;
        }
        const b64 = m[1];
        const expected_hex = check[1];

        // decode base64 to bytes
        const raw = atob(b64);
        const encBytes = new Uint8Array(raw.length);
        for (let i=0;i<raw.length;i++) encBytes[i] = raw.charCodeAt(i);

        // xor-decrypt with key
        const out = new Uint8Array(encBytes.length);
        for (let i=0;i<encBytes.length;i++) {
            out[i] = encBytes[i] ^ key[i % key.length];
        }

        // compute sha256 of decoded payload for integrity
        const digestBuf = await crypto.subtle.digest('SHA-256', out);
        const digestArr = Array.from(new Uint8Array(digestBuf));
        const hex = digestArr.map(b=>b.toString(16).padStart(2,'0')).join('');
        if (hex !== expected_hex) {
            alert("Payload integrity check failed. Mã hóa không hợp lệ hoặc mật khẩu sai.");
            return;
        }

        // decode UTF-8 and run
        const decoded = new TextDecoder().decode(out);
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.text = decoded;
        document.body.appendChild(s);

    } catch (e) {
        console.error(e);
        alert("Lỗi khi tải script: " + e.message);
    }
})();
