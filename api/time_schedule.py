import datetime
from connect_db import ConnectDatabase


class TimeSchedule:
    """
    Thông tin chung:
        # Có 10 ca học lần lượt là: 1,2,3,4,5,6,7,8,9,10
        # Các ngày trong tuần thường dạy: Thứ 2,3,4,5,6
    """
    def __init__(self):
        # Step 0. Connect Database 
        self.connect = ConnectDatabase()
        # Step 1. Chọn các học phần sẽ được tổ chức 
        self.list_hp_se_to_chuc = self.decide_hp_se_to_chuc()
        if self.list_hp_se_to_chuc is None:
            print("We won't do anything when not in seminar 1 or 2")
            return 
        # Step 2. Đánh giá trọng số thể hiện tầm quan trọng của học phần được tổ chức  
        # Lọc qua các học phần có nhiều sinh viên bị F/D/D+ để update tầm quan trọng 
        # Điều này sẽ giúp sát với nhu cầu học của sinh viên hơn 
        
        # Có thể bổ sung phân tích nhu cầu học khảo sát từ sinh viên để hoàn thiện step 2 tốt hơn
        """
        # Tạo ma trận thể hiện nhu cầu học thực của sinh viên với học phần cụ thể.
        self.nhu_cầu_học = {"hs0": ["MAT1000", "MAT1001", "MAT1003"],
            "hs1": ["MAT1000", "MAT1001", "MAT1005", "MAT1006"],
            "hs2": ["MAT1002", "MAT1003", "MAT1005", "MAT1006"],
            "hs3": ["MAT1001", "MAT1003", "MAT1005", "MAT1002"],
        }
        """
        
            
        # Nhu càu của giảng viên về thời gian
        self.giảng_viên_bận = {
            "gv0": [{2: [3, 4, 5]}, {2: [6]}, {5: [4, 5]}],
            "gv1": [{4: [2, 3]}],
        }

        # Nạp các thông tin liên quan đến ván đề - kết nối database
        self.hoc_phan = self.connect.get_hoc_phan()
        self.giang_vien = self.connect.get_giang_vien()
        self.loai_phong = self.connect.get_loai_phong()
        self.phong_hoc = self.connect.get_phong_hoc()
        self.hp_lp = self.connect.get_hp_lp()
        self.cth_hp = self.connect.get_cth_hp()

    def decide_hp_se_to_chuc(self):
        # Bước 1. Kiểm tra hiện tại đang ở kỳ học nào
        current_seminar = self.__return_current_seminar()
        # Hiện tại chỉ hỗ trợ xếp lịch cho học kỳ 1 và 2
        if current_seminar is not "1" and current_seminar is not "2":
            return None
        # Bước 2. Truy vấn chọn ra những học phàn nên tổ chức ở kỳ học hiện tại
        execute = f"""
                    SELECT id_hp FROM CTH_HP
                    WHERE hk_dx LIKE '{current_seminar}%'
                    """
        self.connect.execute(execute)
        data = self.connect.cursor.fetchall()
        # Hiện tại mới return danh sách các học phần gợi ý học ở kỳ hiện tại 
        # Sẽ bổ sung lọc các học phần có nhiều D+/D/F trong tương lai 
        # Như vậy giúp phù hợp với nhu cầu học lại / học cải thiện của sinh viên
        return [(item['id_hp'], 1) for item in data]

    def __return_current_seminar(self):
        current_time = datetime.now()
        return (
            "1"
            if datetime(current_time.year, 9, 5)
            <= current_time
            <= datetime(current_time.year, 2, 5)
            else "2"
            if datetime(current_time.year, 2, 6)
            <= current_time
            <= datetime(current_time.year + 1, 7, 5)
            else "3"
        )
