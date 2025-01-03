"use client";

import React from "react";
import styles from "./Modal.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { useModalContext } from "../contexts/ModalContexts";
import { formatDate } from "../utils/dateUtils";
import Button from "./Button";

function Modal() {
  const { isModalOpen, selectedDate, closeModalHandler } = useModalContext();
  const formattedDate = formatDate(selectedDate);

  if (!isModalOpen) return null;

  return (
    <div className={styles.modalWrapper} onClick={closeModalHandler}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{formattedDate}</p>
            <div>
              <Button
                text={"See translation"}
                className={"cancel"}
                disabled={true}
              />
              <button onClick={closeModalHandler}>×</button>
            </div>
          </div>
          <div className={styles.line}></div>
          <h1>Roboto</h1>
          <div className={styles.line}></div>
          <div>
            Roboto is an incredibly popular font choice for web designers, so
            it’s no surprise that basic, sans serif Roboto as well as the
            Condensed and Slab variations have been frontrunners for Webflow
            users for the past few years. 
          </div>
          <div className={styles.reactions}>
            <button>
              <AiOutlineLike />
            </button>
            <button>
              <FaRegFaceLaughSquint />
            </button>
            <button>
              <FaRegFaceSadCry />
            </button>
          </div>
          <div className={styles.edit}>
            <Button text={"Delete"} className={"delete"} disabled={true} />
            <Button text={"Save"} className={"action"} disabled={true} />
          </div>
          <div className={styles.line}></div>
          <div className={styles.comments}>
            <div className={styles.commentsHeader}>
              <h4>No Name</h4>
              <p>Jan 04, 2025 15:00</p>
            </div>
            <div className={styles.commentsContents}>
              <p>You're right</p>
              <button>
                <IoTrashOutline />
              </button>
            </div>
          </div>
          <div className={styles.leaveCommentsWrapper}>
            <div className={styles.leaveComments}>
              <textarea
                name="comments"
                id=""
                placeholder="Leave Your comments..."
              ></textarea>
              <Button text={"Submit"} className={"action"} disabled={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
