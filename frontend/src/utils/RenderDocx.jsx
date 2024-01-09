import Docxtemplater from "docxtemplater";
import React, { useState, useEffect } from "react";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import axios from "axios";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
const generateDocument = (user, data) => {

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
      ki: data.ki,
      nh: data.nh,
      nhs: data.nhs,
      ngay: data.ngay,
      thang: data.thang,
      nam: data.nam,
      ho_ten: data.ho_ten,
      ngsinh: data.ngsinh,
      ma_sv: data.ma_sv,
      lop: data.log,
      items: data.items,
      total: 6,
      render: (scope) => {
        return `${scope.thu}-(${scope.bd}-${scope.kt})-${scope.phong} `;
      },
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
