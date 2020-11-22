import sqlite3 as sql
conn = sql.connect('eventapp.db')
cursor = conn.cursor()
# cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
# cursor.execute("SELECT * FROM event_model;")
# cursor.execute("SELECT * FROM user_model;")
cursor.execute("SELECT * FROM sign_up_model;")

print(cursor.fetchall())