import sqlite3

connection = sqlite3.connect('student.db')

cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS students (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL,

    department TEXT,

    semester INTEGER,

    cgpa FLOAT DEFAULT 0,

    attendance FLOAT DEFAULT 0
)
""")

connection.commit()
connection.close()

print("Database Created")