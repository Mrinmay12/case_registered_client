import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import apiUrl from "../ApiAxios";
import editIcon from "../Icons/edit.svg";
import deleteIcon from "../Icons/delete.svg";
import ViewIcon from "../Icons/view.svg";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "../Components/Dropdown/Dropdown";
import jsPDF from "jspdf";

import {
  calculateCaseAverages,
  Number_Disposed_Case,
  Number_Registered_Case,
} from "../Utiles";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [case_date, setcase_date] = useState("");
  const [case_no, setcase_no] = useState("");
  const [case_date1, setcase_date1] = useState("");
  const [case_no1, setcase_no1] = useState("");
  const [case_tittle, setcase_tittle] = useState("");
  const [case_type, setcase_type] = useState("");
  const [case_type1, setcase_type1] = useState("");
  const [sortField, setSortField] = useState("_id"); // Default sort field
  const [sortOrder, setSortOrder] = useState("desc");

  //update
  const [update_case_date1, setupdate_case_date1] = useState("");
  const [update_case_orders, setupdate_case_orders] = useState("");
  const [update_case_no1, setupdate_case_no1] = useState("");
  const [update_case_tittle, setupdate_case_tittle] = useState("");
  const [update_case_id, setupdate_case_id] = useState("");
  const [username, setusername] = useState("");
  const [username1, setusername1] = useState("");
  const [sdem_name, setsdem_name] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFileName(
      event.target.files.length > 0
        ? event.target.files[0].name
        : "No file chosen"
    );
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, sortField, sortOrder]);

  const fetchProducts = async (page, case_date, case_no, case_type) => {
    const query = new URLSearchParams({
      page,
      limit: 10,
      case_date: case_date || "",
      case_no: case_no || "",
      sort: sortField,
      order: sortOrder,
      case_type: case_type || "",
    });
    try {
      const response = await apiUrl.get(`/api/getpost?${query.toString()}`);
      const data = await response.data;
      setProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {}
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts(1, case_date, case_no, case_type1);
  };
  const [case_err, setcase_err] = useState(false);
  let Operationname=localStorage.getItem("Operationname");
  const handleSubmit = async () => {
    let json = JSON.stringify({
      case_no: case_no1,
      case_tittle: case_tittle,
      case_date: case_date1,
      username: username,
      case_type: case_type,
      Operation_name:Operationname,
    });
    try {
      const response = await apiUrl.post(`/api/uploadpost`, json);
      if (response) {
        setcase_no1("");
        setcase_tittle("");
        setcase_date1("");
        setcase_type("");
        setCurrentPage(1);
        fetchProducts(1);
        setcase_err(false);
      }
    } catch (err) {
      setcase_err(true);
    }
  };
  const handleReset = () => {
    setcase_no1("");
    setcase_tittle("");
    setcase_date1("");
    setusername("");
  };
  const handleReset1 = () => {
    setcase_no("");
    setcase_date("");
    fetchProducts(1, "", "", "");
    setcase_type1("");
  };

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const toggleModal1 = (id) => {
    setupdate_case_id(id);
    setShowModal1(true);
  };
  const toggleModal = (case_no, case_tittle, case_date, case_id, sdem_name) => {
    setShowModal(!showModal);
    setupdate_case_date1(case_date);
    setupdate_case_no1(case_no);
    setupdate_case_tittle(case_tittle);
    setupdate_case_id(case_id);
    setsdem_name(sdem_name);
    setusername1(sdem_name);
  };
  const toggleModal5 = (case_id) => {
    setShowModal5(!showModal5);
    setupdate_case_id(case_id);
  };
  const toggleModal6 = (
    case_no,
    case_tittle,
    case_date,
    case_id,
    sdem_name
  ) => {
    setShowModal6(!showModal6);
    setupdate_case_id(case_id);
    setupdate_case_date1(case_date);
    setupdate_case_no1(case_no);
    setupdate_case_tittle(case_tittle);
    setupdate_case_id(case_id);
    setsdem_name(sdem_name);
  };
  const toggleModal3 = (case_no, case_tittle, case_date, case_id) => {
    setShowModal3(!showModal);
    setupdate_case_date1(case_date);
    setupdate_case_no1(case_no);
    setupdate_case_tittle(case_tittle);
    setupdate_case_id(case_id);
    setupdate_case_orders("");
  };
  const toggleModal4 = (case_order) => {
    setShowModal4(!showModal);
    setupdate_case_orders(case_order);
  };
  let user_name = localStorage.getItem("username");

  const handleUpdate = async () => {
    let json = JSON.stringify({
      case_id: update_case_id,
      case_no: update_case_no1,
      case_tittle: update_case_tittle,
      case_date: update_case_date1,
      case_orders: update_case_orders,
      user_name: username1,
      Operation_name:Operationname,
    });
    try {
      const response = await apiUrl.put(`/api/updatepost`, json);
      if (response) {
        setcase_no1("");
        setcase_tittle("");
        setcase_date1("");
        setupdate_case_date1("");
        setupdate_case_id("");
        setCurrentPage(1);
        fetchProducts(1);
        setShowModal(false);
        setShowModal3(false);
      }
    } catch (err) {}
  };
  const handleUpdate_Case_Status1 = () => {
    setShowModal1(true);
    setShowModal(false);
    setShowModal3(false);
  };
  const handleUpdate_Case_Status = async () => {
    let json = JSON.stringify({
      case_id: update_case_id,
      case_no: update_case_no1,
      case_tittle: update_case_tittle,
      case_date: update_case_date1,
      case_orders: update_case_orders,
      user_name: username1,
    });
    try {
      const response = await apiUrl.put(`/api/update_case_status`, json);
      if (response) {
        setcase_no1("");
        setcase_tittle("");
        setcase_date1("");
        setupdate_case_date1("");
        setupdate_case_id("");
        setCurrentPage(1);
        fetchProducts(1);
        setShowModal(false);
        setShowModal1(false);
      }
    } catch (err) {}
  };
  console.log(file, "mmfmff");

  const createOrder = async () => {
    const formData = new FormData();
    formData.append("case_id", update_case_id);
    formData.append("case_orders", update_case_orders);
    formData.append("case_date", update_case_date1);
    formData.append("user_name", user_name);
    formData.append("Pdf", file);
    // let json = JSON.stringify({
    //   case_id: update_case_id,
    //   case_orders: update_case_orders,
    //   case_date: update_case_date1,
    //   user_name: user_name,
    // });
    try {
      const response = await apiUrl.post(`/api/create_order`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setcase_no1("");
        setcase_tittle("");
        setcase_date1("");
        setupdate_case_date1("");
        setupdate_case_id("");
        setCurrentPage(1);
        fetchProducts(1);
        setShowModal(false);
        setShowModal3(false);
        setFile(null);
        setFileName("No file chosen");
      }
    } catch (err) {}
  };

  const [orders_list, setOrders_list] = useState([]);
  const getOrders = async () => {
    try {
      const response = await apiUrl.get(
        `/api/get_order?case_id=${update_case_id}`
      );
      if (response) {
        setOrders_list(
          response.data.data.sort((a, b) => {
            if (a.user_name === user_name && b.user_name !== user_name) {
              return -1;
            } else if (a.user_name !== user_name && b.user_name === user_name) {
              return 1;
            } else {
              return 0;
            }
          })
        );
      }
    } catch (err) {}
  };
  const getCaseHistory = async () => {
    try {
      const response = await apiUrl.get(
        `/api/get_case_history?case_id=${update_case_id}`
      );
      if (response) {
        setOrders_list(response.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (update_case_id && showModal6) {
      getOrders();
    }
  }, [update_case_id, showModal6]);
  useEffect(() => {
    if (update_case_id && showModal5) {
      getCaseHistory();
    }
  }, [update_case_id, showModal5]);

  const handleClose = () => setShowModal(false);
  const handleClose3 = () => setShowModal3(false);
  const handleClose4 = () => setShowModal4(false);
  const handleClose1 = () => setShowModal1(false);
  const handleClose5 = () => setShowModal5(false);
  const handleClose7 = () => setShowModal7(false);
  const handleClose6 = () => {
    setShowModal6(false);
    setEditorderId("");
  };

  const handleDelete = async () => {
    try {
      const response = await apiUrl.delete(
        `/api/delete?case_id=${update_case_id}`
      );
      if (response) {
        setupdate_case_id("");
        setCurrentPage(1);
        fetchProducts(1);
        setShowModal1(false);
      }
    } catch (err) {}
  };
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handlLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("Operationname");
    window.location.reload();
  };
  const logoutTimeout = useRef(null);

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimeout.current);

    logoutTimeout.current = setTimeout(() => {
      if (!token) return;
      handlLogout();
    }, 900000);
  };

  const handleUserActivity = () => {
    resetLogoutTimer();
  };

  const setupUserActivityListeners = () => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
  };

  const removeUserActivityListeners = () => {
    window.addEventListener("mousemove", handleUserActivity);
    window.removeEventListener("keydown", handleUserActivity);
    window.removeEventListener("scroll", handleUserActivity);
    window.removeEventListener("click", handleUserActivity);
  };

  useEffect(() => {
    setupUserActivityListeners();
    resetLogoutTimer();

    return () => {
      removeUserActivityListeners();
      clearTimeout(logoutTimeout.current);
    };
  }, []);

  const handleOrderReset = () => {
    setupdate_case_date1("");
    setsdem_name("");
  };

  const [editorder_id, setEditorderId] = useState("");

  const handelEditOrder = async (id, order, case_date) => {
    setEditorderId(id);
    setupdate_case_orders(order);
    setupdate_case_date1(case_date);
  };

  const handleUpdateOrder = async () => {
    let json = JSON.stringify({
      case_orders: update_case_orders,
      case_id: editorder_id,
      case_date: update_case_date1,
    });
    try {
      const response = await apiUrl.put(`/api/update_order`, json);
      if (response) {
        setupdate_case_orders("");
        setEditorderId("");
        setShowModal3(false);
        setShowModal6(false);
      }
    } catch (err) {}
  };

  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleClick = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };
  const [reports_data, setreports_data] = useState([]);
  const [reports_data2, setreports_data2] = useState([]);
  const [reporterr, setreporterr] = useState(false);
  console.log(reports_data, "reports_datareports_data");

  const Get_reports = async () => {
    try {
      const response = await apiUrl.get(
        `/api/generate_reports?start_date=${start_date}&end_date=${end_date}`
      );
      if (response) {
        setreports_data2(response.data.data);
        setreports_data(calculateCaseAverages(response.data.data));
      }
    } catch (err) {}
  };
  const handleGenerated = async () => {
    if (!start_date && !end_date) {
      setreporterr(true);
    } else {
      setShowModal7(true);
      Get_reports();
    }
  };

   const handleDownload = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.setFontSize(12);
  
    // Add header
    doc.text("REPORT GENERATED BASED ON SELECTED DATE RANGE", 10, 10);
    doc.text(`Date: ${new Date(start_date).toLocaleDateString()} - ${new Date(end_date).toLocaleDateString()}`, 10, 20);
    let yOffset = 40; // Increased space for the header
  
    // First Table Header
    const headers1 = ["Case Type", "Number of Cases Registered", "Number of Cases Disposed"];
    const colWidths1 = [60, 70, 60];
  
    // Draw the first table
    yOffset = drawTable(doc, headers1, reports_data, Number_Registered_Case, Number_Disposed_Case, yOffset, colWidths1);
  
    // Add space between tables
    yOffset += 10;
  
    // Check for page overflow before drawing the second table
    if (yOffset + 50 > doc.internal.pageSize.height) { // 50 is an estimate for the second table height
      doc.addPage(); // Add a new page if there isn't enough space
      yOffset = 20; // Reset yOffset for the new page
    }
  
    // Second Table Header
    const headers2 = ["Case Type", "Average Disposal (Days)"];
    const colWidths2 = [50, 50];
  
    // Draw the second table
    yOffset = drawTable(doc, headers2, reports_data, null, null, yOffset, colWidths2, true);
  
    // Add page number
    doc.setFontSize(10);
    doc.text(`Page 1 of 1`, 200, doc.internal.pageSize.height - 10, { align: "right" });
  
    // Use case number for the filename
    const fileName = `${reports_data[0]?.caseNumber || "document"}.pdf`;
    doc.save(fileName);
  };
  
  const drawTable = (doc, headers, data, numRegisteredFunc, numDisposedFunc, yOffset, colWidths, isSecondTable = false) => {
    const totalWidth = colWidths.reduce((a, b) => a + b, 0);
    let xOffset = 10;
  
    // Draw header
    headers.forEach((header, index) => {
      const cellX = xOffset + colWidths[index] / 2; // Center the text
      doc.text(header, cellX, yOffset, { align: "center" });
      xOffset += colWidths[index];
    });
  
    // Draw header bottom border
    yOffset += 5;
    xOffset = 10;
  
    // Draw vertical lines
    headers.forEach((_, index) => {
      const width = colWidths[index];
      doc.line(xOffset, yOffset - 5, xOffset, yOffset + 5); // Vertical line
      xOffset += width;
    });
    doc.line(10, yOffset, 10 + totalWidth, yOffset); // Bottom border of header
    yOffset += 5;
  
    // Draw each row
    data.forEach((item) => {
      const rowData = isSecondTable 
        ? [item.caseNumber, item.average] 
        : [item.caseNumber, numRegisteredFunc(item.caseNumber, reports_data2), numDisposedFunc(item.caseNumber, reports_data2)];
  
      xOffset = 10;
      rowData.forEach((cell, index) => {
        const cellX = xOffset + colWidths[index] / 2; // Center the text
        doc.text(cell.toString(), cellX, yOffset, { align: "center" });
        xOffset += colWidths[index];
      });
  
      // Draw row border and vertical lines
      yOffset += 5;
      xOffset = 10; // Reset for vertical lines
      headers.forEach((_, index) => {
        doc.line(xOffset, yOffset - 5, xOffset, yOffset + 5); // Vertical line
        xOffset += colWidths[index];
      });
      doc.line(10, yOffset, 10 + totalWidth, yOffset); // Bottom border of the row
      yOffset += 5; // Space between rows
    });
  
    // Draw the outer border of the table
    doc.line(10, yOffset - (data.length + 1) * 10, 10, yOffset); // Left border
    doc.line(10 + totalWidth, yOffset - (data.length + 1) * 10, 10 + totalWidth, yOffset); // Right border
    // doc.line(10, yOffset - (data.length + 1) * 10, 10 + totalWidth, yOffset - (data.length + 1) * 10); // Top border
    doc.line(10, yOffset, 10 + totalWidth, yOffset); // Bottom border
  
    return yOffset + 10; // Return new yOffset for the next section
  };
  
  const handlePdf = async (id) => {
    try {
      window.open(
        `${process.env.REACT_APP_API_URL}api/get_pdf/${id}`,
        "_blank"
      );
    } catch (err) {
      console.error("Error fetching PDF:", err);
    }
  };

  return (
    <>
      <h3>{user_name || Operationname}</h3>
      <button className="logout-button" onClick={handlLogout}>
        Logout
      </button>
      <div class="my_container">
        {!user_name && (
          <div class="left-side">
            <div class="my_card">
              <h2>Upload Case</h2>
              <label for="name">Case No:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter case number"
                value={case_no1}
                onChange={(e) => setcase_no1(e.target.value)}
              />
              <label for="name">Case Tittle:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter case tittle"
                value={case_tittle}
                onChange={(e) => setcase_tittle(e.target.value)}
              />
              <label for="name">Case Type:</label>
              <select
                value={case_type}
                onChange={(e) => setcase_type(e.target.value)}
              >
                <option value="">Select Case Type</option>
                <option value="152">152</option>
                <option value="163">163</option>
                <option value="165">165</option>
                <option value="166">166</option>
                <option value="126">126</option>
                <option value="129">129</option>
              </select>
              <label for="sdem" style={{marginTop:"20px"}}>Name of the SDEM:</label>
              <Dropdown setdropData={setusername} sdem_name={username} />
              <label for="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={case_date1}
                onChange={(e) => setcase_date1(e.target.value)}
              />
              {case_err && (
                <span style={{ color: "red" }}>
                  Case Number already available
                </span>
              )}
              <div class="search-buttons">
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
                <button type="reset" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        <div class={user_name ? "right-side2" : "right-side"}>
          <div class="search-my_card">
            <h2>Search Cases</h2>
            <div className="search-bar">
              <div className="two_item">
                <label for="name-right" style={{ width: "40%" }}>
                  Case Type:
                </label>
                <select
                  value={case_type1}
                  onChange={(e) => setcase_type1(e.target.value)}
                >
                  <option value="">Select Case Type</option>
                  <option value="152">152</option>
                  <option value="163">163</option>
                  <option value="165">165</option>
                  <option value="166">166</option>
                  <option value="126">126</option>
                  <option value="129">129</option>
                </select>

                <label for="name-right" style={{ width: "40%" }}>
                  Case No:
                </label>
                <input
                  type="text"
                  id="name-right"
                  name="name-right"
                  placeholder="Enter case number"
                  value={case_no}
                  onChange={(e) => setcase_no(e.target.value)}
                />

                <label for="date-right" style={{ width: "40%" }}>
                  Date:
                </label>
                <input
                  type="date"
                  id="date-right"
                  name="date-right"
                  value={case_date}
                  onChange={(e) => setcase_date(e.target.value)}
                />
              </div>
            </div>
            <div class="search-buttons">
              <button type="button" onClick={handleSearch}>
                Search
              </button>
              <button type="reset" onClick={handleReset1}>
                Reset
              </button>
            </div>
          </div>

          <div class="search-my_card" style={{ marginTop: "34px !important" }}>
            <div className="search-bar">
              <div className="two_item">
                <label for="name-right" style={{ width: "100%" }}>
                  From Date:
                </label>
                <input
                  type="date"
                  id="date-right"
                  name="date-right"
                  value={start_date}
                  onChange={(e) => setstart_date(e.target.value)}
                />

                <label for="date-right" style={{ width: "100%" }}>
                  To Date:
                </label>
                <input
                  type="date"
                  id="date-right"
                  name="date-right"
                  value={end_date}
                  onChange={(e) => setend_date(e.target.value)}
                />
              </div>
            </div>
            {reporterr && (
              <>
                {!start_date && !end_date ? (
                  <span style={{ color: "red" }}>
                    Form date and To date required
                  </span>
                ) : (
                  ""
                )}
              </>
            )}

            <div class="search-buttons">
              <button type="button" onClick={handleGenerated}>
                Generated Report
              </button>
            </div>
          </div>

          <div className="tableee">
            <div class="tabless">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    SI No
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Case Number
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Case Type
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Case Tittle
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Hearing Date
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Name of the SDEM
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Case Status
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Case Order
                  </th>
                  <th style={{ background: "#ddd", fontSize: "12px" }}>
                    Case History
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr>
                    <td className="tbcol">{index + 1}</td>
                    <td className="tbcol">{item.case_no}</td>
                    <td className="tbcol">{item.case_type}</td>
                    <td className="tbcol">{item.case_tittle}</td>
                    <td className="tbcol">{new Date(item.case_date).toLocaleDateString()}</td>
                    <td className="tbcol">{item.sdem_name}</td>
                    <td className="tbcol">
                      {item.case_status && (
                        <p className="complete_order">complete</p>
                      )}
                    </td>
                    <td>
                      {!user_name ? (
                        <div style={{ display: "flex" }}>
                          <span
                            onClick={() =>
                              !item.case_status
                                ? toggleModal(
                                    item.case_no,
                                    item.case_tittle,
                                    item.case_date,
                                    item._id,
                                    item.sdem_name
                                  )
                                : ""
                            }
                          >
                            {" "}
                            <img src={editIcon} alt="" width="27px" />
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: "flex" }}>
                          {/* {item.case_orders ? (
                          <span onClick={() => toggleModal4(item.case_orders)}>
                            {" "}
                            <img src={ViewIcon} alt="" width="27px" />
                          </span>
                        ) : ( */}
                          <span
                            onClick={() =>
                              !item.case_status
                                ? toggleModal3(
                                    item.case_no,
                                    item.case_tittle,
                                    item.case_date,
                                    item._id
                                  )
                                : ""
                            }
                          >
                            {" "}
                            <img src={editIcon} alt="" width="27px" />
                          </span>
                          {/* )} */}
                        </div>
                      )}
                    </td>
                    <td>
                      {!user_name ? (
                        <div style={{ display: "flex" }}>
                          <span onClick={() => toggleModal5(item._id)}>
                            <img
                              src={editIcon}
                              title="view"
                              alt=""
                              width="27px"
                            />
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: "flex" }}>
                          <span
                            onClick={() =>
                              toggleModal6(
                                item.case_no,
                                item.case_tittle,
                                item.case_date,
                                item._id,
                                item._name
                              )
                            }
                          >
                            <img src={editIcon} alt="" width="27px" />
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          {products.length > 0 && (
            <div class="my_pagination">
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  class="page-btn"
                  key={num + 1}
                  onClick={() => handlePageChange(num + 1)}
                  disabled={currentPage === num + 1}
                >
                  {num + 1}
                </button>
              ))}
              <button
                class="page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button
                class="page-btn"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="my_card">
            <label for="name">Case No:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter case number"
              value={update_case_no1}
              onChange={(e) => setupdate_case_no1(e.target.value)}
              disabled
            />
            <label for="name">Case Tittle:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter case tittle"
              value={update_case_tittle}
              onChange={(e) => setupdate_case_tittle(e.target.value)}
              disabled
            />
            <label for="">Name of the :</label>
            <Dropdown setdropData={setusername1} sdem_name={sdem_name} />
            <label for="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={update_case_date1}
              onChange={(e) => setupdate_case_date1(e.target.value)}
              // disabled
            />

            <div class="search-buttons">
              <button type="button" onClick={handleUpdate}>
                Submit
              </button>
              <button type="reset" onClick={handleOrderReset}>
                Reset
              </button>
            </div>
            <div className="combtn">
              <button
               type="reset"
               onClick={() => handleUpdate_Case_Status1()}
               style={{ marginTop: "18px"}}
             >
              Complete Order
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showModal3} onHide={handleClose3} centered>
        <Modal.Header closeButton>
          <Modal.Title> Add Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="my_card">
            <label for="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={update_case_date1}
              onChange={(e) => setupdate_case_date1(e.target.value)}
              // disabled
            />
            <label for="date">Orders:</label>
            <textarea
              type="text"
              id="name"
              name="name"
              className="textarea"
              placeholder="Enter case Orders"
              value={update_case_orders}
              onChange={(e) => setupdate_case_orders(e.target.value)}
              style={{ marginBottom: "4px" }}
            />
            <hr />
            <div className="upload-container">
              <form>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <i className="fas fa-cloud-upload-alt"></i> Upload File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <p id="file-name">{fileName}</p>
              </form>
            </div>
            <div class="search-buttons">
              <button type="button" onClick={createOrder}>
                Submit Order
              </button>
            </div>
            <div className="combtn">
              <button
                type="reset"
                onClick={() => handleUpdate_Case_Status1()}
                style={{ marginTop: "18px" }}
              >
              Complete Order
              </button>
            </div> 
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showModal4} onHide={handleClose4} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Update Case</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div class="my_card">
            <label for="date">Orders:</label>
            <textarea
              type="text"
              id="name"
              name="name"
              className="textarea"
              placeholder="Enter case Orders"
              value={update_case_orders}
              onChange={(e) => setupdate_case_orders(e.target.value)}
              disabled
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showModal1} onHide={handleClose1} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to complete case?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate_Case_Status}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal5} onHide={handleClose5} centered>
        <Modal.Header closeButton>
          <Modal.Title>Case History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="orderlist">
            {orders_list.map((item) => (
              <div key={item._id} className="order-item">
                <div
                  className="order-item-header"
                  onClick={() => handleClick(item._id)}
                >
                  <p>Date:</p>
                  <span style={{ marginLeft: "10px", marginBottom: "6px" }}>
                    {new Date(item.case_date).toLocaleDateString()} ({item.Operation_name})
                  </span>
                </div>

                {expandedItemId === item._id && (
                  <div className="order-item-details">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Case Title:</p>
                      <span
                        style={{
                          marginLeft: "10px",
                          marginBottom: "6px",
                          fontSize: "large",
                        }}
                      >
                        {item.case_tittle}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Name of the SDEM:</p>
                      <span
                        style={{
                          marginLeft: "10px",
                          marginBottom: "6px",
                          fontSize: "large",
                        }}
                      >
                        {item.user_name}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p>Date:</p>
                      <span
                        style={{
                          marginLeft: "10px",
                          marginBottom: "6px",
                          fontSize: "large",
                        }}
                      >
                        {new Date(item.case_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showModal6} onHide={handleClose6} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add/Modify Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="orderlist">
            {orders_list.map((item, index) => (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p>name:</p>
                  <span style={{ marginBottom: "3px" }}> {item.user_name}</span>
                </div>
                <p>order:</p>
                <span>{item.case_orders}</span>{" "}
                {index === 0 && item.user_name === user_name ? (
                  <div
                    onClick={() =>
                      handelEditOrder(
                        item._id,
                        item.case_orders,
                        item.case_date
                      )
                    }
                  >
                    <img
                      src={editIcon}
                      alt=""
                      width="19px"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ) : (
                  ""
                )}
                {item.Pdf && (
                  <div onClick={() => handlePdf(item._id)}>
                    <img
                      src={ViewIcon}
                      alt=""
                      width="19px"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p>Date:</p>
                  <span style={{ marginBottom: "3px" }}>
                    {new Date(item.case_date).toLocaleDateString()}
                  </span>
                </div>
                <hr />
              </div>
            ))}
          </div>
          {editorder_id && (
            <div class="my_card">
              <label for="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={update_case_date1}
                onChange={(e) => setupdate_case_date1(e.target.value)}
                // disabled
              />
              <label for="date">Orders:</label>
              <textarea
                type="text"
                id="name"
                name="name"
                className="textarea"
                placeholder="Enter case Orders"
                value={update_case_orders}
                onChange={(e) => setupdate_case_orders(e.target.value)}
                style={{ marginBottom: "4px" }}
              />
              <div class="search-buttons">
                <button type="button" onClick={handleUpdateOrder}>
                  Submit Order
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showModal7} onHide={handleClose7} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            REPORT GENERATED BASED ON SELECTED DATE RANGE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="search-bar">
              <div className="one_item">
                <h3>Date:-</h3>
              </div>
              <div className="two_item">
                <input
                  type="text"
                  id="name-right"
                  name="name-right"
                  placeholder="Enter case number"
                  value={new Date(start_date).toLocaleDateString()}
                  style={{ height: "27px" }}
                  disabled
                />
                <span>-</span>

                <input
                  type="text"
                  id="name-right"
                  name="name-right"
                  placeholder="Enter case number"
                  value={new Date(end_date).toLocaleDateString()}
                  style={{ height: "27px" }}
                  disabled
                />
              </div>
            </div>
            <div class="tabless">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ background: "#ddd", fontSize: "12px" }}>
                      Case Type
                    </th>
                    <th style={{ background: "#ddd", fontSize: "12px" }}>
                      Number of Case Registered
                    </th>
                    <th style={{ background: "#ddd", fontSize: "12px" }}>
                      Number of Case Disposed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports_data.map((item) => (
                    <tr>
                      <td>{item.caseNumber}</td>
                      <td>
                        {Number_Registered_Case(item.caseNumber, reports_data2)}
                      </td>
                      <td>
                        {Number_Disposed_Case(item.caseNumber, reports_data2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="tabless">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ background: "#ddd", fontSize: "12px" }}>
                      Case Type
                    </th>

                    <th style={{ background: "#ddd", fontSize: "12px" }}>
                      Average Disposal(Days)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports_data.map((item) => (
                    <tr>
                      <td>{item.caseNumber}</td>
                      <td>{item.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="search-buttons">
              <button
                onClick={handleDownload}
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Download Report
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}