import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
const generateDocument = (user) => {
  loadFile("/template/input.docx", function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    //Data mẫu
    doc.setData({
      ki: 1,
      nh: 2023,
      nhs: 2024,
      ngay: 10,
      thang: 1,
      nam: 2024,
      ho_ten: "Nguyễn Văn A",
      ngsinh: "1/1/2003",
      ma_sv: "21002500",
      lop: "K66A5 Khoa học dữ liệu",
      items: [
        {
          stt: 1,
          ma_hp: "MAT3385",
          ten_hp: " Cơ sở dữ liệu Web và hệ thống thông tin",
          so_tin: 3,
          ma_lop: 1,
          render: (scope) => {
            return `${scope.thu}-(${scope.bd}-${scope.kt})-${scope.phong}\n`;
          },
          lich_hoc: [
            { thu: "T3", bd: 1, kt: 3, phong: "101T5" },
            { thu: "T4", bd: 1, kt: 5, phong: "102T5" },
          ],
        },
        {
          stt: 2,
          ma_hp: "MAT3385",
          ten_hp: " Cơ sở dữ liệu Web và hệ thống thông tin",
          so_tin: 3,
          ma_lop: 2,
          render: (scope) => {
            return `${scope.thu}-(${scope.bd}-${scope.kt})-${scope.phong}\n`;
          },
          lich_hoc: [
            { thu: "T2", bd: 1, kt: 3, phong: "101T5" },
            { thu: "T3", bd: 1, kt: 5, phong: "102T5" },
          ],
        },
      ],
      total: 6,
    });
    try {
      doc.render();
    } catch (error) {
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
            error,
            key,
          ) {
            error[key] = value[key];
            return error;
          }, {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join("\n");
        console.log("errorMessages", errorMessages);
      }
      throw error;
    }
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(out, "ket-qua-dang-ki-mon-hoc.docx");
  });
};

export default generateDocument;
