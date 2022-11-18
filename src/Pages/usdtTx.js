import React, { useEffect, useState } from 'react';
import useMetaMask from "../wallet/hook";

import { HalfMalf } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

import axios from "axios";
import { toast } from "react-toastify";

export default function UsdtTx() {

    const {
        isActive,
        account
    } = useMetaMask();

    const [loading, setLoading] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    var API_URL = process.env.REACT_APP_API_URL;

    const notify = (isError, msg) => {
        if (isError) {
            toast.error(msg, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const getTransaction = async () => {

        await axios
            .post(`${API_URL}getUsdtTransactions`, {
                address: account,
            })
            .then(function (response) {
                if (response.status) {
                    setTransactionList(response.data.data);
                }
            });
    }

    const reSwap = async (transaction) => {

        setLoading(true);
        await axios
            .post(`${API_URL}retryUsdtSwap`, {
                type: transaction.type,
                hash: transaction.fromTransactionHash,
                account: transaction.address
            })
            .then(function (response) {
                if (response.status === false) {
                    notify(true, response.error);
                } else {
                    notify(
                        false,
                        `Transaction successful, Please check your wallet.`
                    );
                }
            })
            .catch(function (err) {
                notify(true, err.message);
            });

        await getTransaction();
        setLoading(false);
    }

    useEffect(() => {
        if (isActive) {
            getTransaction();
        }
    }, [isActive]);

    return (
        <div>
            <section className='transiction-table-section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xl-12'>
                            <div className='transation-title'>Transactions History</div>
                            <div className='table-responsive scroll'>

                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col" style={{ width: "100px" }}>BSCHash</th>
                                            <th scope="col">BRCHash</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {transactionList.length === 0 ? <tr><td colSpan={5} style={{ textAlign: "center" }}>No Transaction Found</td></tr> :
                                            transactionList.map((e, index) => <tr key={index}>
                                                <td style={{ wordBreak: "break-word", width: "10px" }}>{e.date}</td>
                                                <td style={{ wordBreak: "break-word", width: "10px" }}>{e.type === "BSC" ? e.fromTransactionHash : e.toTransactionHash}</td>
                                                <td style={{ wordBreak: "break-word", width: "10px" }}>{e.type === "BSC" ? e.toTransactionHash : e.fromTransactionHash}</td>
                                                <td style={{ wordBreak: "break-word", width: "10px" }}>{e.amount}</td>
                                                <td style={{ wordBreak: "break-word", width: "10px" }}>
                                                    {e.isDone ? "Success" : <button type='button' disabled={loading} onClick={() => reSwap(e)} className='btn-transation'>Retry</button>}
                                                </td>
                                            </tr>)}


                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className={`modal ${loading ? "show" : ""}`}
                id="myModal"
                style={{
                    display: `${loading ? "block" : "none"}`,
                }}
            >
                <HalfMalf
                    text={
                        "Do not close or refresh this window while processing the transaction."
                    }
                    bgColor={"#ffff"}
                    width={"250px"}
                    height={"250px"}
                    center={true}
                />
            </div>
        </div>
    )
}