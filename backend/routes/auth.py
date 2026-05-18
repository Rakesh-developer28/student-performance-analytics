from flask import Blueprint, request, jsonify
import sqlite3
from flask_bcrypt import Bcrypt

auth = Blueprint('auth', __name__)

bcrypt = Bcrypt()


@auth.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    name = data['name']
    email = data['email']
    password = data['password']
    department = data['department']
    semester = data['semester']

    hashed = bcrypt.generate_password_hash(
        password
    ).decode('utf-8')

    connection = sqlite3.connect(
        'database/student.db'
    )

    cursor = connection.cursor()

    try:

        cursor.execute("""
        INSERT INTO students
        (
        name,
        email,
        password,
        department,
        semester
        )

        VALUES (?, ?, ?, ?, ?)
        """, (
            name,
            email,
            hashed,
            department,
            semester
        ))

        connection.commit()

        return jsonify({
            "message":
            "Registration Successful"
        })

    except:

        return jsonify({
            "error":
            "Email already exists"
        }), 400

    finally:

        connection.close()


@auth.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    email = data['email']
    password = data['password']

    connection = sqlite3.connect(
        'database/student.db'
    )

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM students
        WHERE email = ?
        """,
        (email,)
    )

    user = cursor.fetchone()

    connection.close()

    if user is None:

        return jsonify({
            "error":
            "User not found"
        }), 404

    if bcrypt.check_password_hash(
        user[3],
        password
    ):

        return jsonify({

            "message":
            "Login Success",

            "user": {

                "id": user[0],
                "name": user[1],
                "email": user[2],
                "department": user[4],
                "semester": user[5],
                "cgpa": user[6],
                "attendance": user[7]

            }

        })

    return jsonify({
        "error":
        "Invalid password"
    }), 401