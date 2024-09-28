import json

from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)


def get_database_connection() -> psycopg2.connect:
    conn = psycopg2.connect(
        database="todoapp",
        user="postgres",
        password="seliscool",
        host="postgres_db",
        port="5432",
    )

    return conn


@app.route("/")
def index():
    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM tasks;")
    res = cur.fetchall()
    cur.close()
    conn.close()

    return res


@app.route("/create_task", methods=["POST"])
def create_task():
    title = request.form.get("title")
    description = request.form.get("description")

    if not title or not description:
        return jsonify(success=False)

    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO tasks VALUES(DEFAULT, %s, %s);", (title, description))
    conn.commit()
    cur.close()
    conn.close()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/delete_task", methods=["POST"])
def delete_task():
    id = request.form.get("id")

    if not id:
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}

    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM tasks WHERE id = %s;", (id,))
    conn.commit()
    cur.close()
    conn.close()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
