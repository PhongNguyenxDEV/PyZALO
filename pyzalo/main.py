import requests
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)
__version__ = "0.1.0"


class PyZALO:
    """
    Python client for Zalo Bot API
    
    Example:
        >>> bot = PyZALO("your_bot_token")
        >>> bot.getMe()
        {'ok': True, 'result': {...}}
    """
    
    def __init__(self, token: str, base_url: str = "https://bot-api.zaloplatforms.com"):
        self.token = token
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})

    def _post(self, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Gửi POST request đến Zalo API"""
        url = f"{self.base_url}/bot{self.token}{endpoint}"
        return self.session.post(url, json=data).json()

    def getMe(self) -> Dict[str, Any]:
        """Lấy thông tin bot"""
        return self._post("/getMe")

    def setWebhook(self, url: str, secret_token: Optional[str] = None) -> Dict[str, Any]:
        """Cài đặt webhook"""
        data = {"url": url}
        if secret_token:
            data["secret_token"] = secret_token
        return self._post("/setWebhook", data)

    def deleteWebhook(self) -> Dict[str, Any]:
        """Xóa webhook"""
        return self._post("/deleteWebhook")

    def getWebhookInfo(self) -> Dict[str, Any]:
        """Lấy thông tin webhook"""
        return self._post("/getWebhookInfo")

    def testWebhook(self) -> Dict[str, Any]:
        """Test webhook"""
        return self._post("/testWebhook")

    def getUpdates(self, timeout: int = 30, offset: Optional[int] = None) -> Dict[str, Any]:
        """Lấy danh sách tin nhắn mới"""
        data = {"timeout": timeout}
        if offset:
            data["offset"] = offset
        return self._post("/getUpdates", data)

    def sendMessage(self, chat_id: str, text: str) -> Dict[str, Any]:
        """Gửi tin nhắn văn bản"""
        return self._post("/sendMessage", {"chat_id": chat_id, "text": text})

    def sendPhoto(self, chat_id: str, photo: str, caption: Optional[str] = None) -> Dict[str, Any]:
        """Gửi ảnh"""
        data = {"chat_id": chat_id, "photo": photo}
        if caption:
            data["caption"] = caption
        return self._post("/sendPhoto", data)

    def sendSticker(self, chat_id: str, sticker: str) -> Dict[str, Any]:
        """Gửi sticker"""
        return self._post("/sendPhoto", {"chat_id": chat_id, "sticker": sticker})

    def sendVoice(self, chat_id: str, voice_url: str) -> Dict[str, Any]:
        """Gửi voice"""
        return self._post("/sendVoice", {"chat_id": chat_id, "voice_url": voice_url})

    def sendChatAction(self, chat_id: str, action: str = "typing") -> Dict[str, Any]:
        """Gửi trạng thái đang nhập"""
        return self._post("/sendChatAction", {"chat_id": chat_id, "action": action})

    def getChatID(self) -> Optional[str]:
        """
        Lấy chat_id từ tin nhắn mới nhất
        
        Returns:
            str: Chat ID nếu tìm thấy
            None: Nếu không có tin nhắn hoặc lỗi
            
        Example:
            >>> bot = PyZALO("token")
            >>> chat_id = bot.getChatID()
            >>> if chat_id:
            ...     bot.sendMessage(chat_id, "Hello!")
        """
        try:
            updates = self.getUpdates()
            if updates.get("ok") and "result" in updates:
                for update in updates["result"]:
                    if "message" in update and "chat_id" in update["message"]:
                        return update["message"]["chat_id"]
            return None
        except Exception:
            return None