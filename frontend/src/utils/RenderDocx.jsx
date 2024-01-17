import Docxtemplater from "docxtemplater";
import React, { useState, useEffect } from "react";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import axios from "axios";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
const generateDocument = (semester, token) => {
  loadFile("/template/input.docx", function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const fetchData = async () => {
      try {
        await axios
          .get(
            "http://localhost:8000/get_info_subject_register/" +
              semester.toString(),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            },
          )
          .then((res) => {
            const data = res.data.info_subject_register[0];
            let total = 0;
            data.items.forEach((row) => (total += row.so_tin));
            doc.setData({
              ki: data.ki,
              nh: data.nh,
              nhs: data.nhs,
              ngay: data.ngay,
              thang: data.thang,
              nam: data.nam,
              ho_ten: data.ho_ten,
              ngsinh: data.ngsinh,
              ma_sv: data.ma_sv,
              lop: data.lop,
              items: data.items,
              render: (scope) => {
                return `${scope.thu}-(${scope.bd}-${scope.kt})-${scope.phong} `;
              },
              total: total,
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

              if (
                error.properties &&
                error.properties.errors instanceof Array
              ) {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    //Data mẫu
  });
};

export default generateDocument;
