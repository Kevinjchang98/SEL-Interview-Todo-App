import json

from flask_cors import CORS
from flask import Flask, request
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)


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


@app.route("/get_task_overview", methods=["POST"])
def get_task_overview():
    id = request.form.get("id")

    if not id:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')}"}), 400, {
            'ContentType': 'application/json'}

    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title, description, isComplete FROM tasks WHERE id = %s;", (id,))
    res = cur.fetchall()
    cur.close()
    conn.close()

    return res


@app.route("/get_task_details", methods=["POST"])
def get_task_details():
    # TODO: If an ID doesn't have a task should send an error back so front end can redirect
    id = request.form.get("id")

    if not id:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')}"}), 400, {
            'ContentType': 'application/json'}

    conn = get_database_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)  # TODO Refactor other areas to return dict instead
    cur.execute("SELECT * FROM tasks WHERE id = %s;", (id,))
    res = cur.fetchall()
    cur.close()
    conn.close()

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

    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO tasks VALUES(DEFAULT, %s, %s, %s);", (title, description, isComplete))
    conn.commit()
    cur.close()
    conn.close()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/update_task", methods=["POST"])
def update_task():
    id = request.form.get("id")
    title = request.form.get("title")
    description = request.form.get("description")

    if not title or not description:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')} {request.form.get('title')} {request.form.get('description')}"}), 400, {
            'ContentType': 'application/json'}

    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("UPDATE tasks SET title = %s, description = %s WHERE id = %s", (title, description, id))
    conn.commit()
    cur.close()
    conn.close()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}



@app.route("/toggle_complete", methods=["POST"])
def toggle_complete():
    id = request.form.get("id")

    if not id:
        return json.dumps({"success": False,
                           "error": f"Malformed request. Received: {request.form.get('id')}"}), 400, {
            'ContentType': 'application/json'}

    conn = get_database_connection()
    cur = conn.cursor()
    cur.execute("UPDATE tasks SET isComplete = NOT isComplete WHERE id = %s", (id,))
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
