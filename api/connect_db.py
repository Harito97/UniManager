import mysql.connector

class ConnectDatabase:
    def __init__(self, host:str='localhost', user:str='root', database:str='uni_manager'):
        self.db_status = False
        SECURITY_ALGORITHM, SECRET_KEY = "HS256", "super-secret-key"
        try:
            self.conn = mysql.connector.connect(host=host, user=user, database=database)
            self.cursor = self.conn.cursor(dictionary=True)
            self.db_status = True
        except Exception as e:
            print("Error: ", e)
    
    def get_hoc_phan(self):
        self.cursor.execute("""SELECT id FROM HocPhan""")
        return [item['id'] for item in self.cursor.fetchall()]
    
    def get_giang_vien(self):
        self.cursor.execute("""SELECT id FROM GiangVien""")
        return [item['id'] for item in self.cursor.fetchall()]

    def get_loai_phong(self):
        self.cursor.execute("""SELECT id FROM LoaiPhong""")
        return [item['id'] for item in self.cursor.fetchall()]
    
    def get_phong_hoc(self):
        self.cursor.execute("""SELECT * FROM PhongHoc""")
        return [(item['id'], item['id_loai_phong'], item['so_cho']) for item in self.cursor.fetchall()]

    def get_hp_lp(self):
        self.cursor.execute("""SELECT * FROM HP_LP""")
        data = self.cursor.fetchall()
        return [(item['id_hp'], item['id_lp']) for item in data]

