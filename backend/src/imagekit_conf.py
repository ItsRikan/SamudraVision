import os

from imagekitio import ImageKit
from dotenv import load_dotenv

load_dotenv()

private_key = os.getenv("PRIVATE_KEY")

imagekit = ImageKit(
    private_key=private_key
)