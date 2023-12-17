import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import HaiAva from "../../assets/avatar/Hai.jpg";
import DAAva from "../../assets/avatar/DA.jpg";
import DucAva from "../../assets/avatar/Duc.jpg";
import ThangAva from "../../assets/avatar/Thang.jpg";

const Members = [
  {
    name: "Phạm Ngọc Hải",
    role: "Trưởng nhóm",
    decs: "Thiết kế Use Case",
    imgpath: HaiAva,
    fb: "https://www.facebook.com/harito9703",
    gh: "https://github.com/Harito97",
  },
  {
    name: "Lương Đức Anh",
    role: "Thành viên",
    decs: "Thiết kế UI",
    imgpath: DAAva,
    fb: "https://www.facebook.com/profile.php?id=100016365789104",
    gh: "https://github.com/DucAnh1053",
  },
  {
    name: "Trần Minh Đức",
    role: "Thành viên",
    decs: "Thiết kế Database",
    imgpath: DucAva,
    fb: "https://www.facebook.com/ikari101",
    gh: "https://github.com/TranMinhDuc190103",
  },
  {
    name: "Nguyễn Văn Thắng",
    role: "Thành viên",
    decs: "Thiết kế API",
    imgpath: ThangAva,
    fb: "https://www.facebook.com/profile.php?id=100084302946934",
    gh: "https://github.com/thangmaster37",
  },
];

const TeamSection = () => {
  return (
    <>
      <section
        className="bg-white font-[sans-serif] dark:bg-gray-900"
        id="contact"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 ">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Our Team
            </h2>
          </div>
          <div className="mb-6 grid gap-8 md:grid-cols-2 lg:mb-16">
            {Members.map((member) => (
              <div className="items-center rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <a href="#">
                  <img
                    className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src={member.imgpath}
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    {member.role}
                  </span>
                  <p className="mb-4 mt-3 font-light text-gray-500 dark:text-gray-400">
                    {member.decs}
                  </p>
                  <ul className="flex space-x-4 sm:mt-0">
                    <li>
                      <a
                        href={member.fb}
                        target="_blank"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      >
                        <FaFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.gh}
                        target="_blank"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      >
                        <FaGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
