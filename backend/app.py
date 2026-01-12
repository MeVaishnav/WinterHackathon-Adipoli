from flask import Flask
from routes.upload import upload_bp

app = Flask(__name__)
app.register_blueprint(upload_bp)