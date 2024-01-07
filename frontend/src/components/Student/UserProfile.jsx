import React from "react";
import ProfileImg from "../../assets/avatar/DA.jpg";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UserProfile = ({ user }) => {
  return (
    <>
      <div class="grid grid-cols-1 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-3 xl:gap-4">
        <div class="col-span-full mb-4 xl:mb-2">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Thông tin sinh viên
          </h1>
        </div>
        <div class="col-span-full xl:col-auto">
          <div class="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
            <div class="items-center sm:flex sm:space-x-4 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4">
              <img
                class="mb-4 h-28 w-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0"
                src={ProfileImg}
                alt="Avatar"
              />
              <div>
                <h3 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                  Profile picture
                </h3>
                <div class="flex items-center space-x-4">
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    className="bg-blue-500"
                  >
                    Tải ảnh lên
                  </Button>
                  <Button danger>Xoá ảnh</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <div class="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
            <h3 class="mb-4 text-xl font-semibold dark:text-white">
              General information
            </h3>
            <form action="#">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Bonnie"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Green"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="country"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="United States"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="city"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="e.g. San Francisco"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="address"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="e.g. California"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="example@company.com"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="phone-number"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone-number"
                    id="phone-number"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="e.g. +(12)3456 789"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="birthday"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Birthday
                  </label>
                  <input
                    type="number"
                    name="birthday"
                    id="birthday"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="15/08/1990"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="organization"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Company Name"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="role"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="React Developer"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="department"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Development"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="zip-code"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Zip/postal code
                  </label>
                  <input
                    type="number"
                    name="zip-code"
                    id="zip-code"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="123456"
                    required
                  />
                </div>
                <div class="sm:col-full col-span-6">
                  <button
                    class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4"
                    type="submit"
                  >
                    Save all
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
            <h3 class="mb-4 text-xl font-semibold dark:text-white">
              Password information
            </h3>
            <form action="#">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="current-password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    type="text"
                    name="current-password"
                    id="current-password"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    data-popover-target="popover-password"
                    data-popover-placement="bottom"
                    type="password"
                    id="password"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                  <div
                    data-popover
                    id="popover-password"
                    role="tooltip"
                    class="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    <div class="space-y-2 p-3">
                      <h3 class="font-semibold text-gray-900 dark:text-white">
                        Must have at least 6 characters
                      </h3>
                      <div class="grid grid-cols-4 gap-2">
                        <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                        <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                        <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
                        <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
                      </div>
                      <p>It’s better to have:</p>
                      <ul>
                        <li class="mb-1 flex items-center">
                          <svg
                            class="mr-2 h-4 w-4 text-green-400 dark:text-green-500"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Upper & lower case letters
                        </li>
                        <li class="mb-1 flex items-center">
                          <svg
                            class="mr-2 h-4 w-4 text-gray-300 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          A symbol (#$&)
                        </li>
                        <li class="flex items-center">
                          <svg
                            class="mr-2 h-4 w-4 text-gray-300 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          A longer password (min. 12 chars.)
                        </li>
                      </ul>
                    </div>
                    <div data-popper-arrow></div>
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="confirm-password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="text"
                    name="confirm-password"
                    id="confirm-password"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div class="sm:col-full col-span-6">
                  <button
                    class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4"
                    type="submit"
                  >
                    Save all
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
