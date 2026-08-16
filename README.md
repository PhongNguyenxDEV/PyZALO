# PyZALO

![Logo](https://raw.githubusercontent.com/PhongNguyenxDEV/PyZALO/refs/heads/main/assets/Logo.png)

**PyZALO** là thư viện mã nguồn mở giúp bạn tạo Bot OA ZALO một cách dễ dàng bằng Python.

---

## 🎯 Tại sao chọn PyZALO?

- ❤️ **Yêu Python, ghét Node.js** - Viết bot Zalo bằng Python thay vì JavaScript
- 😫 **Mỏi tay?** - PyZALO rút gọn code, không cần viết dài dòng
- 🚀 **Tối ưu** - Giải pháp đơn giản nhất cho Python developers

---

## ⚠️ Lưu ý

> **Thư viện được viết 100% bằng Python nên tốc độ có thể chậm hơn so với bản chính thức.**
> 
> **Rất xin lỗi vì sự bất tiện này!** 🙏

---

## 📖 Tài liệu tham khảo

Tài liệu chính thức của Zalo OA Bot:
👉 [https://bot.zaloplatforms.com/docs/](https://bot.zaloplatforms.com/docs/)

---

## 🔧 Cách mở OA ZALO Bot

Quét mã QR sau để tạo bot:

![QR Code](https://raw.githubusercontent.com/PhongNguyenxDEV/PyZALO/refs/heads/main/assets/OA_qrcode.jpg)

Sau đó nhấn **Tạo Bot** và làm theo hướng dẫn của Zalo.

---

## 💻 Cài đặt

### Yêu cầu hệ thống
- Python >= 3.9

### Cài đặt thư viện

```bash
pip install PyZALO
Tất cả các thư viện phụ thuộc sẽ được tự động cài đặt!

Cài đặt với các tính năng phát triển
bash
# Cài đặt với dependencies cho development
pip install PyZALO[dev]
🚀 Ví dụ nhanh
python
from pyzalo import ZaloBot

# Khởi tạo bot
bot = ZaloBot(api_key="your_api_key")

# Gửi tin nhắn
bot.send_message("Xin chào! Tôi là bot Zalo 🎉")
📦 Dependencies
PyZALO tự động cài các thư viện sau:

Thư viện	Phiên bản	Mục đích
requests	>=2.28.0	Gọi API HTTP
websocket-client	>=1.4.0	Kết nối WebSocket
pillow	>=9.0.0	Xử lý ảnh
qrcode	>=7.4.0	Tạo QR code
python-dotenv	>=1.0.0	Quản lý biến môi trường
aiohttp	>=3.8.0	HTTP async
pydantic	>=2.0.0	Validation dữ liệu
loguru	>=0.7.0	Logging đẹp
🤝 Đóng góp
Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

💖 Lời cảm ơn
YÊU BẠN YÊU TÔI YÊU MỌI NGƯỜI ❤️

Btw, hãy follow tôi trên TikTok nhé! 😘

👤 Tác giả
PhongVeChai (PhongNguyenxDEV)

📄 License
MIT License - Xem file LICENSE để biết thêm chi tiết.
