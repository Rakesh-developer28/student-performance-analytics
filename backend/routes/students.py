from flask import Blueprint, jsonify
import sqlite3

students = Blueprint(
    'students',
    __name__
)


@students.route(
    '/students',
    methods=['GET']
)
def get_students():

    connection = sqlite3.connect(
        'database/student.db'
    )

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM students"
    )

    data = cursor.fetchall()

    connection.close()

    result = []

    for student in data:

        result.append({

            "id": student[0],

            "name": student[1],

            "email": student[2],

            "department": student[4],

            "semester": student[5],

            "cgpa": student[6],

            "attendance": student[7]

        })

    return jsonify(result)