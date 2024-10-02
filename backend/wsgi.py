import json

from flask_cors import CORS
from flask import Flask, request
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)


class get_database_cursor:
    def __init__(self, commit: bool = False, **kwargs):
        self.cursor_kwargs = kwargs
        self.commit = commit

    def __enter__(self):
        self.conn = get_database_connection()
        self.cur = self.conn.cursor(**self.cursor_kwargs)

        return self.cur

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.commit:
            self.conn.commit()

        self.cur.close()
        self.conn.close()


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
    with get_database_cursor() as cur:
        cur.execute("SELECT * FROM tasks;")
        res = cur.fetchall()

    return res


@app.route("/get_task_overview", methods=["POST"])
def get_task_overview():
    id = request.form.get("id")

    if not id:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')}"}), 400, {
            'ContentType': 'application/json'}

    with get_database_cursor() as cur:
        cur.execute("SELECT id, title, description, isComplete FROM tasks WHERE id = %s;", (id,))
        res = cur.fetchall()

    return res


@app.route("/get_task_details", methods=["POST"])
def get_task_details():
    # TODO: If an ID doesn't have a task should send an error back so front end can redirect
    id = request.form.get("id")

    if not id:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')}"}), 400, {
            'ContentType': 'application/json'}

    with get_database_cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT * FROM tasks WHERE id = %s;", (id,))
        res = cur.fetchall()

    return res


@app.route("/create_task", methods=["POST"])
def create_task():
    title = request.form.get("title")
    description = request.form.get("description")
    isComplete = request.form.get("isComplete")

    if not title or not description:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('title')} {request.form.get('description')}"}), 400, {
            'ContentType': 'application/json'}

    with get_database_cursor(commit=True, cursor_factory=RealDictCursor) as cur:
        cur.execute("INSERT INTO tasks VALUES(DEFAULT, %s, %s, %s) RETURNING id;", (title, description, isComplete))
        id = cur.fetchall()[0]["id"]

    return json.dumps({'success': True, 'id': id}), 200, {'ContentType': 'application/json'}


@app.route("/update_task", methods=["POST"])
def update_task():
    id = request.form.get("id")
    title = request.form.get("title")
    description = request.form.get("description")

    if not title or not description:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')} {request.form.get('title')} {request.form.get('description')}"}), 400, {
            'ContentType': 'application/json'}

    with get_database_cursor(commit=True, cursor_factory=RealDictCursor) as cur:
        cur.execute("UPDATE tasks SET title = %s, description = %s WHERE id = %s", (title, description, id))

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/toggle_complete", methods=["POST"])
def toggle_complete():
    id = request.form.get("id")

    if not id:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')}"}), 400, {
            'ContentType': 'application/json'}

    with get_database_cursor(commit=True, cursor_factory=RealDictCursor) as cur:
        cur.execute("UPDATE tasks SET isComplete = NOT isComplete WHERE id = %s", (id,))

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/delete_task", methods=["POST"])
def delete_task():
    id = request.form.get("id")

    if not id:
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}

    with get_database_cursor(commit=True, cursor_factory=RealDictCursor) as cur:
        cur.execute("DELETE FROM tasks WHERE id = %s;", (id,))

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
