from connect_db import ConnectDatabase


class TimeSchedule:
    def __init__(self):
        self.connect = ConnectDatabase()
        # Có 10 ca học lần lượt là: 1,2,3,4,5,6,7,8,9,10
        # Các ngày trong tuần thường dạy: Thứ 2,3,4,5,6
        self.list_hp_se_to_chuc = self.decide_hp_se_to_chuc()
        # Tạo ma trận thể hiện nhu cầu học thực của sinh viên với học phần cụ thể.
        self.nhu_cầu_học = {'hs0': ["MAT1000", "MAT1001", "MAT1003"],
                       'hs1': ["MAT1000", "MAT1001", "MAT1005", "MAT1006"],
                       'hs2': ["MAT1002", "MAT1003", "MAT1005", "MAT1006"],
                       'hs3': ["MAT1001", "MAT1003", "MAT1005", "MAT1002"]}   
        # Nhu càu của giảng viên về thời gian
        self.giảng_viên_bận = {"gv0": [{2: [3, 4, 5]}, {2: [6]}, {5: [4, 5]}], "gv1": [{4: [2, 3]}]}
    
        # Nạp các thông tin liên quan đến ván đề - kết nối database 
        self.hoc_phan = self.connect.get_hoc_phan()
        self.giang_vien = self.connect.get_giang_vien()
        self.loai_phong = self.connect.get_loai_phong()
        self.phong_hoc = self.connect.get_phong_hoc()
        self.hp_lp = self.connect.get_hp_lp()

    def decide_hp_se_to_chuc(self):
        pass 









