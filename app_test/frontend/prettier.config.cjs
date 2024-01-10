// file này setup tùy chỉnh cách code js ts html css

module.exports = {
    // Sử dụng plugin ngoài cài đặt mặc định để setup mã nguồn tốt hơn, đặc biệt khi làm việc cùng tailwindcss
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 4,
};

// Eg: 1 cấu hình cho dự án cách format code
// module.exports = {
//     semi: false,
//     singleQuote: true,
//     tabWidth: 2,
//     printWidth: 80,
//     // Cấu hình riêng cho TypeScript
//     overrides: [
//       {
//         files: ['*.ts', '*.tsx'],
//         options: {
//           semi: true,
//           singleQuote: false,
//         },
//       },
//     ],
//   };
