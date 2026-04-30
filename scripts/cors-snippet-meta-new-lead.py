# Snippet para o serviço Python que expõe POST /meta-new-lead (ex.: Flask + Waitress).
# Verificação: curl -sI -X OPTIONS "https://.../meta-new-lead" -H "Origin: https://seu-dominio" \
#   -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type"
# Deve incluir Access-Control-Allow-Origin (e métodos/headers) na resposta ao OPTIONS.

# --- Flask ---
# from flask import Flask, request
#
# app = Flask(__name__)
#
# @app.after_request
# def cors(resp):
#     origin = request.headers.get("Origin")
#     if origin:
#         resp.headers["Access-Control-Allow-Origin"] = origin
#     resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
#     resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
#     resp.headers["Access-Control-Max-Age"] = "86400"
#     return resp
#
# @app.route("/meta-new-lead", methods=["OPTIONS"])
# def meta_new_lead_options():
#     return ("", 204)

# --- Starlette/FastAPI (middleware) ---
# from starlette.middleware.cors import CORSMiddleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["https://seu-dominio-do-quiz.com"],  # ou ["*"] só em dev
#     allow_methods=["POST", "OPTIONS"],
#     allow_headers=["Content-Type"],
# )
