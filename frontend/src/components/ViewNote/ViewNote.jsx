import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import "../ViewNote/ViewNote.css"; 

const ViewNote = ({ isOpen, noteData, onClose }) => {
  if (!noteData) return null;

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
    >
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
        }}
        className="w-[90%] sm:w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-6 shadow-lg overflow-y-auto"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{noteData.title}</h2>
          <p className="text-gray-600 text-sm">
            Created on: {moment(noteData.createdOn).format("Do MMM YYYY")}
          </p>
          <div className="mt-4">
            <p>{noteData.content}</p>
          </div>
          {noteData.tags?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium">Tags:</h3>
              <ul className="list-disc list-inside">
                {noteData.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-primary hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default ViewNote;
