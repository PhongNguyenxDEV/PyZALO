import requests
from typing import Optional, Dict, Any
import logging
logger = logging.getLogger(__name__)
__version__ = "0.1.0"


class PyZALO:
    def __init__(self, token: str, base_url: str = "https://bot-api.zaloplatforms.com"):
        self.token = token
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})
        self.base_url = base_url

    def _post(self, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        url = f"{self.base_url}/bot{self.token}{endpoint}"
        return self.session.post(url, json=data).json()

    def getMe(self):
        return self._post("/getMe")

    def setWebhook(self, url: str, secret_token: Optional[str] = None):
        data = {"url": url}
        if secret_token:
            data["secret_token"] = secret_token
        return self._post("/setWebhook", data)

    def deleteWebhook(self):
        return self._post("/deleteWebhook")

    def getWebhookInfo(self):
        return self._post("/getWebhookInfo")

    def testWebhook(self):
        return self._post("/testWebhook")

    def getUpdates(self, timeout: int = 30, offset: Optional[int] = None):
        data = {"timeout": timeout}
        if offset:
            data["offset"] = offset
        return self._post("/getUpdates", data)

    def sendMessage(self, chat_id: str, text: str):
        return self._post("/sendMessage", {"chat_id": chat_id, "text": text})

    def sendPhoto(self, chat_id: str, photo: str, caption: Optional[str] = None):
        data = {"chat_id": chat_id, "photo": photo}
        if caption:
            data["caption"] = caption
        return self._post("/sendPhoto", data)

    def sendSticker(self, chat_id: str, sticker: str):
        return self._post("/sendPhoto", {"chat_id": chat_id, "sticker": sticker})

    def sendVoice(self, chat_id: str, voice_url: str):
        return self._post("/sendVoice", {"chat_id": chat_id, "voice_url": voice_url})

    def sendChatAction(self, chat_id: str, action: str = "typing"):
        return self._post("/sendChatAction", {"chat_id": chat_id, "action": action})
