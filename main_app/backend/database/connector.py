import mysql.connector

host = "localhost"
user = "root"
password = "ikari1001"
database = "csdl_web"

try:
    conn = mysql.connector.connect(
        host = host,
        user = user,
        password = password,
        database = database
    )
    
    # if conn.is_connected():
    #     print("Connected successfully")
    
    cursor = conn.cursor()
except Exception as e:
    print(f"Error: {e}")